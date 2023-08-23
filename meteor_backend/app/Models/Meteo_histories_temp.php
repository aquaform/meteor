<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *  таблица для тестирования
 */
class Meteo_histories_temp extends Model
{
    use HasFactory;
    protected $fillable = [
        'device',
        'dataType',
        'value',
        'strValue',
        'created_at',
        'updated_at'
    ];

    protected $table = 'meteo_histories_temp';
    public static function addDataToBaseWithTS($device,$dataType,$value,$strValue=NULL,$created_at=NULL){
        //$history = new MeteoHistory();
        $history = Meteo_histories_temp::create([
            'device' => $device,
            'dataType' => $dataType,
            'value' => $value,
            'strValue' => $strValue,
            'created_at' => $created_at,
        ]);
    }

}
