<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Waterconsumption;
use Illuminate\Http\Request;

class WaterconsumptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $waterconsumption = WaterCONSUMPTION::all();

        return response()->json($waterconsumption);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'glassWater' => 'required|numeric|between:0,20',
        ]);

        $waterconsumption = Waterconsumption::create($request->all());

        return response()->json([
            'status' => 'Création de consommation d\'eau avec succès',
            'data' => $waterconsumption,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Waterconsumption $waterconsumption)
    {
        return response()->json($waterconsumption);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Waterconsumption $waterconsumption)
    {
        $request->validate([
            'glassWater' => 'required|numeric|between:0,20',
        ]);

        $waterconsumption->update($request->all());

        return response()->json([
            'status' => 'Création de consommation d\'eau avec succès',
            'data' => $waterconsumption,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Waterconsumption $waterconsumption)
    {
        $waterconsumption->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
