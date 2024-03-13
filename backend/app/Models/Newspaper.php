<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newspaper extends Model
{
    use HasFactory;
    protected $fillable = ['numberWeek', 'totalCalories', 'meal_id', 'user_id'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
