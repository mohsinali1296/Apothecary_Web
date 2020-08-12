<?php

namespace App\Models\Articles;

use Illuminate\Database\Eloquent\Model;

class Articles_Model extends Model
{
    //

    protected $table='articles';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'url',
    ];
}
