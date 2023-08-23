<?php

namespace App\Console\Commands;

use App\Models\MeteoHistory;
use Illuminate\Console\Command;

class fillDSPDM extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fill:DSPDM';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill data to DB from ALL DSPD-M stations';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        MeteoHistory::getDSPDdata();
        return Command::SUCCESS;
    }
}
