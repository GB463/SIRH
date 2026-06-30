<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfController extends Controller
{
    public function attestation($id)
    {
        $employe = Employe::with('departement', 'contrat')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.attestation', [
            'employe' => $employe,
            'date' => now()->format('d/m/Y'),
        ]);

        return $pdf->download('attestation_' . $employe->nom . '_' . $employe->prenom . '.pdf');
    }
}