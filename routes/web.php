<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/get-json', function () {
    $jsonPath = resource_path('js/data/dishes.json');
    
    if (!File::exists($jsonPath)) {
        abort(404);
    }

    $jsonData = json_decode(File::get($jsonPath), true);

    return response()->json($jsonData);
});

Route::view("/{any}", "app")->where("any", ".*");
