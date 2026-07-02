<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeWebController extends Controller
{
    public function index()
    {
        $employes = Employe::with('departement')->get();
        $departements = Departement::all();

        return Inertia::render('Employes/Index', [
            'employes' => $employes,
            'departements' => $departements,
        ]);
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

        Employe::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'poste' => $request->poste,
            'departement_id' => $request->departement_id,
        ]);

        return redirect('/employes')->with('success', 'Employe cree avec succes');
    }

    public function update(Request $request, $id)
    {
        $employe = Employe::findOrFail($id);

        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:employes,email,' . $id,
            'role' => 'required|in:EMPLOYE,DIRECTEUR,ADMIN_RH',
            'poste' => 'nullable|string',
            'departement_id' => 'nullable|exists:departements,id',
        ]);

        $employe->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'role' => $request->role,
            'poste' => $request->poste,
            'departement_id' => $request->departement_id,
        ]);

        return redirect('/employes')->with('success', 'Employe modifie avec succes');
    }

    public function destroy($id)
    {
        Employe::findOrFail($id)->delete();
        return redirect('/employes')->with('success', 'Employe supprime avec succes');
    }
}