<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitHumidityController;
use Illuminate\Console\Command;
/**
 *
 *  команда ядра ларавель запускающая проверку на наличе новых данных
 *  и перенос из базы эмерситов в основную данных по
 *  влажности
 *
 */

class fillEmercitHumidity extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:EmercitHumidity';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'fill DB with Emercit Humidity data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        EmercitHumidityController::getNewHumidityDataEmercit(2,331,6);
        EmercitHumidityController::getNewHumidityDataEmercit(3,333,6);
        EmercitHumidityController::getNewHumidityDataEmercit(4,335,6);
        EmercitHumidityController::getNewHumidityDataEmercit(5,334,6);
        EmercitHumidityController::getNewHumidityDataEmercit(6,336,6);
        EmercitHumidityController::getNewHumidityDataEmercit(7,337,6);
        EmercitHumidityController::getNewHumidityDataEmercit(8,338,6);
        EmercitHumidityController::getNewHumidityDataEmercit(9,332,6);
        EmercitHumidityController::getNewHumidityDataEmercit(10,339,6);
        return Command::SUCCESS;
    }
}
