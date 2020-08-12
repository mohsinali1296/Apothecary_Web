<?php

namespace App\Models\AppUser;

use Illuminate\Database\Eloquent\Model;

class AppUser_Model extends Model
{
    protected $table='appusers';
    public $timestamps = false;
    public $primaryKey = 'Id';

    protected $fillable = [
        'fullname',
        'contact',
        'email',
        'username',
        'pass',
        'logged',
        'local_Address',
        'City',
        'Country',
        'image',
        'imageUrl',
        'deleted',
        ];
}
