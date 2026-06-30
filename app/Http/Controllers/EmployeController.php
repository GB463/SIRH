<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeController extends Controller
{
    public function index()
    {
        $employes = Employe::with('departement', 'contrat')->get();
        return response()->json($employes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:employes',
            'password' => 'required|min:6',
            'role' => 'required|in:EMPLOYE,DIRECTEUR,ADMIN_RH',
            'poste' => 'nullable|string',
            'departement_id' => 'nullable|exists:departements,id',
        ]);

        $employe = Employe::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'poste' => $request->poste,
            'departement_id' => $request->departement_id,
        ]);

        return response()->json($employe, 201);
    }

    public function show($id)
    {
        $employe = Employe::with('departement', 'contrat')->findOrFail($id);
        return response()->json($employe);
    }

    public function update(Request $request, $id)
    {
        $employe = Employe::findOrFail($id);

        $request->validate([
            'nom' => 'string',
            'prenom' => 'string',
            'email' => 'email|unique:employes,email,' . $id,
            'role' => 'in:EMPLOYE,DIRECTEUR,ADMIN_RH',
            'poste' => 'nullable|string',
            'departement_id' => 'nullable|exists:departements,id',
        ]);

        $employe->update($request->all());

        return response()->json($employe);
    }

    public function destroy($id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();

        return response()->json([
            'message' => 'Employé supprimé avec succès'
        ]);
    }
}