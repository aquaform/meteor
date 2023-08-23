<?php

namespace App\Http\Controllers;

use App\Models\meteo_forecast;
use Gate;
use Illuminate\Http\Request;

class MeteoForecastController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\meteo_forecast  $meteo_forecast
     * @return \Illuminate\Http\Response
     */
    public function show(meteo_forecast $meteo_forecast, $id, Request $request)
    {
        dd($request->user()->tokenCan('server:update'));
        if (! Gate::allows('get_forecast')) {
            abort(403);
        }
        $data = $meteo_forecast::find($id);
        $data = response()->json($data->data);
        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\meteo_forecast  $meteo_forecast
     * @return \Illuminate\Http\Response
     */
    public function edit(meteo_forecast $meteo_forecast)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\meteo_forecast  $meteo_forecast
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meteo_forecast $meteo_forecast)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\meteo_forecast  $meteo_forecast
     * @return \Illuminate\Http\Response
     */
    public function destroy(meteo_forecast $meteo_forecast)
    {
        //
    }
}
