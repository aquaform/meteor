<?php

namespace App\Http\Controllers;

use App\Models\EmercitGas;
use App\Models\EmercitTemperature;
use App\Models\Meteo_histories_temp;
use App\Models\MeteoHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmercitGaseController extends Controller
{
    /**
     *  сопоставление идентификаторов газов эмерсита и основных
     *
     * @param $dataType
     * @return int|void
     */
    static public function rep($dataType)
    {
        switch ($dataType) {
            case 14:
                return 2;
                break;
            case 15:
                return 4;
                break;
            case 16:
                return 7;
                break;
            case 17:
                return 8;
                break;
            case 18:
                return 9;
                break;
            case 19:
                return 10;
                break;
            case 20:
                return 11;
                break;

        }
    }

    /**
     *
     * Получение новых данных по газам со станций эмерсит, сопоставление идентификаторов внешней и общей базы
     * запрашиваемый параметр тоже переменная, но для возможных переделок, метод растиражирован по отдельным контроллерам.
     * @param $station_id
     * @param $station_id_emercit
     * @param $dataType
     * @return string
     */
    static public function getNewGaseDataEmercit($station_id, $station_id_emercit, $dataType)
    {
        $data = MeteoHistory::where('device', $station_id)->where('dataType', $dataType)->latest()->take(1)->get('created_at');
        // Если в основной базе нет данных по текущей станции и датчику - заполняем таблицу всеми имеющмися соответтсвующими данными из базы эмерситов, кусками по 10000 записей, внимание используется метод rep
        if (!isset($data[0]['created_at'])) {
            EmercitGas::where('station_id', $station_id_emercit)->where('type_id', EmercitGaseController::rep($dataType))->chunk(10000, function ($chunks) use ($station_id, $dataType, $station_id_emercit) {
                foreach ($chunks as $chunk) {
                    $ar[] = ['device' => $station_id, 'dataType' => $dataType, 'value' => $chunk->value, 'created_at' => $chunk->time_utc, 'updated_at' => Carbon::now()];
                }
                MeteoHistory::insert($ar);
                echo 'new chunk added ';
            });
            return 'first data path';
        } else {
            // Если в основной базе уже есть старые записи из эмерситов, то записываем только новые по полю created_at, кусками по 10000 записей, , внимание используется метод rep
            EmercitGas::where('station_id', $station_id_emercit)->where('type_id', EmercitGaseController::rep($dataType))->where('time_utc', '>', $data[0]['created_at'])->chunk(10000, function ($chunks) use ($station_id, $dataType, $station_id_emercit) {
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
