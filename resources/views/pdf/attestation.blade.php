<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Attestation de travail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 18px;
            color: #1a1a2e;
        }
        .content {
            line-height: 2;
            text-align: justify;
        }
        .footer {
            margin-top: 60px;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ATECH CYBERSÉCURITÉ</h1>
        <p>ATTESTATION DE TRAVAIL</p>
    </div>

    <div class="content">
        <p>
            Nous, soussignés ATECH CYBERSÉCURITÉ, attestons que
            <strong>{{ $employe->prenom }} {{ $employe->nom }}</strong>
            est employé(e) au sein de notre entreprise en qualité de
            <strong>{{ $employe->poste ?? 'Employé' }}</strong>
            @if($employe->departement)
                au sein du département <strong>{{ $employe->departement->nom }}</strong>
            @endif
            .
        </p>

        @if($employe->contrat)
        <p>
            Le type de contrat est : <strong>{{ $employe->contrat->type }}</strong>
        </p>
        @endif

        <p>
            Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.
        </p>
    </div>

    <div class="footer">
        <p>Fait à Dakar, le {{ $date }}</p>
        <p>Le Directeur Général</p>
    </div>
</body>
</html>