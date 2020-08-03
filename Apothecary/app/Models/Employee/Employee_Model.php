<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Model;

class Employee_Model extends Model
{
    //
    protected $table='employee';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'First_Name',
        'Last_Name',
        'Gender',
        'Designation',
        'Email',
        'Contact',
        'CNIC',
        'Address',
        'Username',
        'Password',
        'deleted',
        ];
}
