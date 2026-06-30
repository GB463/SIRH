<?php

namespace Database\Seeders;

use App\Models\Employe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class EmployeSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Employe::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Employe::create([
            'nom' => 'Sidibe',
            'prenom' => 'Baba',
            'email' => 'baba@atech.sn',
            'password' => Hash::make('password123'),
            'role' => 'ADMIN_RH',
            'poste' => 'Administrateur RH',
        ]);

        Employe::create([
            'nom' => 'Diallo',
            'prenom' => 'Mamadou',
            'email' => 'directeur@atech.sn',
            'password' => Hash::make('password123'),
            'role' => 'DIRECTEUR',
            'poste' => 'Directeur',
        ]);

        Employe::create([
            'nom' => 'Fall',
            'prenom' => 'Fatou',
            'email' => 'employe@atech.sn',
            'password' => Hash::make('password123'),
            'role' => 'EMPLOYE',
            'poste' => 'Développeur',
        ]);
    }
}