<?php

namespace App\Http\Controllers\API;

use App\Models\Meal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
        $request->merge(['user_id' => Auth::user()->id]);
        $request->validate([
            'calories' => 'required|numeric',
            'quantity' => 'required|numeric|between:0,1000',
            'typeMeals' => 'required|string|in:breakfast,lunch,dinner,snack',
        ]);

        $date = $request->filled('mealDate') ? \Carbon\Carbon::createFromFormat('d/m/Y', $request->mealDate)->format('Y-m-d') : now()->format('Y-m-d');

        $meal = Meal::create([
            'quantity' => $request->quantity,
            'food_id' => $request->food_id,
            'mealDate' => $date,
            'calories' => $request->calories,
            'user_id' => $request->user_id,
            'typeMeals' => $request->typeMeals,

        ]);

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
            'quantity' => 'required|numeric|between:0,1000',
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
