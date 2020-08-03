<?php

namespace App\Models\TemporaryPharmacyPurchase;

use Illuminate\Database\Eloquent\Model;

class TemporaryPharmacyPurchase_Model extends Model
{
    protected $table='temporary_pharmacypurchase';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Stock_Id',
        'Emp_Id',
        'Pharm_Id',
        'unit_qty',
        'buy_price',
        'total_price',
        ];
}
