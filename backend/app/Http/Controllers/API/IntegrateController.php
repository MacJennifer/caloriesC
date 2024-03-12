<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Integrate;
use Illuminate\Http\Request;

class IntegrateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $integrate = Integrate::all();

        return response()->json($integrate);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'quantity' => 'required|numeric|between:0,1000',

        ]);

        $integrate = Integrate::create($request->all());

        return response()->json([
            'status' => 'Création d\'une quantité avec succès',
            'data' => $integrate,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Integrate $integrate)
    {
        return response()->json($integrate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Integrate $integrate)
    {
        $request->validate([
            'quantity' => 'required|numeric|between:0,1000',

        ]);

        $integrate->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'data' => $integrate,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Integrate $integrate)
    {
        $integrate->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
