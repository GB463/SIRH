<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentRH extends Model
{
    protected $table = 'documents_rh';

    protected $fillable = [
        'employe_id',
        'type',
        'description',
        'chemin_fichier',
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }
}