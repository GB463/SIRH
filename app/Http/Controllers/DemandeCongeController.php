<?php

namespace App\Http\Controllers;

use App\Models\DemandeConge;
use Illuminate\Http\Request;

class DemandeCongeController extends Controller
{
    public function index()
    {
        $demandes = DemandeConge::with('employe', 'valideur')->get();
        return response()->json($demandes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'motif' => 'required|string',
        ]);

        $demande = DemandeConge::create([
            'employe_id' => auth()->id(),
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'motif' => $request->motif,
            'statut' => 'EN_ATTENTE',
        ]);

        return response()->json($demande, 201);
    }

    public function approuver($id)
    {
        $demande = DemandeConge::findOrFail($id);
        $demande->update([
            'statut' => 'APPROUVE',
            'valide_par' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Demande approuvée avec succès',
            'demande' => $demande,
        ]);
    }

    public function rejeter(Request $request, $id)
    {
        $demande = DemandeConge::findOrFail($id);
        $demande->update([
            'statut' => 'REJETE',
            'valide_par' => auth()->id(),
            'commentaire' => $request->commentaire,
        ]);

        return response()->json([
            'message' => 'Demande rejetée',
            'demande' => $demande,
        ]);
    }

    public function mesDemandesConge()
    {
        $demandes = DemandeConge::where('employe_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($demandes);
    }
}