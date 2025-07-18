<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Proizvod;
use App\Http\Resources\ProizvodResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProizvodController extends Controller
{
    public function index(Request $request)
    {
        try{
           $validated = $request->validate([
                'kategorija_id' => 'nullable|exists:kategorije,id',
                'stil_id' => 'nullable|exists:stilovi,id',
            ]);

            $kategorijaId = $request->kategorija_id;
            $stilId=$request->stil_id;
            Log::info('Kategorija id: ' . $kategorijaId);
            Log::info('Stil id: ' . $stilId);

            $query = Proizvod::query();
    
            if ($kategorijaId) {
                $query->where('kategorija_id', $kategorijaId);
            }
        
            if ($stilId) {
                $query->whereHas('stilovi', function ($q) use ($stilId) {
                    $q->where('stilovi.id', $stilId);
                });
            }
            
            $proizvodi = $query->orderBy('cena', 'asc')->paginate(10);
            return ProizvodResource::collection($proizvodi);
         
        }catch (\Exception $e) {
         
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške pri ucitavanju proizvoda.',
                'error' => $e->getMessage(),
            ], 500);
        }
          
        }



    public function store(Request $request)
    {
        
    try {
        $user = Auth::user();
        if($user->role!='Shop Manager'){
            return response()->json([
                'error' => 'Nemate dozvolu za kreiranje proizvoda.',
            ], 403); 
        }
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'cena'=> 'required|numeric',
            'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'kategorija_id'=>'required|exists:kategorije,id',
            'stilovi' => 'required|array',
            'stilovi.*.id' => 'exists:stilovi,id',
        ]);

        
       
            $proizvod = Proizvod::create([
                'naziv' => $validated['naziv'], 
                'opis'=>$validated['opis'],
                'cena'=>$validated['cena'],
                'kategorija_id'=>$validated['kategorija_id'],
                'putanja_slike'=>$this->uploadImage($request->file('slika'), $validated['naziv']),
            ]);

            $stilovi = collect($request->stilovi)->pluck('id');
            $proizvod->stilovi()->sync($stilovi);

          
            return response()->json([
                'message' => 'Proizvod uspešno dodat!',
                'data' => $proizvod,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju proizvoda.',
            ], 500); 
        }
    }





    private function uploadImage($file, $naziv)
{
    
    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedNaziv . '.' . $extension;

   
    $path = 'app/' . $sanitizedNaziv;

    
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename,'public');

    
    return Storage::url($pathFile);
}



}





