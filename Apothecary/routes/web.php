<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{path?}', 'welcome');

/*---------------------Web Routes of Mohsin's Work--------------------*/

Route::get('/listdata','ListData\ListData_Controller@viewPage');
Route::get('/viewlistdata','ListData\ListData_Controller@displayTable');
Route::get('/editlistdata/{Id}','ListData\ListData_Controller@edit');
Route::get('/editbranddata/{Id}','Brands\Brands_Controller@edit');
Route::get('/editstockdata/{Id}','Stocks\Stocks_Controller@edit');
Route::get('/addstock/{Id}','Stocks\Stocks_Controller@edit2');
Route::get('/brand','Brands\Brands_Controller@viewPage');
Route::get('/viewbrand','Brands\Brands_Controller@displayTable');
Route::get('/pharmacy','Pharmacy\Pharmacy_Controller@viewPage');
Route::get('/Webstock','Stocks\Stocks_Controller@viewPage');
Route::get('/viewstock','Stocks\Stocks_Controller@displayTable');
Route::post('/addlistdata','ListData\ListData_Controller@saveListData')->name('addlistdata');
Route::post('/addbrand','Brands\Brands_Controller@saveBrand')->name('addbrand');
Route::post('/addpharmacy','Pharmacy\Pharmacy_Controller@savePharmacy')->name('addpharmacy');
Route::post('/addstockdata','Stocks\Stocks_Controller@saveStock')->name('addstockdata');
Route::post('ckeditor/image_upload', 'CKEditor\CKEditor_Controller@upload')->name('upload');
Route::put('/updatelistdataentry/{Id}','ListData\ListData_Controller@updateListData')->name('updatelistdataentry');
Route::put('/updatebranddataentry/{Id}','Brands\Brands_Controller@updateBrandData')->name('updatebranddataentry');
Route::patch('/updatestockdataentry/{Id}','Stocks\Stocks_Controller@updateStockData')->name('updatestockdataentry');



/*---------------------Web Routes of Mohsin's Work Add your Routes below here --------------------*/