<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Newspaper;
use Illuminate\Http\Request;

class NewspaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newsPapers = Newspaper::all();

        return response()->json($newsPapers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'numberWeek' => 'required|integer',
            'totalCalories' => 'required|integer',


        ]);

        $newspaper = Newspaper::create($request->all());

        return response()->json([
            'status' => 'Création d\'un journal avec succès',
            'data' => $newspaper,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Newspaper $newspaper)
    {
        return response()->json($newspaper);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Newspaper $newspaper)
    {
        $request->validate([
            'numberWeek' => 'required|integer',
            'totalCalories' => 'required|integer',


        ]);

        $newspaper->update($request->all());

        return response()->json([
            'status' => 'Mise à jour du journal avec succès',
            'data' => $newspaper,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Newspaper $newspaper)
    {
        $newspaper->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
