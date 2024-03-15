<?php

namespace App\Http\Controllers\API;

use App\Models\Sport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sports = SPORT::all();

        return response()->json($sports);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['user_id' => Auth::user()->id]);
        $request->validate([
            'nameSports' => 'required|max:100',
            'met' => 'required|numeric|between:0,20',

        ]);

        $sport = SPORT::create($request->all());

        return response()->json([
            'status' => 'Création d\'aliment avec succès',
            'data' => $sport,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sport $sport)
    {
        return response()->json($sport);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sport $sport)
    {
        $request->validate([
            'nameSports' => 'required|max:100',
            'met' => 'required|numeric|between:0,20',

        ]);

        $sport->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sport $sport)
    {
        $sport->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
