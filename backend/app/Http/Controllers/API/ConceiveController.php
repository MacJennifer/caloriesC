<?php

namespace App\Http\Controllers\API;

use App\Models\Conceive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ConceiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $conceives = Conceive::all();

        return response()->json($conceives);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'portion' => 'required|integer',
        ]);

        $conceive = Conceive::create($request->all());

        return response()->json([
            'status' => 'Création de la portion avec succès',
            'data' => $conceive,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conceive $conceive)
    {
        return response()->json($conceive);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conceive $conceive)
    {
        $request->validate([
            'portion' => 'required|integer',
        ]);

        $conceive->update($request->all());

        return response()->json([
            'status' => 'Mise à jour effectuée',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conceive $conceive)
    {
        $conceive->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
