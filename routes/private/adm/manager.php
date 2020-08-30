<?php

    Route::group(['prefix' => 'home'], function () {
        Route::group(['as' => 'home'], function () {
            Route::get('/','Manage\ManagerController@index')->name('.index');
        });
    });
