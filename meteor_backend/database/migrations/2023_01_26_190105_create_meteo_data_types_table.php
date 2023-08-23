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
        Schema::create('meteo_data_types', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('strValue')->unique();
            $table->softDeletes();
            $table->timestamps();
            $table->text('comment')->nullable();
            $table->string('unit', 255)->nullable();
            $table->boolean('active')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meteo_data_types');
    }
};
