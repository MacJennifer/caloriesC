<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class UserController extends Controller
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function currentUser()
    {

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User fetched successfully!',

            ],
            'data' => [
                'user' => auth()->user(),
            ],
        ]);
    }
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }
    public function update(Request $request, $id)
    {
        // Récupérer l'utilisateur à mettre à jour
        $user = User::findOrFail($id);

        $user->update($request->all());
        return response()->json([
            'success' => "Mise à jour de l'utilisateur avec succès",
            'data' => $user,
        ]);
    }
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json([
            'success' => 'Utilisateur supprimé avec succès'
        ]);
    }
}
