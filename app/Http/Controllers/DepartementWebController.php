<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartementWebController extends Controller
{
    public function index()
    {
        $departements = Departement::withCount('employes')->get();

        return Inertia::render('Departements/Index', [
            'departements' => $departements,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:departements',
            'description' => 'nullable|string',
        ]);

        Departement::create($request->all());

        return redirect('/departements');
    }

    public function update(Request $request, $id)
    {
        $departement = Departement::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|unique:departements,nom,' . $id,
            'description' => 'nullable|string',
        ]);

        $departement->update($request->all());

        return redirect('/departements');
    }

    public function destroy($id)
    {
        Departement::findOrFail($id)->delete();
        return redirect('/departements');
    }
}