<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class surfaceDescritionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('pgsql')->table('surface_descriptions')->insert([
            'id' => '0',
            'description' => 'Измерение невозможно',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '1',
            'description' => 'Сухо',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '2',
            'description' => 'Влажно',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '3',
            'description' => 'Мокро',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '5',
            'description' => 'Лёд',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '6',
            'description' => 'Снег',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '9',
            'description' => 'Противогололёдные материалы',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '10',
            'description' => 'Снег со льдом',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '11',
            'description' => 'Сухо, небольшие следы снега/льда',
        ]);
        DB::table('surface_descriptions')->insert([
            'id' => '49',
            'description' => 'Снег, посыпанный песком',
        ]);
    }
}
