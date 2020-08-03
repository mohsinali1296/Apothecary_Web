<?php

namespace App\Models\Distributors;

use Illuminate\Database\Eloquent\Model;

class Distributors_Model extends Model
{
    //
    protected $table='distributors';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Name',
        'Email',
        'Contact',
        'Distributor_Address',
        'Company_Id',
        'Pharmacy_Id',
        'deleted',
        ];
}
