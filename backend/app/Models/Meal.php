<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;
    protected $fillable = ['calories', 'quantity', 'mealDate', 'user_id', 'food_id'];

    public function integrate()
    {
        return $this->belongsToMany(Food::class);
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
