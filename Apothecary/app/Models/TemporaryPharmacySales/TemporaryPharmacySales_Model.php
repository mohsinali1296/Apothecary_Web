<?php

namespace App\Models\TemporaryPharmacySales;

use Illuminate\Database\Eloquent\Model;

class TemporaryPharmacySales_Model extends Model
{
    protected $table='temporary_pharmacysales';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Stock_Id',
        'Emp_Id',
        'Pharm_Id',
        'unit_qty',
        'total_price',
        'stock_type',
        ];
}
