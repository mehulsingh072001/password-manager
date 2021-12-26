<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credentials extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'url',
        'username',
        'password',
        'folder',
    ];

    public function folders()
    {
        return $this->belongsTo(Folders::class, 'folders_id');
    }
}
