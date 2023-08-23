<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeteoDataType extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'strValue',
        'comment',
        'unit',
        'active,'
    ];

    public function meteoHistory(){
        return $this->hasMany(MeteoHistory::class,'dataType','id');
    }

    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
