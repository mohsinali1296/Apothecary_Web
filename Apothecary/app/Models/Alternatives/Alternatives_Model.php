<?php

namespace App\Models\Alternatives;

use Illuminate\Database\Eloquent\Model;

class Alternatives_Model extends Model
{
    //
    protected $table='alternatives';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'medicine',
        'alternative_med',
        'deleted',
        ];
    
}
