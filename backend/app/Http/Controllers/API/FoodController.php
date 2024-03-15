<?php

namespace App\Http\Controllers\API;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $foods = Food::all();

        return response()->json($foods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /** Put quantiyDefault 100 default */
        // dd(Auth::user()->id);
        $request->merge(['quantityDefault' => 100, 'user_id' => Auth::user()->id]);

        $request->validate([
            'nameFoods' => 'required|max:60',
            'fats' => 'required|numeric|between:0,10',
            'carbohydrates' => 'required|numeric|between:0,10',
            'fibers' => 'required|numeric|between:0,10',
            'proteins' => 'required|numeric|between:0,10',
            'salts' => 'required|numeric|between:0,10',
        ]);

        $food = Food::create($request->all());

        return response()->json([
            'status' => 'Création d\'aliment avec succès',
            'data' => $food,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        return response()->json($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Food $food)
    {

        $request->validate([

            'nameFoods' => 'required|string|max:60',
            'fats' => 'required|numeric|between:0,10',
            'carbohydrates' => 'required|numeric|between:0,10',
            'fibers' => 'required|numeric|between:0,10',
            'proteins' => 'required|numeric|between:0,10',
            'salts' => 'required|numeric|between:0,10',

        ]);


        $food->update($request->all());

        return response()->json([
            'status' => 'mise à jour effectuée',
            'data' => $food,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food)
    {
        $food->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
