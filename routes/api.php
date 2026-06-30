<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\DemandeCongeController;
use App\Http\Controllers\DocumentRHController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Employés
    Route::apiResource('employes', EmployeController::class);

    // Départements
    Route::apiResource('departements', DepartementController::class);

    // Congés
    Route::get('/conges', [DemandeCongeController::class, 'index']);
    Route::post('/conges', [DemandeCongeController::class, 'store']);
    Route::get('/mes-conges', [DemandeCongeController::class, 'mesDemandesConge']);
    Route::put('/conges/{id}/approuver', [DemandeCongeController::class, 'approuver']);
    Route::put('/conges/{id}/rejeter', [DemandeCongeController::class, 'rejeter']);

    // Documents
    Route::get('/documents', [DocumentRHController::class, 'index']);
    Route::post('/documents/generer/{id}', [DocumentRHController::class, 'generer']);
});