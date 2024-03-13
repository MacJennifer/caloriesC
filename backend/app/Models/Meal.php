<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;
    protected $fillable = ['calories', 'user_id'];

    public function integrate()
    {
        return $this->belongsToMany(Integrate::class);
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
