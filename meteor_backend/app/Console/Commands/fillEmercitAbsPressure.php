<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitAbsPressureController;
use Illuminate\Console\Command;

/**
 *
 *  команда ядра ларавель запускающая проверку на наличе новых данных
 *  и перенос из базы эмерситов в основную данных по
 *  давлению
 *
 */

class fillEmercitAbsPressure extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:EmercitAbsPressure';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'fill DB with Emercit Pressure data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        EmercitAbsPressureController::getNewPressureDataEmercit(2,331,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(3,333,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(4,335,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(5,334,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(6,336,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(7,337,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(8,338,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(9,332,5);
        EmercitAbsPressureController::getNewPressureDataEmercit(10,339,5);
        return Command::SUCCESS;
    }
}
