<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['EMPLOYE', 'DIRECTEUR', 'ADMIN_RH'])->default('EMPLOYE');
            $table->string('poste')->nullable();
            $table->string('telephone')->nullable();
            $table->date('date_embauche')->nullable();
            $table->foreignId('departement_id')->nullable()->constrained('departements')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};