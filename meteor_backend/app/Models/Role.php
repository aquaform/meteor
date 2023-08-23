<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'role',
        'description'
    ];
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
