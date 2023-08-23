<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // расписание выполнения команд ядра ларавель

        $schedule->command('fill:sokol')
                ->everyTenMinutes()
                ->withoutOverlapping()
                ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:EmercitAbsPressure')
                ->everyFiveMinutes()
                ->withoutOverlapping()
                ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:EmercitTemperature')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:EmercitHumidity')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:EmercitGase')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:EmercitDewPoint')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('update:Forecast')
            ->hourly()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:SoftTables')
            ->everyTenMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
        $schedule->command('fill:DSPDM')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->sendOutputTo("scheduler-output.log");
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
