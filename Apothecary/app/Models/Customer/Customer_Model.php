<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;

class Customer_Model extends Model
{
    //
    protected $table='customer';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Full_Name',
        'Email',
        'Contact',
        'Address',
        'deleted',
        'Pharm_Id',
        ];
}
