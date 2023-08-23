<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitTemperatureController;
use Illuminate\Console\Command;
/**
 *
 *  команда ядра ларавель запускающая проверку на наличе новых данных
 *  и перенос из базы эмерситов в основную данных по
 *  температуре
 *
 */

class fillEmercitTemperature extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:EmercitTemperature';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'fill DB with Emercit Temperature data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        EmercitTemperatureController::getNewTemperatureDataEmercit(2,331,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(3,333,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(4,335,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(5,334,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(6,336,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(7,337,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(8,338,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(9,332,4);
        EmercitTemperatureController::getNewTemperatureDataEmercit(10,339,4);
        return Command::SUCCESS;
    }
}
