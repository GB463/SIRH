<?php

use App\Models\Employe;

return [

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'employes'),
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'employes',
        ],
    ],

    'providers' => [
        'employes' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', Employe::class),
        ],
    ],

    'passwords' => [
        'employes' => [
            'provider' => 'employes',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];