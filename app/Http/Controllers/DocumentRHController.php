<?php

namespace App\Http\Controllers;

use App\Models\DocumentRH;
use App\Models\Employe;
use Illuminate\Http\Request;

class DocumentRHController extends Controller
{
    public function index()
    {
        $documents = DocumentRH::with('employe')->get();
        return response()->json($documents);
    }

    public function generer(Request $request, $id)
    {
        $employe = Employe::with('departement', 'contrat')->findOrFail($id);

        $document = DocumentRH::create([
            'employe_id' => $employe->id,
            'type' => $request->type ?? 'attestation',
            'description' => 'Document généré le ' . now()->format('d/m/Y'),
            'chemin_fichier' => 'documents/' . $employe->id . '_' . now()->timestamp . '.pdf',
        ]);

        return response()->json([
            'message' => 'Document généré avec succès',
            'document' => $document,
        ]);
    }
}