<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meteo10minHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'device',
        'dataType',
        'value',
        'created_at'
    ];
    public function meteoDevice(): BelongsTo
    {
        return $this->belongsTo(MeteoDevice::class, 'device', 'id');
    }

    public function meteoDataTypes(): BelongsTo
    {
        return $this->belongsTo(MeteoDataType::class, 'dataType', 'id');
    }

}
