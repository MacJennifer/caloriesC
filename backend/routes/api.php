<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::apiResource("foods", FoodController::class);
Route::apiResource("integrate", IntegrateController::class);
Route::apiResource("meals", MealController::class);
Route::apiResource("newspapers", NewspaperController::class);
Route::apiResource("waterconsumption", WaterconsumptionController::class);
Route::apiResource("sports", SportController::class);
Route::apiResource("roles", RoleController::class);
Route::apiResource("contacts", ContactController::class);
Route::apiResource("recipes", RecipeController::class);
Route::apiResource("conceive", ConceiveController::class);
