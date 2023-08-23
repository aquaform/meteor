<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitGaseController;
use Illuminate\Console\Command;
/**
 *
 *  команда ядра ларавель запускающая проверку на наличе новых данных
 *  и перенос из базы эмерситов в основную данных по
 *  газам
 *
 */

class fillEmercitGase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:EmercitGases';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'fill DB with Emercit Gases data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        EmercitGaseController::getNewGaseDataEmercit(2,331,14);
        EmercitGaseController::getNewGaseDataEmercit(3,333,14);
        EmercitGaseController::getNewGaseDataEmercit(4,335,14);
        EmercitGaseController::getNewGaseDataEmercit(5,334,14);
        EmercitGaseController::getNewGaseDataEmercit(6,336,14);
        EmercitGaseController::getNewGaseDataEmercit(7,337,14);
        EmercitGaseController::getNewGaseDataEmercit(8,338,14);
        EmercitGaseController::getNewGaseDataEmercit(9,332,14);
        EmercitGaseController::getNewGaseDataEmercit(10,339,14);
        EmercitGaseController::getNewGaseDataEmercit(2,331,15);
        EmercitGaseController::getNewGaseDataEmercit(3,333,15);
        EmercitGaseController::getNewGaseDataEmercit(4,335,15);
        EmercitGaseController::getNewGaseDataEmercit(5,334,15);
        EmercitGaseController::getNewGaseDataEmercit(6,336,15);
        EmercitGaseController::getNewGaseDataEmercit(7,337,15);
        EmercitGaseController::getNewGaseDataEmercit(8,338,15);
        EmercitGaseController::getNewGaseDataEmercit(9,332,15);
        EmercitGaseController::getNewGaseDataEmercit(10,339,15);
        EmercitGaseController::getNewGaseDataEmercit(2,331,16);
        EmercitGaseController::getNewGaseDataEmercit(3,333,16);
        EmercitGaseController::getNewGaseDataEmercit(4,335,16);
        EmercitGaseController::getNewGaseDataEmercit(5,334,16);
        EmercitGaseController::getNewGaseDataEmercit(6,336,16);
        EmercitGaseController::getNewGaseDataEmercit(7,337,16);
        EmercitGaseController::getNewGaseDataEmercit(8,338,16);
        EmercitGaseController::getNewGaseDataEmercit(9,332,16);
        EmercitGaseController::getNewGaseDataEmercit(10,339,16);
        EmercitGaseController::getNewGaseDataEmercit(2,331,17);
        EmercitGaseController::getNewGaseDataEmercit(3,333,17);
        EmercitGaseController::getNewGaseDataEmercit(4,335,17);
        EmercitGaseController::getNewGaseDataEmercit(5,334,17);
        EmercitGaseController::getNewGaseDataEmercit(6,336,17);
        EmercitGaseController::getNewGaseDataEmercit(7,337,17);
        EmercitGaseController::getNewGaseDataEmercit(8,338,17);
        EmercitGaseController::getNewGaseDataEmercit(9,332,17);
        EmercitGaseController::getNewGaseDataEmercit(10,339,17);
        EmercitGaseController::getNewGaseDataEmercit(2,331,18);
        EmercitGaseController::getNewGaseDataEmercit(3,333,18);
        EmercitGaseController::getNewGaseDataEmercit(4,335,18);
        EmercitGaseController::getNewGaseDataEmercit(5,334,18);
        EmercitGaseController::getNewGaseDataEmercit(6,336,18);
        EmercitGaseController::getNewGaseDataEmercit(7,337,18);
        EmercitGaseController::getNewGaseDataEmercit(8,338,18);
        EmercitGaseController::getNewGaseDataEmercit(9,332,18);
        EmercitGaseController::getNewGaseDataEmercit(10,339,18);
        EmercitGaseController::getNewGaseDataEmercit(2,331,19);
        EmercitGaseController::getNewGaseDataEmercit(3,333,19);
        EmercitGaseController::getNewGaseDataEmercit(4,335,19);
        EmercitGaseController::getNewGaseDataEmercit(5,334,19);
        EmercitGaseController::getNewGaseDataEmercit(6,336,19);
        EmercitGaseController::getNewGaseDataEmercit(7,337,19);
        EmercitGaseController::getNewGaseDataEmercit(8,338,19);
        EmercitGaseController::getNewGaseDataEmercit(9,332,19);
        EmercitGaseController::getNewGaseDataEmercit(10,339,19);
        EmercitGaseController::getNewGaseDataEmercit(2,331,20);
        EmercitGaseController::getNewGaseDataEmercit(3,333,20);
        EmercitGaseController::getNewGaseDataEmercit(4,335,20);
        EmercitGaseController::getNewGaseDataEmercit(5,334,20);
        EmercitGaseController::getNewGaseDataEmercit(6,336,20);
        EmercitGaseController::getNewGaseDataEmercit(7,337,20);
        EmercitGaseController::getNewGaseDataEmercit(8,338,20);
        EmercitGaseController::getNewGaseDataEmercit(9,332,20);
        EmercitGaseController::getNewGaseDataEmercit(10,339,20);

        return Command::SUCCESS;
    }
}
