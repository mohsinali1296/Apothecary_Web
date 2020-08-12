<?php

namespace App\Models\Favourites;

use Illuminate\Database\Eloquent\Model;

class Favourites_Model extends Model
{
    ///
    protected $table='favourites';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'userId',
        'stockId',
        'type',
        ];
}
