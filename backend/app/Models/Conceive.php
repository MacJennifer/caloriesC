<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conceive extends Model
{
    use HasFactory;
    protected $table = 'conceive';
    protected $fillable = ['food_id', 'recipe_id', 'portion'];
}
