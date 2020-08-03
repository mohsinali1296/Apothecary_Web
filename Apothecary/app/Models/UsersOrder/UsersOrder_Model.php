<?php

namespace App\Models\UsersOrder;

use Illuminate\Database\Eloquent\Model;

class UsersOrder_Model extends Model
{
    protected $table='user_orders';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'user_Id',
        'total_amount',
        'order_date',
        'deleted',
        'item_count',
        'prescription_image',
        'prescription_image_url',
        ];
}
