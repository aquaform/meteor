<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;

class meteo_forecast extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'array'
    ];

    protected $fillable = [
        'id',
        'data',
        'created_at',
        'updated_at'
    ];
    use SoftDeletes;

    protected $dates = ['deleted_at'];


    public static function updateForecast()
    {


        $devices = MeteoDevice::get(['id', 'lon', 'lat']);
        //ddd($devices);
        foreach ($devices as $device) {
            $response = Http::withHeaders([
                'User-Agent' => 'Laravel',
            ])->get('https://api.met.no/weatherapi/locationforecast/2.0/compact', [
                'lat' => $device->lat,
                'lon' => $device->lon,
            ]);

            $forecast = \App\Models\meteo_forecast::firstOrNew(['id' => $device->id]);

            //$forecast->data = $response->body();
            $forecast->data = $response->json();
            $forecast->save();

            /*$forecast = \App\Models\meteo_forecast::updateOrCreate([
                'id' => $device->id,
                'data' => $response->body(),
            ]);*/
            //echo $device->lon.PHP_EOL.$device->lat.PHP_EOL;
        }

    }
}
