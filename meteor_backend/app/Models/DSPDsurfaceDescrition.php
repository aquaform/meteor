<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DSPDsurfaceDescrition extends Model
{
    protected $table = 'surface_descriptions';
    use HasFactory;
    protected $fillable = [
        'id',
        'description'
    ];

    use SoftDeletes;
    protected $dates = ['deleted_at'];

}
