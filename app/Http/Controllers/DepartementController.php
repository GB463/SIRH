<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    public function index()
    {
        $departements = Departement::with('employes')->get();
        return response()->json($departements);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:departements',
            'description' => 'nullable|string',
        ]);

        $departement = Departement::create($request->all());

        return response()->json($departement, 201);
    }

    public function show($id)
    {
        $departement = Departement::with('employes')->findOrFail($id);
        return response()->json($departement);
    }

    public function update(Request $request, $id)
    {
        $departement = Departement::findOrFail($id);

        $request->validate([
            'nom' => 'string|unique:departements,nom,' . $id,
            'description' => 'nullable|string',
        ]);

        $departement->update($request->all());

        return response()->json($departement);
    }

    public function destroy($id)
    {
        $departement = Departement::findOrFail($id);
        $departement->delete();

        return response()->json([
            'message' => 'Département supprimé avec succès'
        ]);
    }
}