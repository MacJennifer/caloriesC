<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;
    protected $fillable = ['nameSports', 'met', 'duration', 'user_id'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
