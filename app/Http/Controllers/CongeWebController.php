<?php

namespace App\Http\Controllers;

use App\Models\DemandeConge;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CongeWebController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'EMPLOYE') {
            $demandes = DemandeConge::where('employe_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $demandes = DemandeConge::with('employe', 'valideur')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('Conges/Index', [
            'demandes' => $demandes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'motif' => 'required|string',
        ]);

        DemandeConge::create([
            'employe_id' => auth()->id(),
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'motif' => $request->motif,
            'statut' => 'EN_ATTENTE',
        ]);

        return redirect('/conges');
    }

    public function approuver($id)
    {
        $demande = DemandeConge::findOrFail($id);
        $demande->update([
            'statut' => 'APPROUVE',
            'valide_par' => auth()->id(),
        ]);

        return redirect('/conges');
    }

    public function rejeter(Request $request, $id)
    {
        $demande = DemandeConge::findOrFail($id);
        $demande->update([
            'statut' => 'REJETE',
            'valide_par' => auth()->id(),
            'commentaire' => $request->commentaire,
        ]);

        return redirect('/conges');
    }
}