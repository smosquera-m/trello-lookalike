<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('order_index');
    }
}
