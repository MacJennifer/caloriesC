<?php

use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FoodController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SportController;
use App\Http\Controllers\API\RecipeController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\ConceiveController;
use App\Http\Controllers\API\IntegrateController;
use App\Http\Controllers\API\NewspaperController;
use App\Http\Controllers\API\UserActivityController;
use App\Http\Controllers\API\WaterconsumptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::apiResource("foods", FoodController::class);

Route::apiResource("meals", MealController::class);
Route::apiResource("newspapers", NewspaperController::class);
Route::apiResource("waterconsumption", WaterconsumptionController::class);
Route::apiResource("sports", SportController::class);
Route::apiResource("roles", RoleController::class);
Route::apiResource("contacts", ContactController::class);
Route::apiResource("recipes", RecipeController::class);
Route::apiResource("conceive", ConceiveController::class);
Route::apiResource("useractivity", UserActivityController::class);


Route::middleware('auth:api')->group(function () {
    Route::get('/currentuser', [UserController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
