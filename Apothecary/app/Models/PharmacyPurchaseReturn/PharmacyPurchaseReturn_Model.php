<?php

namespace App\Models\PharmacyPurchaseReturn;

use Illuminate\Database\Eloquent\Model;

class PharmacyPurchaseReturn_Model extends Model
{
    //
    protected $table='purchase_return';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'Purchase_Id',
        'Stock',
        'unit_Qty',
        'TotalPrice',
        'Return_Date',
        'Employee_Id',
        'deleted',
        ];
}
