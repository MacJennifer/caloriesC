<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    use HasFactory;
    protected $table = 'userActivity';
    protected $fillable = ['duration', 'userActivityDate', 'user_id', 'sport_id'];


    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function sports()
    {
        return $this->belongsToMany(Sport::class);
    }
}
