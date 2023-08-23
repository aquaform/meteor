<?php

namespace App\Http\Controllers;

use App\Models\Meteo10minJsonPoint;
use App\Models\MeteoDataType;
use App\Models\MeteoDevice;
use App\Models\MeteoHistory;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MeteoHistoryController extends Controller
{
    /**
     *  Метод выбирающий текущие (последние) показатели и формирующий json в разрезе тип показателя
     *  датчика - массив метеостанций с значением показателя
     * @return false|string
     */
    public static function indicators()
    {
        $stations = MeteoDevice::get()->sortBy('id');
        $sensors = MeteoDataType::where('active', '=', 1)->get();
        //$sensors = MeteoDataType::get();
        foreach ($sensors as $sensor) {
            $sensorData = [
                "id" => $sensor->id,
                "name" => $sensor->strValue,
                "unit" => $sensor->unit,
                "desc" => NULL,
            ];
            foreach ($stations as $station) {
                $history = MeteoHistory
                    ::where('device', $station->id)
                    ->where('dataType', $sensor->id)
                    ->latest()
                    ->take(1)
                    ->with(['MeteoDevice', 'MeteoDataTypes'])
                    ->get();
                if (isset($history[0])) {
                    $history = $history[0];
                    $stationData[] = [
                        "pointId" => $history->device,
                        "coord" => [
                            "lon" => $station->lon,
                            "lat" => $station->lat,
                        ],
                        "time" => $history->created_at,
                        "value" => $history->value,
                        //"str_value" => $history->strValue,
                        //"symbol_code" => NULL,
                        //"is_warning" => NULL,

                    ];
                }
            }
            if (isset($stationData)) {
                $sensorData["current_values"] = $stationData;
                //ddd($SensorData);
                unset($stationData);
            }
            $data[] = $sensorData;
        }
        return response()->json($data);
        //return json_encode($data);
    }

    /**
     *  Метод выбирающий все метеостанции и формирующий json в разрезе метеостанция -
     *  массив типов показателей датчиков с последними значением показателя
     * @return false|string
     */
    public static function points(Request $request)
    {
        //ddd($request);
        $stations = MeteoDevice::get()->sortBy('id');
        //$sensors = MeteoDataType::get();
        $sensors = MeteoDataType::where('active', '=', 1)->get();
        foreach ($stations as $station) {
            $stationData = [
                "id" => $station->id,
                "name" => $station->strValue,
                "coord" => [
                    "lon" => $station->lon,
                    "lat" => $station->lat,
                ],
                "online" => NULL,
            ];
            //echo Carbon::now()->getPreciseTimestamp(3).' station checkpoint' . PHP_EOL;
            foreach ($sensors as $sensor) {
                //echo Carbon::now()->toDateTimeString().' sensor checkpoint start' . PHP_EOL;
                //echo Carbon::now()->getPreciseTimestamp(3).' sensor checkpoint start' . PHP_EOL;
                $history = MeteoHistory
                    ::where('device', $station->id)
                    ->where('dataType', $sensor->id)
                    ->latest()
                    ->take(1)
                    ->with(['MeteoDevice', 'MeteoDataTypes'])
                    ->get();
                //echo Carbon::now()->getPreciseTimestamp(3).' sensor checkpoint middle' . PHP_EOL;
                //dd($history[0]['MeteoDevice']->strValue);
                //dd($history[0]['MeteoDataTypes']->strValue);
                //$history->dump();
                if (isset($history[0])) {

                    $history = $history[0];
                    //ddd($history);
                    $sensorData[] = [
                        "indicatorId" => $history->dataType,
                        "name" => $history->MeteoDataTypes->strValue,
                        "value" => $history->value,
                        //"str_value" => $history->strValue,
                        "unit" => $history->MeteoDataTypes->unit,
                        "desc" => NULL,
                        "time" => $history->created_at,
                        //"symbol_code" => NULL,
                        //"is_warning" => NULL,
                    ];
                }
                //echo Carbon::now()->getPreciseTimestamp(3).' sensor checkpoint end' . PHP_EOL;
                //echo Carbon::now()->toDateTimeString().' sensor checkpoint end' . PHP_EOL;
            }

            if (isset($sensorData)) {
                $stationData["current_values"] = $sensorData;
                //ddd($SensorData);
                unset($sensorData);
            }
            $data[] = $stationData;

        }
        //ddd($data);
        //$options = app('request')->header('accept-charset') == 'utf-8' ? JSON_UNESCAPED_UNICODE : null;
        //return response()->json($data, 200, $options);

        //$groupedData = $data->getCollection();
        //dd($groupedData);
        //$groupedData = $groupedData->sortBy('indicatorId');
        //$data->setCollection($groupedData);


        return response()->json($data);
        //return json_encode($data);
        //return response()->json_encode($data, JSON_UNESCAPED_UNICODE);
    }


    public static function pointsHistory(Request $request, $id)
    {
        $start_date = $request->start_date;
        if ($start_date) {
        } else $start_date = MeteoHistory::getFirstRecordDateByID($id);
        //dd($start_date);


        $end_date = $request->end_date;
        if ($end_date) {
        } else $end_date = MeteoHistory::getLastRecordDateByID($id);


        $period_step = $request->period_step;
        if ($period_step) {
        } else $period_step = '10m';

        $indicators = $request->indicators;
        if ($indicators) {
            $indicators = substr($indicators, 1, -1);
            $indicators = explode(',', $indicators);
        } else $indicators = [];
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;

        $data = MeteoHistory::pointHistory($id, $start_date, $end_date, $indicators, $count_per_page, $period_step);

        //dd(array_keys($data));
        //dd(gettype($data));
        //dd($data[0]);
        foreach ($data as $key => $record) {
            //dd($record->dataType);

            $sensorData = [
                "indicatorId" => $record->dataType,
                "name" => $record->MeteoDataTypes->strValue,
                "value" => $record->value,
                //"str_value" => $record->strValue,
                "unit" => $record->MeteoDataTypes->unit,
                "desc" => NULL,
                "time" => $record->created_at,
                //"symbol_code" => NULL,
                //"is_warning" => NULL,
            ];
            //dd($sensorData);
            //$record = $sensorData;
            $data[$key] = $sensorData;
            unset($sensorData);

        }

        //$data[3]='test';
        //dd($data);
        $data = response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        //$data = response()->json($data);
        //dd($data);

        return $data;

    }

    public static function pointsHistoryV2(Request $request, $id)
    {
        $start_date = $request->start_date;
        if ($start_date) {
        } else $start_date = MeteoHistory::getFirstRecordDateByID($id);
        $end_date = $request->end_date;
        if ($end_date) {
        } else $end_date = MeteoHistory::getLastRecordDateByID($id);
        $period_step = $request->period_step;
        if ($period_step) {
        } else $period_step = '10m';
        $indicators = $request->indicators;
        if ($indicators) {
            $indicators = substr($indicators, 1, -1);
            $indicators = explode(',', $indicators);
        } else $indicators = [];
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;
        $data = MeteoHistory::pointHistoryV2($id, $start_date, $end_date, $indicators, $count_per_page, $period_step);
        foreach ($data as $key => $record) {
            $sensorData = [
                "indicatorId" => $record->dataType,
                "name" => $record->MeteoDataTypes->strValue,
                "value" => $record->value,
                "unit" => $record->MeteoDataTypes->unit,
                "desc" => NULL,
                "time" => $record->createround,
            ];
            $data[$key] = $sensorData;
            unset($sensorData);
        }
        $groupedData = $data->getCollection();
        //dd($groupedData);
        $groupedData = $groupedData->sortBy('indicatorId')->groupBy('time');
        $data->setCollection($groupedData);
        $data = response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        return $data;


    }

    public static function indicatorHistory(Request $request, $id)
    {
        $start_date = $request->start_date;
        if ($start_date) {
        } else $start_date = MeteoHistory::getFirstRecordDateByIndicatorID($id);

        $end_date = $request->end_date;
        if ($end_date) {
        } else $end_date = MeteoHistory::getLastRecordDateByIndicatorID($id);

        $period_step = $request->period_step;
        if ($period_step) {
        } else $period_step = '10m';

        /*$indicators = $request->indicators;
        if ($indicators) {
            $indicators = substr($indicators,1,-1);
            $indicators = explode(',', $indicators);
        } else $indicators = [];*/
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;
        $data = MeteoHistory::indicatorHistory($id, $start_date, $end_date, $count_per_page, $period_step);

        //dd(array_keys($data));
        //dd(gettype($data));
        //dd($data[0]);
        foreach ($data as $key => $record) {
            //dd($record->dataType);

            $sensorData = [
                "pointId" => $record->device,
                "name" => $record->MeteoDataTypes->strValue,
                "value" => $record->value,
                //"str_value" => $record->strValue,
                "unit" => $record->MeteoDataTypes->unit,
                "desc" => NULL,
                "time" => $record->created_at,
                //"symbol_code" => NULL,
                //"is_warning" => NULL,
            ];
            //dd($sensorData);
            //$record = $sensorData;
            $data[$key] = $sensorData;
            unset($sensorData);

        }

        //$data[3]='test';
        //dd($data);
        $data = response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        //$data = response()->json($data);
        //dd($data);

        return $data;

    }


    public static function indicatorHistoryV2(Request $request, $id)
    {
        $start_date = $request->start_date;
        if ($start_date) {
        } else $start_date = MeteoHistory::getFirstRecordDateByIndicatorID($id);

        $end_date = $request->end_date;
        if ($end_date) {
        } else $end_date = MeteoHistory::getLastRecordDateByIndicatorID($id);

        $period_step = $request->period_step;
        if ($period_step) {
        } else $period_step = '10m';

        /*$indicators = $request->indicators;
        if ($indicators) {
            $indicators = substr($indicators,1,-1);
            $indicators = explode(',', $indicators);
        } else $indicators = [];*/
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;
        $data = MeteoHistory::indicatorHistory($id, $start_date, $end_date, $count_per_page, $period_step);

        //dd(array_keys($data));
        //dd(gettype($data));
        //dd($data[0]);
        foreach ($data as $key => $record) {
            //dd($record->dataType);

            $sensorData = [
                "pointId" => $record->device,
                "name" => $record->MeteoDataTypes->strValue,
                "value" => $record->value,
                //"str_value" => $record->strValue,
                "unit" => $record->MeteoDataTypes->unit,
                "desc" => NULL,
                "time" => $record->createround,
                //"symbol_code" => NULL,
                //"is_warning" => NULL,
            ];
            //dd($sensorData);
            //$record = $sensorData;
            $data[$key] = $sensorData;
            unset($sensorData);

        }
        $groupedData = $data->getCollection();
        //dd($groupedData);
        $groupedData = $groupedData->sortBy('indicatorId')->groupBy('time');
        $data->setCollection($groupedData);
        $data = response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        //$data = response()->json($data);
        //dd($data);

        return $data;

    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MeteoHistory::with(['meteoDevice', 'meteoDataTypes'])->latest()->take(25)->get();
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\meteoHistory $meteoHistory
     * @return \Illuminate\Http\Response
     */

    public function showAll(meteoHistory $meteoHistory, Request $request)
    {
        $start = $request->start;
        $end = $request->end;
        return MeteoHistory::scopeCreatedBetweenDates([$start, $end]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\meteoHistory $meteoHistory
     * @return \Illuminate\Http\Response
     */
    public function edit(meteoHistory $meteoHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\meteoHistory $meteoHistory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meteoHistory $meteoHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\meteoHistory $meteoHistory
     * @return \Illuminate\Http\Response
     */
    public function destroy(meteoHistory $meteoHistory)
    {
        //
    }
}
