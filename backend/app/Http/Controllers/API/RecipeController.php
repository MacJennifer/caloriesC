<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = Recipe::all();

        return response()->json($recipes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nameRecipes' => 'required|max:100',


        ]);

        $recipe = Recipe::create($request->all());

        return response()->json([
            'status' => 'Création d\'une recette avec succès',
            'data' => $recipe,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        return response()->json($recipe);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {
        $request->validate([
            'nameRecipes' => 'required|max:100',

        ]);

        $recipe->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'data' => $recipe,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        $recipe->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
