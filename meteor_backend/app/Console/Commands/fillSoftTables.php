<?php

namespace App\Console\Commands;

use App\Models\MeteoHistory;
use Illuminate\Console\Command;

class fillSoftTables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:SoftTables';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Заполняем вспомогательные таблицы данных';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        MeteoHistory::fill10minutesRound();
        MeteoHistory::fill10minJsonPoint();
        return Command::SUCCESS;
    }
}
