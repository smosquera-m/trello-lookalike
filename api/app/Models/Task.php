<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';

    public function column()
    {
        return $this->belongsTo(Column::class);
    }
}
