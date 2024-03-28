<?php

namespace App\Http\Controllers\API;

use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'caloriesburned' => $request->caloriesburned,

        ]);

        return response()->json([
            'status' => 'Création d\'un avec succès',
            'data' => $userActivity,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $useractivity = DB::table('useractivity')
            ->where('id', '=', $id)
            ->get();
        return response()->json($useractivity);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Récupérez l'activité utilisateur avec l'ID spécifié
        $useractivity = UserActivity::findOrFail($id);
        // $duration = $request->has('duration') ? $request->duration : 0;
        // Mettez à jour uniquement le champ 'duration'
        $useractivity->update([
            'duration' => $request->duration,
            'caloriesburned' => $request->caloriesburned,
            'sport_id' => $request->sport_id,
        ]);

        // Retournez une réponse JSON indiquant que la mise à jour a réussi
        return response()->json([
            'status' => 'Mise à jour de l\'activité physique avec succès',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $userActivity = UserActivity::findOrFail($id);
        $userActivity->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
