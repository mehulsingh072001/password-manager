<?php

use App\Http\Controllers\FoldersController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// user routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);

//Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/folders/{userId}', [FoldersController::class, 'index']);
    Route::get('/folders/{userId}/{folderId}', [FoldersController::class, 'show']);
    Route::delete('/folders/{userId}/{folderId}', [FoldersController::class, 'destroy']);
    Route::post('/folders/{userId}', [FoldersController::class, 'store']);
    Route::put('/folders/{userId}/{folderId}', [FoldersController::class, 'update']);
});

