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
        Schema::create('station_types', function (Blueprint $table) {
            $table->id()->unique();
            $table->smallInteger('deviceTypeID')->unique();
            $table->string('deviceTypeName')->unique();
            $table->text('description')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->index(['id','created_at']);
            $table->index(['id','deviceTypeID']);
            $table->index(['created_at','deviceTypeID']);
            $table->index(['id','created_at','deviceTypeID']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('station_types');
    }
};
