<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/img/logo.png">
    <title inertia>{{ config('app.name', 'Résidence Néhémie') }}</title>
    <!-- Style hotelLink -->
    <link rel="stylesheet" href="https://book.securebookings.net/css/app-v2.css" />



    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>