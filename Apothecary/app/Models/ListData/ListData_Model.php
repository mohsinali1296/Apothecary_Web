<?php

namespace App\Models\ListData;

use Illuminate\Database\Eloquent\Model;

class ListData_Model extends Model
{
    //
    protected $table='list_data';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'List_Id',
        'DataName',
        'image',
        'imageUrl',
        'deleted',
        'description',
        ];
}
