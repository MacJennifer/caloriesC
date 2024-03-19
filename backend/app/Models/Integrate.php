<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integrate extends Model
{
    use HasFactory;
    protected $table = 'integrate';
    protected $fillable = ['food_id', 'meal_id', 'quantity', 'mealDate'];

    public function foods()
    {
        return $this->belongsToMany(Food::class);
    }
    public function meals()
    {
        return $this->belongsToMany(Meal::class);
    }
}
