<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


/*
|--------------------------------------------------------------------------
| Recherche réservation depuis SecureBookings
|--------------------------------------------------------------------------
|
| Le widget SecureBookings effectue son POST vers "/".
|
| On récupère les dates envoyées par SecureBookings
| puis on redirige vers :
|
| /reservation?check_in=YYYY-MM-DD&check_out=YYYY-MM-DD
|
*/

Route::post('/', function (Request $request) {

    /*
    |--------------------------------------------------------------------------
    | Fonction de recherche d'une valeur
    |--------------------------------------------------------------------------
    |
    | SecureBookings peut changer légèrement les noms des champs.
    | On accepte donc plusieurs variantes.
    |
    */

    $getDateValue = function (
        array $names
    ) use ($request) {

        foreach ($names as $name) {

            $value = $request->input($name);

            if (
                is_string($value) &&
                trim($value) !== ''
            ) {
                return trim($value);
            }
        }

        return null;
    };


    /*
    |--------------------------------------------------------------------------
    | Date d'arrivée
    |--------------------------------------------------------------------------
    */

    $checkIn = $getDateValue([
        'check_in',
        'check-in',
        'checkIn',
        'checkin',

        'arrival',
        'arrival_date',
        'arrivalDate',

        'date_arrivee',
        'date_arrival',
        'start_date',
        'startDate',
    ]);


    /*
    |--------------------------------------------------------------------------
    | Date de départ
    |--------------------------------------------------------------------------
    */

    $checkOut = $getDateValue([
        'check_out',
        'check-out',
        'checkOut',
        'checkout',

        'departure',
        'departure_date',
        'departureDate',

        'date_depart',
        'date_departure',
        'end_date',
        'endDate',
    ]);


    /*
    |--------------------------------------------------------------------------
    | Code promo éventuel
    |--------------------------------------------------------------------------
    */

    $promo = $getDateValue([
        'promo',
        'promo_code',
        'promoCode',
        'coupon',
        'coupon_code',
    ]);


    /*
    |--------------------------------------------------------------------------
    | Préparation de la redirection
    |--------------------------------------------------------------------------
    */

    $params = [];


    if ($checkIn) {
        $params['check_in'] = $checkIn;
    }


    if ($checkOut) {
        $params['check_out'] = $checkOut;
    }


    if ($promo) {
        $params['promo'] = $promo;
    }


    /*
    |--------------------------------------------------------------------------
    | Redirection vers la page réservation
    |--------------------------------------------------------------------------
    */

    return redirect()->route(
        'reservation',
        $params
    );

})->name('home.search');


/*
|--------------------------------------------------------------------------
| Autres pages
|--------------------------------------------------------------------------
*/

Route::get('/a-propos', function () {
    return Inertia::render('About');
})->name('about');


Route::get('/hebergement', function () {
    return Inertia::render('Rooms');
})->name('hebergement');


Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');


Route::get('/rooms', function () {
    return Inertia::render('Rooms');
})->name('rooms');


Route::get('/restauration', function () {
    return Inertia::render(
        'RestaurationPage'
    );
})->name('restauration');


/*
|--------------------------------------------------------------------------
| Page réservation
|--------------------------------------------------------------------------
|
| Exemple :
|
| /reservation
|
| ou :
|
| /reservation?check_in=2026-10-15&check_out=2026-10-20
|
*/

Route::get('/reservation', function (
    Request $request
) {

    return Inertia::render(
        'Reservation',
        [
            'checkIn' =>
                $request->query(
                    'check_in'
                ),

            'checkOut' =>
                $request->query(
                    'check_out'
                ),

            'promo' =>
                $request->query(
                    'promo'
                ),
        ]
    );

})->name('reservation');


/*
|--------------------------------------------------------------------------
| POST /reservation
|--------------------------------------------------------------------------
|
| Conservé au cas où un autre formulaire
| de votre site utilise cette route.
|
*/

Route::post('/reservation', function (
    Request $request
) {

    return redirect()->route(
        'reservation',
        [
            'check_in' =>
                $request->input(
                    'check_in'
                ),

            'check_out' =>
                $request->input(
                    'check_out'
                ),

            'promo' =>
                $request->input(
                    'promo'
                ),
        ]
    );

})->name('reservation.search');