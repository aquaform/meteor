<?php

//use App\Http\Controllers\EmercitAbsPressureController;
use App\Http\Controllers\MeteoDataTypeController;
use App\Http\Controllers\MeteoDeviceController;
use App\Http\Controllers\MeteoForecastController;
use App\Http\Controllers\MeteoJsonPointController;
//use App\Models\MeteoHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MeteoHistoryController;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/v1/points', [MeteoHistoryController::class,'points']);
Route::any('/v1/points/{id}', [MeteoHistoryController::class,'pointsHistory']);
Route::get('/v1/indicators', [MeteoHistoryController::class,'indicators']);
Route::any('/v1/indicators/{id}', [MeteoHistoryController::class,'indicatorHistory']);
Route::any('/v1/forecast/{id}',[MeteoForecastController::class,'show']);

Route::get('/v2/points', [MeteoHistoryController::class,'points']);
Route::any('/v2/points/{id}', [MeteoJsonPointController::class,'getPointsInTime']);
Route::get('/v2/indicators', [MeteoHistoryController::class,'indicators']);
Route::any('/v2/indicators/{id}', [MeteoHistoryController::class,'indicatorHistoryV2']);
Route::middleware(['auth:sanctum'])->get('/v2/forecast/{id}',[MeteoForecastController::class,'show']);




Route::any('/showStations', [MeteoDeviceController::class,'show']);
Route::any('/showDataTypes', [MeteoDataTypeController::class,'show']);
Route::any('/test', [\App\Models\MeteoHistory::class,'getDSPDdata']);


//Route::any('/v2/points/{id}', [MeteoJsonPointController::class,'pointsHistoryV3']);
//Route::any('/test/{id}', [MeteoJsonPointController::class,'getPointsInTime']);
//Route::get('/all', [\App\Http\Controllers\MeteoHistoryController::class,'index']);
//Route::any('/v1/testFill', [EmercitAbsPressureController::getNewPressureDataEmercit(2,331,5)]);
//Route::any('/last', [MeteoHistoryController::class,'index']);
//Route::any('/showAll', [MeteoHistoryController::class,'showAll']);
//Route::middleware(['auth:sanctum'])->get('/last', [MeteoHistoryController::class,'index']);
//Route::middleware(['auth:sanctum'])->get('/data/{from}{to?}{id?}{param?}', [\App\Http\Controllers\MeteoHistoryController::class,'index']);
//Route::middleware(['auth:sanctum'])->any('/v1/points', [MeteoHistoryController::class,'points']);
//Route::any('/v2/historyTest/{id}', [MeteoJsonPointController::class,'pointsHistoryV3']);
//Route::any('/v2/6hTest', [MeteoHistory::fill061218JsonPoint()]);
