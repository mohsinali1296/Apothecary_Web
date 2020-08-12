<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Model;

class Cart_Model extends Model
{
    //
    protected $table='cart';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Stock_Id',
        'qty',
        'user_Id',
        'deleted',
        'totalPrice',
        'type',
        ];
}
