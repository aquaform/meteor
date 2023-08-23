<?php

namespace App\Http\Controllers;

use App\Models\Meteo10minJsonPoint;
use App\Models\MeteoHistory;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\StoreMeteo10minJsonPointRequest;
use App\Http\Requests\UpdateMeteo10minJsonPointRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class MeteoJsonPointController extends Controller
{

    public static function getPointsInTime(Request $request, $id){
        $period_step = $request->period_step;
        if ($period_step) {
            switch ($period_step){
                case '10m':
                    $period ='10 minutes';
                    break;
                case '30m':
                    $period = '30 minutes';
                    break;
                case '1h':
                    $period = '1 hours';
                    break;
                case '6h':
                    $period = '6 hours';
                    break;
                case '1d':
                    $period = '24 hours';
                    break;
            }
        } else {
            $period_step = '10m';
            $period = '10 minutes';
        }
        $start_date = $request->start_date;
        if ($start_date) {

            $floorDate = Carbon::parse($start_date);
            $minutes = (float)$floorDate->minute;
            $minutes = floor($minutes / 10) * 10;
            $floorDate = $floorDate->minutes((int)$minutes)->seconds(0);
            $start_date = $floorDate->toDateTimeString();

        } else {
            $start_date = Meteo10minJsonPoint::where('device', $id)
                ->orderBy('created_at', 'asc')
                ->first('created_at');
            if (isset($start_date)) {
                $start_date = Carbon::parse($start_date['created_at'])->toDateTimeString();
            }
        }
        $end_date = $request->end_date;
        if ($end_date) {

            $floorDate = Carbon::parse($end_date);
            $minutes = (float)$floorDate->minute;
            $minutes = floor($minutes / 10) * 10;
            $floorDate = $floorDate->minutes((int)$minutes)->seconds(0);
            $end_date = $floorDate->toDateTimeString();

        } else {
            $end_date = Meteo10minJsonPoint::where('device', $id)
                ->orderBy('created_at', 'desc')
                ->first('created_at');
            if (isset($end_date)) {
                $end_date = Carbon::parse($end_date['created_at'])->toDateTimeString();
            }
        }
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;

        $data = DB::table('meteo10min_json_points')
            ->where('device',$id)
            ->whereRaw('created_at IN (SELECT * FROM generate_series(?::timestamp,?::TIMESTAMP, ?))',[$start_date,$end_date,$period])
            ->orderBy('created_at', 'desc')
            ->paginate($count_per_page)
            ->appends([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'count_per_page' => $count_per_page,
                'period_step' => $period_step,
            ]);

        $dataJSON = $data->getCollection();
        foreach ($dataJSON as $datum){
            $datum->value=json_decode($datum->value);
            foreach ($datum->value as $value){
                //$value->forget('time');
                unset($value->time);
            }
            $datum->time = $datum->created_at;
            unset($datum->created_at);
            unset($datum->updated_at);
            //dd($datum);
        }
        $data->setCollection($dataJSON);
        $data = response()->json($data);
        return $data;
    }
    public static function pointsHistoryV3(Request $request, $id)
    {
        $period_step = $request->period_step;
        if ($period_step) {

        } else {
            $period_step = '10m';
        }
        $start_date = $request->start_date;
        if ($start_date) {
        } else {
            $start_date = Meteo10minJsonPoint::where('device', $id)
                ->orderBy('created_at', 'asc')
                ->first('created_at');
            if (isset($start_date)) {
                $start_date = Carbon::parse($start_date['created_at'])->toDateTimeString();
            }
        }
        $end_date = $request->end_date;
        if ($end_date) {
        } else {
            $end_date = Meteo10minJsonPoint::where('device', $id)
                ->orderBy('created_at', 'desc')
                ->first('created_at');
            if (isset($end_date)) {
                $end_date = Carbon::parse($end_date['created_at'])->toDateTimeString();
            }
        }
        $count_per_page = $request->count_per_page;
        if ($count_per_page) {
        } else $count_per_page = 100;

        $data = MeteoHistory::pointHistoryV2($id, $start_date, $end_date, $count_per_page, $period_step);
        //$data = Meteo10minJsonPoint::pointHistoryV3($id, $start_date, $end_date, $count_per_page, $period_step);
        $data = response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        return $data;
    }

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
     * @param \App\Http\Requests\StoreMeteo10minJsonPointRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMeteo10minJsonPointRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Meteo10minJsonPoint $meteo10minJsonPoint
     * @return \Illuminate\Http\Response
     */
    public function show(Meteo10minJsonPoint $meteo10minJsonPoint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Meteo10minJsonPoint $meteo10minJsonPoint
     * @return \Illuminate\Http\Response
     */
    public function edit(Meteo10minJsonPoint $meteo10minJsonPoint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateMeteo10minJsonPointRequest $request
     * @param \App\Models\Meteo10minJsonPoint $meteo10minJsonPoint
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMeteo10minJsonPointRequest $request, Meteo10minJsonPoint $meteo10minJsonPoint)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Meteo10minJsonPoint $meteo10minJsonPoint
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meteo10minJsonPoint $meteo10minJsonPoint)
    {
        //
    }
}
