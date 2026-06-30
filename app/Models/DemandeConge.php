<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeConge extends Model
{
    protected $table = 'demandes_conge';

    protected $fillable = [
        'employe_id',
        'date_debut',
        'date_fin',
        'motif',
        'statut',
        'commentaire',
        'valide_par',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }

    public function valideur()
    {
        return $this->belongsTo(Employe::class, 'valide_par');
    }

    public function calculerDuree()
    {
        return $this->date_debut->diffInDays($this->date_fin);
    }
}