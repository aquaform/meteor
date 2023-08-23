<?php

namespace App\Http\Controllers;

use App\Models\MeteoDataType;
use Illuminate\Http\Request;

class MeteoDataTypeController extends Controller
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
     * @param  \App\Models\MeteoDataType  $meteoDataType
     * @return \Illuminate\Http\Response
     */
    public function show(MeteoDataType $meteoDataType)
    {
        return $meteoDataType->get()->toJson(JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MeteoDataType  $meteoDataType
     * @return \Illuminate\Http\Response
     */
    public function edit(MeteoDataType $meteoDataType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MeteoDataType  $meteoDataType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MeteoDataType $meteoDataType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MeteoDataType  $meteoDataType
     * @return \Illuminate\Http\Response
     */
    public function destroy(MeteoDataType $meteoDataType)
    {
        //
    }
}
