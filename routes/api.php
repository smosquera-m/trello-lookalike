<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/board', [BoardController::class, 'loadBoard']);
Route::post('/columns', [BoardController::class, 'addColumn']);
Route::post('/tasks', [BoardController::class, 'addTask']);
Route::post('/tasks/move', [BoardController::class, 'moveTask']);
Route::delete('/tasks/{taskId}', [BoardController::class, 'deleteTask']);
