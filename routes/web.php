<?php

use App\Http\Controllers\AuthWebController;
use App\Http\Controllers\EmployeWebController;
use App\Http\Controllers\CongeWebController;
use App\Http\Controllers\DepartementWebController;
use App\Http\Controllers\PdfController;
use App\Models\Employe;
use App\Models\DemandeConge;
use App\Models\Departement;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [AuthWebController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthWebController::class, 'login']);
Route::post('/logout', [AuthWebController::class, 'logout']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $employesParDepartement = Departement::withCount('employes')->get()->map(function ($dep) {
            return ['nom' => $dep->nom, 'total' => $dep->employes_count];
        });

        $congesParStatut = [
            ['statut' => 'En attente', 'total' => DemandeConge::where('statut', 'EN_ATTENTE')->count()],
            ['statut' => 'Approuve', 'total' => DemandeConge::where('statut', 'APPROUVE')->count()],
            ['statut' => 'Rejete', 'total' => DemandeConge::where('statut', 'REJETE')->count()],
        ];

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalEmployes' => Employe::count(),
                'congesEnAttente' => DemandeConge::where('statut', 'EN_ATTENTE')->count(),
                'totalDepartements' => Departement::count(),
            ],
            'employesParDepartement' => $employesParDepartement,
            'congesParStatut' => $congesParStatut,
        ]);
    })->name('dashboard');

    Route::get('/employes', [EmployeWebController::class, 'index']);
    Route::post('/employes', [EmployeWebController::class, 'store']);
    Route::put('/employes/{id}', [EmployeWebController::class, 'update']);
    Route::delete('/employes/{id}', [EmployeWebController::class, 'destroy']);

    Route::get('/conges', [CongeWebController::class, 'index']);
    Route::post('/conges', [CongeWebController::class, 'store']);
    Route::put('/conges/{id}/approuver', [CongeWebController::class, 'approuver']);
    Route::put('/conges/{id}/rejeter', [CongeWebController::class, 'rejeter']);

    Route::get('/departements', [DepartementWebController::class, 'index']);
    Route::post('/departements', [DepartementWebController::class, 'store']);
    Route::put('/departements/{id}', [DepartementWebController::class, 'update']);
    Route::delete('/departements/{id}', [DepartementWebController::class, 'destroy']);

    Route::get('/pdf/attestation/{id}', [PdfController::class, 'attestation']);
});