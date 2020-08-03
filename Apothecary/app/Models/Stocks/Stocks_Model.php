<?php

namespace App\Models\Stocks;

use Illuminate\Database\Eloquent\Model;

class Stocks_Model extends Model
{
    protected $table='stock';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Name',
        'Item_Description',
        'Item_Detailed_Description',
        'Formula',
        'Pharm_Id',
        'Category_Id',
        'unit_Qty',
        'qty_per_leaf',
        'qty_per_box',
        'unit_price',
        'leaf_price',
        'box_price',
        'Profit_Price',
        'Barcode',
        'DOE',
        'expired',
        'Available',
        'unit_BuyPrice',
        'Brand',
        'deleted',
        'image',
        'imageUrl',
        'sub_category',
        'delivery_charges',
        'prescription_required'
        ];
}
