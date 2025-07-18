<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StilController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/stilovi', [StilController::class, 'index']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



