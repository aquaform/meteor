<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use Illuminate\Http\Request;

class Meteo10minJsonPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'device',
        'value',
        'created_at'
    ];


    public static function pointHistoryV3($id, $start_date, $end_date, $count_per_page, $period_step)
    {
        //dd($end_date);

        $data = Meteo10minJsonPoint::whereDevice($id)
            ->where('created_at', '<=', $end_date['created_at'])
            ->where('created_at', '>=', $start_date['created_at'])
            //->whereIn('dataType', $indicators)
            //->groupBy('createround', 'dataType', 'value', 'device', 'id')
            //->orderBy('createround', 'desc')
            //->with(['MeteoDevice', 'MeteoDataTypes'])
            ->paginate($count_per_page)
            ->appends([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'count_per_page' => $count_per_page,
              //  'indicators' => '[' . implode(',', $indicators) . ']',   // Когда ни будь я поплачусь за этот костыль.
                'period_step' => $period_step,
            ]);
        return $data;
    }
}
