<?php

namespace App\Models\PharmacySales;

use Illuminate\Database\Eloquent\Model;

class PharmacySales_Model extends Model
{
    protected $table='pharmacysales';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'Customer_Id',
        'Employee_Id',
        'Actual_Amount',
        'Discount',
        'Total_Amount',
        'Payed',
        'Order_Date',
        'deleted',
	'due'
        ];
}
