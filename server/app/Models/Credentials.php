<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credentials extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'username',
        'password'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function folders()
    {
        return $this->belongsTo(Folders::class, 'folders_id');
    }
}
