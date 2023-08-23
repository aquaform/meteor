<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StationType extends Model
{
    use HasFactory;
    protected $fillable = [
        'deviceTypeID',
        'deviceTypeName',
        'description'
    ];

    public function meteoDevice(){
        return $this->hasMany(MeteoDevice::class,'deviceTypeID','deviceTypeID');
    }
    use SoftDeletes;
    protected $dates = ['deleted_at'];



}
