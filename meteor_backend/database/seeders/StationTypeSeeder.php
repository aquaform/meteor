<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('station_types')->insert([
            'deviceTypeID' => '0',
            'deviceTypeName' => 'Uniq',
            'description' => 'Уникальные станции с индивидуальным подходом (например эмерситы), не участвуют в общей парадигме получения данных'
        ]);
        DB::table('station_types')->insert([
            'deviceTypeID' => '1',
            'deviceTypeName' => 'Сокол',
            'description' => 'Профессиональная метеостанция Сокол-M Казань'
        ]);
        DB::table('station_types')->insert([
            'deviceTypeID' => '2',
            'deviceTypeName' => 'ДСПД-М',
            'description' => 'Датчик состояния поверхности дорожного полотна БурСтройПроект Москва'
        ]);
    }
}
