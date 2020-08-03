<?php

namespace App\Models\PharmacyPurchase;

use Illuminate\Database\Eloquent\Model;

class PharmacyPurchase_Model extends Model
{
    protected $table='purchase';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'Employee_Id',
        'Actual_Amount',
        'Discount',
        'Total_Amount',
        'payed',
        'Due',
        'Purchase_Date',
        'deleted',
        'Distributor_Id',
        ];
}
