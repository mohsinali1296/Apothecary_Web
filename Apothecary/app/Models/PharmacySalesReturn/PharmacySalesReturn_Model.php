<?php

namespace App\Models\PharmacySalesReturn;

use Illuminate\Database\Eloquent\Model;

class PharmacySalesReturn_Model extends Model
{
    protected $table='sale_return';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'Sale_Id',
        'Stock',
        'unit_Qty',
        'TotalPrice',
        'Return_Date',
        'Employee_Id',
        'deleted',
        ];
}
