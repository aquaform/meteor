<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meteo_histories', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('device');
            $table->smallInteger('dataType');
            $table->text('value')->nullable($value = true);
            //$table->string('strValue')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
            $table->timestamp('createround')->generatedAs("date_bin('10 minutes', created_at, TIMESTAMP '2001-01-01')");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meteo_histories');
    }
};
