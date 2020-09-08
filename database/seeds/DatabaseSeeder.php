<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AppTypeSeeder::class);
        $this->call(ModuleTypesSeeder::class);
        $this->call(StatusTestSeeder::class);
        $this->call(StatusTicketSeeder::class);
        $this->call(UserStatusSeeder::class);
        $this->call(UserTypesSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ImplementationStatus::class);
    }
}
