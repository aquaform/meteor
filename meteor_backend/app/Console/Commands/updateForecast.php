<?php

namespace App\Console\Commands;

use App\Models\meteo_forecast;
use Illuminate\Console\Command;

class updateForecast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:Forecast';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Обновляем таблицу прогноза погоды';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        meteo_forecast::updateForecast();
        return Command::SUCCESS;
    }
}
