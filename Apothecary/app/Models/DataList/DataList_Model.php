<?php

namespace App\Models\DataList;

use Illuminate\Database\Eloquent\Model;

class DataList_Model extends Model
{
    protected $table='list';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'ListName',
        ];
}
