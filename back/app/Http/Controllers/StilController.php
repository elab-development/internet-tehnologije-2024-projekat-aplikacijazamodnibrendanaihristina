<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stil;
use App\Http\Resources\StilResource;
use Illuminate\Support\Facades\Auth;


class StilController extends Controller
{
    public function index()
    {
        $stilovi = Stil::all(); 
        return StilResource::collection($stilovi);
        
    }



}
