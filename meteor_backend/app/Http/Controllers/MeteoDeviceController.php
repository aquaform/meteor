<?php

namespace App\Http\Controllers;

use App\Models\MeteoDevice;
use Illuminate\Http\Request;

class MeteoDeviceController extends Controller
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
     * @param  \App\Models\MeteoDevice  $meteoDevice
     * @return \Illuminate\Http\Response
     */
    public function show(MeteoDevice $meteoDevice)
    {
        return $meteoDevice->get()->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MeteoDevice  $meteoDevice
     * @return \Illuminate\Http\Response
     */
    public function edit(MeteoDevice $meteoDevice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MeteoDevice  $meteoDevice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MeteoDevice $meteoDevice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MeteoDevice  $meteoDevice
     * @return \Illuminate\Http\Response
     */
    public function destroy(MeteoDevice $meteoDevice)
    {
        //
    }
}
