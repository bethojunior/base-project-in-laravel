<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::get('/home', 'HomeController@index')->name('home');

//    Route::resource('timelineTickets', 'Ticket\TimelineTicketController');

});


Route::middleware('auth')
    ->group(base_path('routes/private/user.php'));

