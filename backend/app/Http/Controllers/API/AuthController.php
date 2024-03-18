<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($token = auth()->attempt($request->only('email', 'password'))) {
            $user = auth()->user();

            //On intégre le role_id dans le token
            $customClaims = ['role_id' => $user->role_id];

            // Générer le token avec les réclamations personnalisées
            $token = Auth::claims($customClaims)->attempt($request->only('email', 'password'));


            return response()->json([
                'meta' => [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'User authenticated successfully.',
                ],
                'data' => [
                    'user' => $user,
                    'auth' => [
                        'token' => $token,
                        'type' => 'Bearer',
                        'expires_in' => Auth::factory()->getTTL() * 60,
                        'role_id' => $user->role_id,
                    ],
                ],
            ]);
        }
    }
    public function calculCaloriesPerDay($sexe, $age, $size, $weight, $activity, $objective)
    {

        if ($objective === 'perte de poids') {
            if ($sexe === 'homme') {
                $baseCalories = 66.50 + (13.75 * $weight) + (5 * $size) - (6.77 * $age) - 500;
            } else {
                $baseCalories = 655.1 + (9.56 * $weight) + (1.85 * $size) - (4.67 * $age) - 500;
            }
        }
        if ($objective === 'stabilite du poids') {
            if ($sexe === 'homme') {
                $baseCalories = 66.50 + (13.75 * $weight) + (5 * $size) - (6.77 * $age);
            } else {
                $baseCalories = 655.1 + (9.56 * $weight) + (1.85 * $size) - (4.67 * $age);
            }
        }


        // level activity
        switch ($activity) {
            case 'actif':
                $baseCalories *= 1.725;
                break;
            case 'peu actif':
                $baseCalories *= 1.375;
                break;
            case 'pas actif':
                $baseCalories *= 1.2;
                break;
        }
        // dd($baseCalories);
        return $baseCalories;
    }

    public function register(Request $request)
    {

        $request->validate([
            'pseudo' => 'required|string|max:50',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'sexe' => 'required|string|in:homme,femme',
            'age' => 'required|integer|min:15|max:70',
            'size' => 'required|integer|min:0|max:300',
            'weight' => 'required|numeric|between:45,200',
            'objective' => 'required|string|in:perte de poids,stabilite du poids',
            'activity' => 'required|string|in:actif,peu actif,pas actif',

        ]);
        $caloriesPerDay = $this->calculCaloriesPerDay(
            $request->sexe,
            $request->age,
            $request->size,
            $request->weight,
            $request->activity,
            $request->objective
        );

        $user = User::create([
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'sexe' => $request->sexe,
            'age' => $request->age,
            'size' => $request->size,
            'weight' => $request->weight,
            'objective' => $request->objective,
            'activity' => $request->activity,
            'caloriesPerDay' => $caloriesPerDay,
            'role_id' => 1,
        ]);

        return response()->json([
            'message' => 'Enregistrement reussi',
            'user' => $user
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
