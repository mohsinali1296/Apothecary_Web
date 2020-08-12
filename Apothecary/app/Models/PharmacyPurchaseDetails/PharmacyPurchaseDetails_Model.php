<?php

namespace App\Models\PharmacyPurchaseDetails;

use Illuminate\Database\Eloquent\Model;

class PharmacyPurchaseDetails_Model extends Model
{
    //
    protected $table='purchase_details';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Stock_Id',
        'Purchase_Id',
        'unit_Qty',
        'unit_BuyPrice',
        'deleted',
        'Pharm_Id',
        ];

}
