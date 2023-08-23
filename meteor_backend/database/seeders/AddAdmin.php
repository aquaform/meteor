<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::firstOrNew(
            ['name' => 'Admin']
        );
        $password = env('ADMPASS');
        $admin->password = Hash::make($password);
        $admin->email = env('ADMEMAIL');
        //dd($admin);
        $admin->save();

        //dd($admin->id);

        $addRole = UserRole::firstOrCreate(
            ['userID' => $admin->id,
            'roleID' => '1']);
       /* $user = new User();
        $user->username = 'Admin';
        $user->password = Hash::make('userpassword');
        $user->email = 'useremail@something.com';
        $user->save();*/
    }
}
