<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Waterconsumption extends Model
{
    use HasFactory;
    protected $fillable = ['glassWater', 'user_id'];

    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
