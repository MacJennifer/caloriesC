<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;
    protected $fillable = ['nameSports', 'met', 'duration'];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('duration', 'date');
    }
}
