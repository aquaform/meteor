<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmercitTemperature extends Model
{
    use HasFactory;
    protected $connection = 'mysql2';
    protected $table = 'temperatures';
    public $timestamps = false;
    const UPDATED_AT = null;
    const CREATED_AT = 'time_utc';


    public static function getLast10(){
        //$data = EmercitTemperature
        $data = EmercitTemperature::latest()->take(10)->get();
        //$data = MeteoHistory::with(['meteoDevice','meteoDataTypes'])->latest()->take(25)->get();
        return $data;
    }


}
