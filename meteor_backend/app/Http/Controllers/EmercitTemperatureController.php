<?php
namespace App\Http\Controllers;
use App\Models\EmercitTemperature;
use App\Models\MeteoHistory;
use App\Models\Meteo_histories_temp;
use Carbon\Carbon;

//define('MODEL', "MeteoHistory");
//define('MODEL', "Meteo_histories_temp");  ага, разбежался, это вам не С ((


class EmercitTemperatureController extends Controller
{
    /**
     *
     * Получение новых данных по температуре со станций эмерсит, сопоставление идентификаторов внешней и общей базы
     * запрашиваемый параметр тоже переменная, но для возможных переделок, метод растиражирован по отдельным контроллерам.
     * @param $station_id
     * @param $station_id_emercit
     * @param $dataType
     * @return string
     */
    static public function getNewTemperatureDataEmercit($station_id, $station_id_emercit, $dataType)
    {
        $data = MeteoHistory::where('device', $station_id)->where('dataType', $dataType)->latest()->take(1)->get('created_at');
        if (!isset($data[0]['created_at'])) {
            // Если в основной базе нет данных по текущей станции и датчику - заполняем таблицу всеми имеющмися соответтсвующими данными из базы эмерситов, кусками по 10000 записей
            EmercitTemperature::where('station_id', $station_id_emercit)->chunk(10000, function ($chunks) use ($station_id, $dataType, $station_id_emercit){
                foreach ($chunks as $chunk) {
                    $ar[] = ['device' => $station_id, 'dataType' => $dataType, 'value' => $chunk->value, 'created_at' => $chunk->time_utc, 'updated_at' => Carbon::now()];
                }
                MeteoHistory::insert($ar);
                echo 'new chunk added ';
            });
            return 'first data path';
        } else {
            // Если в основной базе уже есть старые записи из эмерситов, то записываем только новые по полю created_at, кусками по 10000 записей
            EmercitTemperature::where('station_id', $station_id_emercit)->where('time_utc','>',$data[0]['created_at'])->chunk(10000, function ($chunks) use ($station_id, $dataType, $station_id_emercit) {
                foreach ($chunks as $chunk) {
                    $ar[] = ['device' => $station_id, 'dataType' => $dataType, 'value' => $chunk->value, 'created_at' => $chunk->time_utc, 'updated_at' => Carbon::now()];
                }
                MeteoHistory::insert($ar);
                echo 'new chunk added ';
            });
            return 'new data path';
        }
        //return $data[0]['created_at'];
    }
}
