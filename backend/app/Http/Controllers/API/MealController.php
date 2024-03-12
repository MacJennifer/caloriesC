<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use Illuminate\Http\Request;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meals = Meal::all();

        return response()->json($meals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'calories' => 'required|integer',
        ]);

        $meal = Meal::create($request->all());

        return response()->json([
            'status' => 'Création d\'un repas avec succès',
            'data' => $meal,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return response()->json($meal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meal $meal)
    {
        $request->validate([
            'calories' => 'required|integer',
        ]);

        $meal->update($request->all());

        return response()->json([
            'status' => 'Mise à jour du repas avec succès',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        $meal->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
