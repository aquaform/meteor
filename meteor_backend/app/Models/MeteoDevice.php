<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeteoDevice extends Model
{
    use HasFactory;
    protected $fillable = [
        'strValue',
        'deviceTypeID',
        'deviceIP'
    ];

    public function meteoHistory(){
        return $this->hasMany(MeteoHistory::class,'device','id');
    }
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    public function stationType(): BelongsTo
    {
        return $this->belongsTo(StationType::class, 'deviceTypeID', 'deviceTypeID');
    }


}
