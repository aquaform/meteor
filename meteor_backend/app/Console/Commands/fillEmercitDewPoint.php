<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitDewPointController;
use Illuminate\Console\Command;
/**
 *
 *  команда ядра ларавель запускающая проверку на наличе новых данных
 *  и перенос из базы эмерситов в основную данных по
 *  точке росы
 *
 */

class fillEmercitDewPoint extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:EmercitDewPoint';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'fill DB with Emercit DewPoint data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        EmercitDewPointController::getNewDewPointEmercit(2,331,13);
        EmercitDewPointController::getNewDewPointEmercit(3,333,13);
        EmercitDewPointController::getNewDewPointEmercit(4,335,13);
        EmercitDewPointController::getNewDewPointEmercit(5,334,13);
        EmercitDewPointController::getNewDewPointEmercit(6,336,13);
        EmercitDewPointController::getNewDewPointEmercit(7,337,13);
        EmercitDewPointController::getNewDewPointEmercit(8,338,13);
        EmercitDewPointController::getNewDewPointEmercit(9,332,13);
        EmercitDewPointController::getNewDewPointEmercit(10,339,13);
        return Command::SUCCESS;
    }
}
