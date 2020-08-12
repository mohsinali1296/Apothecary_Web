<?php

namespace App\Models\TemporaryUsersOrder;

use Illuminate\Database\Eloquent\Model;

class TemporaryUsersOrder_Model extends Model
{
    protected $table='temporary_userorder';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'Stock_Id',
        'qty',
        'user_Id',
        'Pharm_Id',
        'total_price',
        'stock_type',
        'price',
        'Emp_Id',
        ];
}
