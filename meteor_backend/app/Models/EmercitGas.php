<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmercitGas extends Model
{
    use HasFactory;
    protected $connection = 'mysql2';
    protected $table = 'gases';
    public $timestamps = false;
    const UPDATED_AT = null;
    const CREATED_AT = 'time_utc';

}
