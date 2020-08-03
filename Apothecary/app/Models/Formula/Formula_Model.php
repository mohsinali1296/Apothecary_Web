<?php

namespace App\Models\Formula;

use Illuminate\Database\Eloquent\Model;

class Formula_Model extends Model
{
    //
    protected $table='formulae';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Formula',
        'deleted',
        ];
}
