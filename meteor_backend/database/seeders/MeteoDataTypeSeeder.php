<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeteoDataTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meteo_data_types')->insert([
            'id' => '1',
            'strValue' => 'unknown0',
            'comment' => '',
            'unit' => '',
            'active' => false
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '2',
            'strValue' => 'unknown1',
            'comment' => '',
            'unit' => '',
            'active' => false
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '3',
            'strValue' => 'Время прошедшее с запуска станции',
            'comment' => '',
            'unit' => '',
            'active' => false
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '4',
            'strValue' => 'Температура воздуха',
            'comment' => 'Emersit temperatures; Sokol /100',
            'unit' => '°С',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '5',
            'strValue' => 'Давление',
            'comment' => 'abs_pressures; Sokol /100',
            'unit' => 'гПА',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '6',
            'strValue' => 'Относительная влажность',
            'comment' => 'humiditys',
            'unit' => '%',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '7',
            'strValue' => 'Скорость ветра',
            'comment' => '/100',
            'unit' => 'м/с',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '8',
            'strValue' => 'Направление ветра',
            'comment' => '',
            'unit' => '°',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '9',
            'strValue' => 'Уровень осадков',
            'comment' => '/10',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '10',
            'strValue' => 'Уровень излучения ультрафиолета',
            'comment' => '/100',
            'unit' => 'W/m²',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '11',
            'strValue' => 'Уровень освещенности',
            'comment' => '',
            'unit' => 'lux',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '12',
            'strValue' => 'unknown2',
            'comment' => '',
            'unit' => '',
            'active' => false
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '13',
            'strValue' => 'Точка росы',
            'comment' => 'dew_points',
            'unit' => '°С',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '14',
            'strValue' => 'хлор',
            'comment' => 'gases type_id 2',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '15',
            'strValue' => 'аммиак',
            'comment' => 'gases type_id 4',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '16',
            'strValue' => 'сумма углеводородов',
            'comment' => 'gases type_id 7',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '17',
            'strValue' => 'монооксид углерода',
            'comment' => 'gases type_id 8',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '18',
            'strValue' => 'диоксид серы',
            'comment' => 'gases type_id 9',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '19',
            'strValue' => 'диоксид азота',
            'comment' => 'gases type_id 10',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '20',
            'strValue' => 'окись азота',
            'comment' => 'gases type_id 11',
            'unit' => 'мг/м³',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '21',
            'strValue' => 'Температура дороги',
            'comment' => 'temperature_road',
            'unit' => '°С',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '22',
            'strValue' => 'Температура блока оптики',
            'comment' => 'temperature_case',
            'unit' => '°С',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '23',
            'strValue' => 'Температура замерзания ПГМ',
            'comment' => 'temperature_frize_PGM',
            'unit' => '°С',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '24',
            'strValue' => 'Толщина водяной пленки',
            'comment' => 'height_h2o',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '25',
            'strValue' => 'Толщина снега',
            'comment' => 'height_snow',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '26',
            'strValue' => 'Толщина льда',
            'comment' => 'height_ice',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '27',
            'strValue' => 'Процент льда относительно снега',
            'comment' => 'percent_ICE',
            'unit' => '%',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '28',
            'strValue' => 'Процент ПГМ',
            'comment' => 'percent_PGM',
            'unit' => '%',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '29',
            'strValue' => 'Сцепление',
            'comment' => 'grip',
            'unit' => '',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '30',
            'strValue' => 'Состояние полотна',
            'comment' => 'road_status',
            'unit' => '',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '31',
            'strValue' => 'Бортовое напряжение питания',
            'comment' => 'U_POWER',
            'unit' => 'В',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '32',
            'strValue' => 'Расстояние до поверхности полотна',
            'comment' => 'distance_to_surface',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '33',
            'strValue' => 'Высота сугроба',
            'comment' => 'snowdrift_height',
            'unit' => 'мм',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '34',
            'strValue' => 'Интенсивность роста сугроба',
            'comment' => 'snowdrift_intence',
            'unit' => 'мм/ч',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '35',
            'strValue' => 'Угол наклона датчика к горизонту',
            'comment' => 'angle_to_road',
            'unit' => '°',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '36',
            'strValue' => 'Дрожание датчика',
            'comment' => 'Shake',
            'unit' => 'g',
            'active' => true
        ]);
        DB::table('meteo_data_types')->insert([
            'id' => '37',
            'strValue' => 'Необходимость калибровки датчика',
            'comment' => 'Need_calibration',
            'unit' => '',
            'active' => true
        ]);

    }

}
