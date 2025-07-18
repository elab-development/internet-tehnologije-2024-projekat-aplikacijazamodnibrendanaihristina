<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StilController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\ClanakController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/stilovi', [StilController::class, 'index']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

Route::post('/kategorije',[KategorijaController::class,'store']);
Route::get('/kategorije', [KategorijaController::class, 'index']);

Route::post('/stilovi',[StilController::class,'store']);

Route::apiResource('clanci', ClanakController::class);


});


