<?php

namespace App\Models\Ratings;

use Illuminate\Database\Eloquent\Model;

class Ratings_Model extends Model
{
    protected $table='ratings';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'User_Id',
        'rating',
        ];
}
