<?php

namespace App\Http\Controllers\API;

use App\Models\UserActivity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userActivity = UserActivity::all();

        return response()->json($userActivity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->merge(['user_id' => Auth::user()->id]);
        $request->validate([
            'duration' => 'required|max:3',

        ]);
        $date = $request->filled('mealDate') ? \Carbon\Carbon::createFromFormat('d/m/Y', $request->mealDate)->format('Y-m-d') : now()->format('Y-m-d');
        $userActivity = UserActivity::create([
            'duration' => $request->duration,
            'userActivityDate' => $date,
            'user_id' => $request->user_id,
            'sport_id' => $request->sport_id,

        ]);

        return response()->json([
            'status' => 'Création d\'un avec succès',
            'data' => $userActivity,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserActivity $userActivity)
    {
        return response()->json($userActivity);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserActivity $userActivity)
    {
        $request->validate([
            'duration' => 'required|integer',

        ]);

        $userActivity->update($request->all());

        return response()->json([
            'status' => 'Mise à jour du repas avec succès',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserActivity $userActivity)
    {
        $userActivity->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
