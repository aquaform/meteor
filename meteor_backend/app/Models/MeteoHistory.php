<?php

namespace App\Models;

use App\Http\Controllers\EmercitAbsPressureController;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use voku\helper\ASCII;

class MeteoHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'device',
        'dataType',
        'value',
        //'strValue',
    ];
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function meteoDevice(): BelongsTo
    {
        return $this->belongsTo(MeteoDevice::class, 'device', 'id');
    }

    public function meteoDataTypes(): BelongsTo
    {
        return $this->belongsTo(MeteoDataType::class, 'dataType', 'id');
    }

    /**
     * @param $cmd
     * @return string
     *  Метод для выполнения команд ОС с логированием ошибок
     *  Строка с полной командой на входе
     *  Stdout на выходе
     *  ShellCommandFailedException не работает!!! починить
     *
     */
    public static function execute($cmd): string
    {
        $process = Process::fromShellCommandline($cmd);
        $processOutput = '';
        $captureOutput = function ($type, $line) use (&$processOutput) {
            $processOutput .= $line;
        };
        $process->setTimeout(null)
            ->run($captureOutput);
        if ($process->getExitCode()) {
            $exception = new ShellCommandFailedException($cmd . " - " . $processOutput);
            report($exception);
            throw $exception;
        }
        return $processOutput;
    }

    /** Метод вызываемый для сбора данных со всех станций по таблице meteo_devices и записи в meteo_histories // разработка
     * @param $stationID
     * @return void
     */
 /*   public static function gatherData()
    {
        //$stationList = MeteoDevice::pluck('id');
        //dd($stationList);
        $stationList = MeteoDevice::all();
        foreach ($stationList as $item) {
            //dd($item->deviceTypeID);
            switch ($item->deviceTypeID) {
                case '0':
                    //echo 'Emersit stub' . PHP_EOL;
                    break;
                case '1':
                    //echo 'Sokol stub' . PHP_EOL;
                    break;
                case '2':
                    //echo 'DSPD-M' . PHP_EOL;
                    //echo $item->deviceIP . PHP_EOL;
                    $data = self::getDSPDdata($item->id, $item->deviceIP);
                    break;

            }
        }
    }*/

    public static function getDSPDdata()
    {
        $stationList = MeteoDevice::where('deviceTypeID','2')->get(['id','deviceIP']);
        /*dd($stationList);
        $id = $stationList['id'];
        $ip = substr($stationList['deviceIP'], 0, strpos($ip, "/"));*/
        //dd(App::environment());
        foreach ($stationList as $value) {
            //dd($value);
            if (App::environment('local')) {
                $id = $value['id'];
                //dd($id);
                $ip = env('LOCAL_IP_DSPDM'.$id);
                $data = Http::retry(5,1000)->get('http://' . $ip . '/json')->json();
                //dd($data);
            } else {
                $id = $value['id'];
                $ip = $value['deviceIP'];
                $data = Http::retry(5,1000)->get('http://' . $ip . '/json')->json();
            }
            //dd($data);
            $now = Carbon::now();
            $storage = array();
            foreach ($data['Packet'] as $key => $datum) {
                //dd($key);
                $dataType = MeteoDataType::where('comment', $key)->first('id');
                if ($dataType) {
                    if ($dataType['id'] == '30') {
                        $roadStatus = DSPDsurfaceDescrition::where('id', $datum)->first('description');
                        //dd($roadStatus['description']);
                        $storage[] = array(
                            'device' => $id,
                            'dataType' => $dataType['id'],
                            'value' => $roadStatus['description'],
                            'created_at' => $now,
                        );
                    } else {
                        $storage[] = array(
                            'device' => $id,
                            'dataType' => $dataType['id'],
                            'value' => $datum,
                            'created_at' => $now,
                        );
                    }
                }
            }
            //dd($storage);
            MeteoHistory::insert($storage);

            //dd($data);

            return $storage;
        }
    }

    public static function fill10minutesRound()
    {
        $stations = MeteoDevice::orderBy('id')->get('id')->toArray();
        $indicators = MeteoDataType::orderBy('id')->get('id')->toArray();
        foreach ($stations as $station) {
            foreach ($indicators as $indicator) {
                $date = Meteo10minHistory::whereDevice($station['id'])
                    ->where('dataType', $indicator['id'])
                    ->orderBy('created_at', 'desc')
                    ->first('created_at');
                if (!isset($date['created_at'])) {
                    $date = MeteoHistory::whereDevice($station['id'])
                        ->where('dataType', $indicator['id'])
                        ->orderBy('created_at', 'asc')
                        ->first('created_at');
                    if (!isset($date['created_at'])) continue;
                    $floorDate = Carbon::parse($date['created_at']);
                    $minutes = (float)$floorDate->minute;
                    $minutes = floor($minutes / 10) * 10;
                    $floorDate = $floorDate->minutes((int)$minutes)->seconds(0);
                    $data = MeteoHistory::whereDevice($station['id'])
                        ->where('dataType', $indicator['id'])
                        ->where('created_at', '>=', $floorDate->toDateTimeString())
                        ->where('created_at', '<', $floorDate
                            ->addMinutes(10)->toDateTimeString())
                        ->orderBy('created_at')
                        ->get();
                    $entry = Meteo10minHistory::create([
                        'device' => $station['id'],
                        'dataType' => $indicator['id'],
                        'value' => $data[0]->value,
                        'created_at' => $floorDate->toDateTimeString()
                    ]);
                } else {
                    //var_dump($station['id'],$indicator['id']);
                    $dateDev = MeteoHistory::whereDevice($station['id'])
                        ->where('dataType', $indicator['id'])
                        ->orderBy('createround', 'desc')
                        ->first('createround');
                    if (!isset($dateDev['createround'])) continue;
                    //$i = null;
                    //$date=$date->created_at;
                    $date = Carbon::parse($date['created_at']);
                    $dateDev = Carbon::parse($dateDev->createround);
                    //dd($dateDev->createround);
                    while ($dateDev->gt($date)) {
                        $date = $date->addMinutes(10);
                        $data = MeteoHistory::where('createround', $date)
                            ->whereDevice($station['id'])
                            ->where('dataType', $indicator['id'])
                            ->orderBy('createround', 'desc')
                            ->first();
                        if (empty($data)) {
                            $data = MeteoHistory::where('createround', '>', $date)
                                ->whereDevice($station['id'])
                                ->where('dataType', $indicator['id'])
                                ->orderBy('createround', 'desc')
                                ->first();
                        }
                        if (!empty($data)) {
                            $entry = Meteo10minHistory::create([
                                'device' => $station['id'],
                                'dataType' => $indicator['id'],
                                'value' => $data->value,
                                'created_at' => $date->toDateTimeString()
                            ]);
                        }
                    }
                }
            }
        }
    }

    public static function fill10minJsonPoint()
    {
        $stations = MeteoDevice::orderBy('id')->get('id')->toArray();
        $indicators = MeteoDataType::where('active', '=', 1)->pluck('id')->toArray();
        $indicators = array_values($indicators);
        //$stations = [['id' => 4]];
        //dd($stations);
        foreach ($stations as $station) {
            //dd($station['id']);
            $sensorData = array();
            $date = Meteo10minJsonPoint::where('device', $station['id'])
                ->orderBy('created_at', 'desc')
                ->first('created_at');
            if (!isset($date['created_at'])) {
                $date = Meteo10minHistory::where('device', $station['id'])
                    ->whereIn('dataType', $indicators)
                    ->orderBy('created_at', 'asc')
                    ->first('created_at');
                //dd($date);
                if (!isset($date['created_at'])) continue;
                $data = Meteo10minHistory::whereDevice($station['id'])
                    ->whereIn('dataType', $indicators)
                    ->where('created_at', $date->created_at->toDateTimeString())
                    ->orderBy('created_at', 'asc')
                    ->get();
                if (isset($data)) {

                    foreach ($data as $datum) {
                        $sensorData[] = [
                            "pointId" => $datum->device,
                            "indicatorId" => $datum->dataType,
                            "name" => $datum->MeteoDataTypes->strValue,
                            "value" => $datum->value,
                            //"str_value" => $history->strValue,
                            "unit" => $datum->MeteoDataTypes->unit,
                            "desc" => NULL,
                            "time" => $datum->created_at,
                        ];
                    }
                }
                if (count($sensorData) !== 0) {
                    $sensorJsonStart = json_encode($sensorData);

                    $entry = Meteo10minJsonPoint::create([
                        'device' => $station['id'],
                        'value' => $sensorJsonStart,
                        'created_at' => $date['created_at']->toDateTimeString()
                    ]);
                }
            } else {
                $sensorData = array();
                $last10minHistoryDate = Meteo10minHistory::where('device', $station['id'])
                    ->whereIn('dataType', $indicators)
                    ->orderBy('created_at', 'desc')
                    ->first('created_at');
                if (!isset($last10minHistoryDate->created_at)) continue;
                $last10minHistoryDate = Carbon::parse($last10minHistoryDate->created_at);
                $date = Carbon::parse($date->created_at);
                //dd($last10minHistoryDate,$date);

                while ($last10minHistoryDate->gt($date)) {
                    $date = $date->addMinutes(10);
                    $data = Meteo10minHistory::whereDevice($station['id'])
                        ->whereIn('dataType', $indicators)
                        ->where('created_at', $date->toDateTimeString())
                        ->orderBy('created_at', 'asc')
                        ->get();

                    if (isset($data)) {
                        $sensorData = array();
                        foreach ($data as $datum) {
                            $sensorData[] = [
                                "pointId" => $datum->device,
                                "indicatorId" => $datum->dataType,
                                "name" => $datum->MeteoDataTypes->strValue,
                                "value" => $datum->value,
                                //"str_value" => $history->strValue,
                                "unit" => $datum->MeteoDataTypes->unit,
                                "desc" => NULL,
                                "time" => $datum->created_at,
                            ];
                        }
                    }
                    if (count($sensorData) !== 0) {
                        $sensorJson = json_encode($sensorData);
                        $entry = Meteo10minJsonPoint::create([
                            'device' => $station['id'],
                            'value' => $sensorJson,
                            'created_at' => $date->toDateTimeString()
                        ]);
                        $sensorJson = null;
                        $sensorData = array();
                        //dd($entry);
                    }
                }
            }
        }
    }


    /**
     *  Технический метод для преобразования полей таблицы к общему виду
     * @param $dataType
     * @param $delimeter
     * @return void
     */
    public static function convertSokolData($dataType, $delimeter)
    {
        //$dates = MeteoHistory::where('device',1)->where('dataType',$dataType)->where('id','>=',585638)->get();
        $dates = MeteoHistory::where('device', 1)->where('dataType', $dataType)->get();
        //dd($dates);
        foreach ($dates as $data) {
            $data->value = $data->value / $delimeter;
            $data->save();
        }

    }

    /**
     * @return int[]
     *  Метод парсинга данных из modpoll для Сокола
     *  Выход - массив по индексам соответствующим типу данных
     *
     *  29.05.23 Добавил вычисляемое значение - точка росы (13)
     *
     */
    public static function getSokolData()
    {
//        $data = MeteoHistory::execute('/root/modpoll/x86_64-linux-gnu/modpoll -m enc -1 -a 1 -r 1 -c 12 -p 23 172.29.0.245');
        //$data = MeteoHistory::execute('/sbin/modpoll -m enc -1 -a 1 -r 1 -c 12 -p 23 192.168.0.34');
        //env('APP_POLL');
        $data = MeteoHistory::execute(env('APP_POLL'));
        $data = explode("\n", $data); // парсим  вывод, текст построчно в массив
        $data = array_slice($data, 10); // Отрезаем 10 элементов массива т.е. 10 строк сверху
        $data = array_slice($data, 0, 12); // Отрезаем нижнюю строку
        foreach ($data as $key => $value) { // В каждой строке массива отрезаем первые 5 символов
            $data[$key] = substr($value, 5);
        }
        $data = array_map(function ($v) {
            return (float)$v;
        }, $data); // Конвертируем элементы из строк в float
        // ddd($data);
        $data[3] = $data[3] / 100; // Температура
        $data[4] = $data[4] / 10;
        $data[6] = $data[6] / 100;
        $data[8] = $data[8] / 10;
        $data[9] = $data[9] / 100;
        //
        $lambda = (17.27 * $data[3]) / (237.7 + $data[3]) + log($data[5] / 100);
        $dewpoint = (237.7 * $lambda) / (17.27 - $lambda);
        $data[12] = $dewpoint;

        return $data;
    }

    /**
     * @param $device
     * @param $dataType
     * @param $value
     *
     * @return void
     */
    public static function addDataToBase($device, $dataType, $value)
    {
        //$history = new MeteoHistory();
        $history = MeteoHistory::create([
            'device' => $device,
            'dataType' => $dataType,
            'value' => $value,
            //'strValue' => $strValue,
        ]);
    }

    /**
     * задел на несколько соколов, пока просто дёргало данных
     * @param $device
     * @return void
     */
    public static function storeDeviceData($device)
    {
        switch ($device) {
            case 1:
                $data = self::getSokolData();
                foreach ($data as $key => $value) {
                    self::addDataToBase($device, $key + 1, $value);
                };
                break;
        }

    }

    /**
     *  пример работы с периодом дат
     * @param array $dates
     * @return string
     */
    public static function scopeCreatedBetweenDates(array $dates, $station)
    {
        $start = ($dates[0] instanceof Carbon) ? $dates[0] : Carbon::parse($dates[0]);
        $end = ($dates[1] instanceof Carbon) ? $dates[1] : Carbon::parse($dates[1]);
        //ddd($start,$end);
        /*$scope = MeteoHistory::WhereBetween('created_at', [
            $start->startOfDay(),
            $end->endOfDay()
        ]);*/
        $scope = MeteoHistory::WhereBetween('createround', [
            $start, $end
        ]);

        //dd($scope->select('device', 'dataType', 'value', 'created_at')->get()->toJson());
        //ddd($scope->Where('dataType', '>', '3')->Where('dataType', '<', '12')->select('device', 'dataType', 'value', 'created_at')->get()->toJson());
        return $scope->where('device', $station)->select('device', 'dataType', 'value', 'createround')->get();
        //->get('id','device','dataType','value','created_at');
        //return $scope->pluck('id','device','dataType','value','created_at');
        /*return MeteoHistory::pluck('id')->WhereBetween('created_at', [
            $start->startOfDay(),
            $end->endOfDay()
        ]);*/


        // get(['id','device','dataType','value','created_at'])->
    }

    /**
     *  Возвращает время (carbon) первой записи в истории для станции id по столбцу created_at
     * @param $id
     * @return \Illuminate\Support\Carbon|mixed|null
     */
    public static function getFirstRecordDateByID($id)
    {
        $date = MeteoHistory::whereDevice($id)->first('createround');
        //dd($date);
        if (!empty($date)) {
            $date = MeteoHistory::whereDevice($id)->first('createround')->createround;
            //dd($date);
            //return $date->format('Y-m-d\TH:i:s');
            return $date;
        };
        //return $date->format('Y-m-d\TH:i:s');
        return $date;
        //dd($date->format('Y-m-d\TH:i:s'));


    }

    /**
     *  Возвращает время (carbon) первой записи в истории для показателя id по столбцу created_at
     * @param $id
     * @return \Illuminate\Support\Carbon|mixed|null
     */
    public static function getFirstRecordDateByIndicatorID($id)
    {
        $date = MeteoHistory::where('dataType', $id)->first('createround')->createround;
        //return $date->toISOString();
        //dd($date->format('Y-m-d\TH:i:s'));
        //return $date->format('Y-m-d\TH:i:s');
        return $date;

    }

    /**
     *  Возвращает время (carbon) последней записи в истории для станции id по столбцу created_at
     * @param $id
     * @return \Illuminate\Support\Carbon|mixed|null
     */
    public static function getLastRecordDateByID($id)
    {
        $date = MeteoHistory::whereDevice($id)->latest()->first('createround');
        if (!empty($date)) {
            $date = MeteoHistory::whereDevice($id)->latest()->first('createround')->createround;
            //return $date->format('Y-m-d\TH:i:s');
            return $date;
        }
        return $date;
    }

    /**
     *  Возвращает время (carbon) последней записи в истории для показателя id по столбцу created_at
     * @param $id
     * @return \Illuminate\Support\Carbon|mixed|null
     */
    public static function getLastRecordDateByIndicatorID($id)
    {
        $date = MeteoHistory::where('dataType', $id)->latest()->first('createround');
        if (!empty($date)) {
            $date = MeteoHistory::where('dataType', $id)->latest()->first('createround')->createround;
            //return $date->format('Y-m-d\TH:i:s');
            return $date;
        }
    }

    /**
     * @param $id
     * @param $start_date
     * @param $end_date
     * @param $indicators
     * @param $count_per_page
     * @param $period_step
     *
     *  метод вывода истории всех показателей в разрезе станции $id
     *
     * @return MeteoHistory[]|\Illuminate\Pagination\LengthAwarePaginator|\LaravelIdea\Helper\App\Models\_IH_MeteoHistory_C
     */
    public static function pointHistory($id, $start_date, $end_date, $indicators, $count_per_page, $period_step)
    {
        if (!$indicators) { // Когда ни будь я поплачусь за этот костыль.
            $indicators = MeteoDataType::where('active', '=', 1)->pluck('id')->toArray();
            $indicators = array_values($indicators);

            //dd($indicators);
        }
        //dd($indicators);
        //$data = MeteoHistory::whereDevice($id)->where('created_at', '>=', $start_date)->where('created_at', '<=', $end_date)->whereIn('dataType', $indicators)->paginate(50)->withQueryString();
        if (empty($start_date)) {
            $data = MeteoHistory::whereDevice($id)
                ->whereIn('dataType', $indicators)
                ->with(['MeteoDevice', 'MeteoDataTypes'])
                ->paginate($count_per_page)
                ->appends([
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'count_per_page' => $count_per_page,
                    'indicators' => '[' . implode(',', $indicators) . ']',   // Когда ни будь я поплачусь за этот костыль.
                    'period_step' => $period_step,
                    //'indicators' => implode(',',$indicators)   // Когда ни будь я поплачусь за этот костыль.
                ]);
            return $data;
        } else {

            $data = MeteoHistory::whereDevice($id)
                ->where('created_at', '<=', $end_date)
                ->where('created_at', '>=', $start_date)
                ->whereIn('dataType', $indicators)
                ->orderBy('created_at', 'desc')
                ->with(['MeteoDevice', 'MeteoDataTypes'])
                ->paginate($count_per_page)
                ->appends([
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'count_per_page' => $count_per_page,
                    'indicators' => '[' . implode(',', $indicators) . ']',   // Когда ни будь я поплачусь за этот костыль.
                    'period_step' => $period_step,
                    //'indicators' => implode(',',$indicators)   // Когда ни будь я поплачусь за этот костыль.
                ]);


            return $data;
        }
    }

    public static function pointHistoryV2($id, $start_date, $end_date, $count_per_page, $period_step)
    {
        /*if (!$indicators) {
            $indicators = MeteoDataType::where('active', '=', 1)->pluck('id')->toArray();
            $indicators = array_values($indicators);
        }*/

        //dd($id, $start_date, $end_date, $count_per_page, $period_step);
        if (empty($start_date)) {
            //dd('here empty date');
            $data = Meteo10minJsonPoint::whereDevice($id)
                //->whereIn('dataType', $indicators)
                ->paginate($count_per_page)
                ->appends([
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'count_per_page' => $count_per_page,
                    //'indicators' => '[' . implode(',', $indicators) . ']',
                    'period_step' => $period_step,
                ]);
            return $data;
        } else {
            //$start_date=$start_date->toDateTimeString();
            //$end_date=$end_date->toDateTimeString();
            $data = Meteo10minJsonPoint::whereDevice($id)
                ->where('created_at', '<=', $end_date)
                ->where('created_at', '>=', $start_date)
                //->whereIn('dataType', $indicators)
                ->groupBy('created_at', 'value', 'device', 'id')
                ->orderBy('created_at', 'desc')
                ->paginate($count_per_page)
                ->appends([
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'count_per_page' => $count_per_page,
                    //'indicators' => '[' . implode(',', $indicators) . ']',
                    'period_step' => $period_step,
                ]);
            //dd($data);
            return $data;
        }
    }

    public static function indicatorHistory($id, $start_date, $end_date, $count_per_page, $period_step)
    {
        //dd($indicators);
        //$data = MeteoHistory::whereDevice($id)->where('created_at', '>=', $start_date)->where('created_at', '<=', $end_date)->whereIn('dataType', $indicators)->paginate(50)->withQueryString();
        //$indicators = MeteoDataType::where('Active', '=', 1)->pluck('id')->toArray();
        $data = MeteoHistory::where('dataType', $id)
            ->where('created_at', '<=', $end_date)
            ->where('created_at', '>=', $start_date)
            //->whereIn('dataType', $indicators)
            ->orderBy('created_at', 'desc')
            ->with(['MeteoDevice', 'MeteoDataTypes'])
            ->paginate($count_per_page)
            ->appends([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'count_per_page' => $count_per_page,
                'period_step' => $period_step,
                //  'indicators' => '[' . implode(',', $indicators) . ']'   // Когда ни будь я поплачусь за этот костыль.
                //'indicators' => implode(',',$indicators)   // Когда ни будь я поплачусь за этот костыль.
            ]);


        return $data;
    }

}
