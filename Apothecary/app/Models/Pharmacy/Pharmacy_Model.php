<?php

namespace App\Models\Pharmacy;

use Illuminate\Database\Eloquent\Model;

class Pharmacy_Model extends Model
{
    protected $table='pharmacy';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Name',
        'Contact',
        'Pharmacy_Address',
        'Latitude',
        'Longitude',
        'deleted',
        'email',
        'pass',
        'image',
        'imageUrl',
        ];
}
