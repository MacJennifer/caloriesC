<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('newspapers', function (Blueprint $table) {
            $table->bigInteger('meal_id')->unsigned();
            $table->foreign('meal_id')
                ->references('id')
                ->on('meals');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newspapers', function (Blueprint $table) {
            //
        });
    }
};
