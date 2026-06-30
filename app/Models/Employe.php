<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Employe extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'employes';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'role',
        'poste',
        'telephone',
        'date_embauche',
        'departement_id',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
        'date_embauche' => 'date',
    ];

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function contrat()
    {
        return $this->hasOne(Contrat::class);
    }

    public function demandesConge()
    {
        return $this->hasMany(DemandeConge::class);
    }

    public function documents()
    {
        return $this->hasMany(DocumentRH::class);
    }
}