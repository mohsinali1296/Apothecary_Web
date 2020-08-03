<?php

namespace App\Models\UsersOrderDetails;

use Illuminate\Database\Eloquent\Model;

class UsersOrderDetails_Model extends Model
{
    protected $table='userorder_details';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'user_Id',
        'userOrder_Id',
        'stock_Id',
        'qty',
        'total_Price',
        'deleted',
        'stock_type',
        'status',
        'Pharm_Id',
        'price'
        ];
}
