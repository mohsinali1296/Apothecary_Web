<?php

namespace App\Models\PharmacySalesDetails;

use Illuminate\Database\Eloquent\Model;

class PharmacySalesDetails_Model extends Model
{
    protected $table='sale_details';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Pharm_Id',
        'Stock_Id',
        'Sale_Id',
        'unit_Qty',
        'deleted',
        'Pharm_Id',
        'stock_type',
        ];
}
