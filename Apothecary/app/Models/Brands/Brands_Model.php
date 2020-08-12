<?php

namespace App\Models\Brands;

use Illuminate\Database\Eloquent\Model;

class Brands_Model extends Model
{
    protected $table='brands';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'SubCategoryId',
        'Brand_Name',
        'image',
        'imageUrl',
        'deleted'
        ];
}
