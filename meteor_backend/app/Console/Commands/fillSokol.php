<?php

namespace App\Console\Commands;

use App\Http\Controllers\EmercitAbsPressureController;
use App\Models\MeteoHistory;
use Illuminate\Console\Command;
/**
 *
 *  команда ядра ларавель запускающая процесс
 *  получения и заполнения базы дынными с сокола
 *
 */

class fillSokol extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:sokol';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        MeteoHistory::storeDeviceData(1);
        return Command::SUCCESS;
    }
}
