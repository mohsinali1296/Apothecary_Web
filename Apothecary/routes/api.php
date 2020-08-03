<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*-------------------------------Android Api Routes----------------------------------*/

Route::get('/getlistdata/{listid}','ListData\ListData_Controller@getListDataByListId');

Route::get('/getbrands/{id}','Brands\Brands_Controller@getBrandsByCategoryId');

Route::get('/getbrands','Brands\Brands_Controller@getAllBrands');

Route::get('/getotherbrands','Brands\Brands_Controller@getAllOtherBrands');

Route::get('/getlimitedbrands/{id}','Brands\Brands_Controller@getLimitedBrandsByCategoryId');

Route::get('/getlimitedbrands','Brands\Brands_Controller@getLimitedBrands');

Route::get('/getpromotions','ListData\ListData_Controller@getPromotionImages');

Route::get('/getlistdata/{listid}/{listname}','ListData\ListData_Controller@getListDataByListId_Name');

Route::get('/getlistdataname/{listname}','ListData\ListData_Controller@getListDataByListName');

Route::get('/getpharmacylist','Pharmacy\Pharmacy_Controller@getAllPharmacies');

Route::get('/getpharmacies','Pharmacy\Pharmacy_Controller@getAllPharmacy');

Route::get('/getpharmacies/{lat}/{long}','Pharmacy\Pharmacy_Controller@getAllPharmacyWithDistance');

Route::get('/getfilteredlistdata/{dataname}','ListData\ListData_Controller@getListDataFiltered');

Route::get('/getnearpharm/{lat}/{long}','Pharmacy\Pharmacy_Controller@nearestPharmacies');

Route::get('/getallstocks/{id}','Stocks\Stocks_Controller@getAllStockListForApp');

Route::get('/getsearchedstock/{name}/{lat}/{long}/{distance}','Stocks\Stocks_Controller@getStockListForAppByName');
//$name,$lat,$long,$distance
Route::get('/getallstocks/{id}/{lat}/{long}/{distance}','Stocks\Stocks_Controller@getAllStockListNearYouForApp');

Route::post('/registeruser','AppUser\AppUser_Controller@registerUser');

Route::get('/login/{email}/{pass}','AppUser\AppUser_Controller@Login');

Route::post('/login','AppUser\AppUser_Controller@UserLogin');

Route::get('/getuser/{Id}','AppUser\AppUser_Controller@getUserById');

Route::get('/getuser','AppUser\AppUser_Controller@getAllUser');

Route::get('/checkquery','Pharmacy\Pharmacy_Controller@getPharmacy');

Route::get('/getproductbyid/{id}','Stocks\Stocks_Controller@getProductById');

Route::get('/getproductbysubcategory/{id}/{stockid}','Stocks\Stocks_Controller@getProductBySubCategoryId');

Route::get('/getproductbybrand/{id}/{stockid}','Stocks\Stocks_Controller@getProductByBrandId');

Route::post('/addfavourite','Favourites\Favourites_Controller@AddFavourite');

Route::delete('/deletefavourite/{id}','Favourites\Favourites_Controller@Delete');

Route::delete('/deletefavourite/{stockId}/{userId}/{type}','Favourites\Favourites_Controller@DeleteByStockID');

Route::get('/checkfav/{stockId}/{userId}','Favourites\Favourites_Controller@CheckFavourite');

Route::get('/checkwishlist/{stockId}/{userId}','Favourites\Favourites_Controller@CheckWishList');

Route::get('/getuserwishlist/{userId}/{type}','Favourites\Favourites_Controller@getWishListForUser');

//Route::patch('/addprofileimage/{Id}','AppUser\AppUser_Controller@uploadImage');
Route::patch('/addprofileimage/{Id}','AppUser\AppUser_Controller@uploadProfileImage');
Route::patch('/updateaddress/{Id}','AppUser\AppUser_Controller@UpdateUserAddress');
Route::patch('/updatepassword/{Id}','AppUser\AppUser_Controller@UpdatePassword');

Route::post('/addtocart','Cart\Cart_Controller@AddToCart');
Route::patch('/addtocart/{id}','Cart\Cart_Controller@UpdateCart');
Route::patch('/addtocartadd/{id}','Cart\Cart_Controller@UpdateAdd');
Route::patch('/addtocartsub/{id}','Cart\Cart_Controller@UpdateSubtract');
Route::delete('/addtocart/{id}','Cart\Cart_Controller@DeleteCart');
Route::delete('/deletecart/{userId}','Cart\Cart_Controller@DeleteAllCart');
Route::get('/addtocart/{userId}','Cart\Cart_Controller@CartList');
Route::get('/addtocart/{userId}/{stockId}','Cart\Cart_Controller@CheckCartList');

Route::post('/ratings','Ratings\Ratings_Controller@AddUserRatingForPharmacy');
Route::get('/ratings/{pharmId}','Ratings\Ratings_Controller@getPharmaryRating_ByPharmId');
Route::get('/checkratings/{userId}','Ratings\Ratings_Controller@checkRatingByUserId');
Route::post('/tempuserorder','TemporaryUsersOrder\TemporaryUsersOrder_Controller@AddTempUserOrder');
Route::get('/avgratings','Ratings\Ratings_Controller@getAverageRatings');

Route::post('/userorder','UsersOrder\UsersOrder_Controller@addUserOrder');
Route::post('/userorderdetails','UsersOrderDetails\UsersOrderDetails_Controller@addUserOrderDetails');
Route::get('/userorderdetails/{orderId}/{userId}','UsersOrderDetails\UsersOrderDetails_Controller@getUserOrderDetails');
Route::get('/userorder/{userId}','UsersOrder\UsersOrder_Controller@getUserOrder');

/*---------------------Android Api Routes End  Add Routes for Web Below Please----------------------------------*/
Route::post('/Pharm_login', 'Pharmacy\Pharmacy_Controller@login');
Route::post('/AddPharm', 'Pharmacy\Pharmacy_Controller@PharmacyRegistration');
Route::get('/pharmList', 'Pharmacy\Pharmacy_Controller@list');
Route::get('/employees/{pharmid}', 'Employee\Employee_Controller@showEmployees');
Route::post('/employees', 'Employee\Employee_Controller@NewEmployeeInsertion');
Route::get('/distributor/{pharmid}', 'Distributors\Distributors_Controller@show');
Route::post('/distributorAdd', 'Distributors\Distributors_Controller@store');
Route::get('/customer/{pharmid}', 'Customer\Customer_Controller@show');
Route::post('/customerAdd', 'Customer\Customer_Controller@store');
Route::get('/customerEdit', 'Customer\Customer_Controller@edit');
Route::post('/customerUpdate', 'Customer\Customer_Controller@update');
Route::post('/StockEntry', 'Stocks\Stocks_Controller@saveStock_Web');
Route::get('/getFormulae', 'Formula\Formula_Controller@show');
Route::put('/custDestroy/{custId}', 'Customer\Customer_Controller@destroy');
Route::put('/empDestroy/{employeeId}', 'Employee\Employee_Controller@destroy');
Route::put('/distDestroy/{DistId}', 'Distributors\Distributors_Controller@destroy');
Route::put('/stockDestroy/{StockId}', 'Stocks\Stocks_Controller@destroy');
Route::get('/getStock/{id}', 'Stocks\Stocks_Controller@getProductByPharmId');
Route::get('/getProducts/{id}', 'Stocks\Stocks_Controller@getProductList_POS');
Route::get('/getProductDetails/{id}/{stockname}', 'Stocks\Stocks_Controller@getProductByName');
Route::post('/tempSales', 'TemporaryPharmacySales\TemporaryPharmacySales_Controller@store');
Route::get('/getTempSales/{Pharm_id}/{Emp_id}', 'TemporaryPharmacySales\TemporaryPharmacySales_Controller@show');
Route::put('/tempSalesUpdate', 'TemporaryPharmacySales\TemporaryPharmacySales_Controller@update');
Route::delete('/delTempSales/{Pharm_id}/{Emp_id}', 'TemporaryPharmacySales\TemporaryPharmacySales_Controller@deleteAlltemFromCart');
Route::delete('/delTempSale/{Temp_Id}', 'TemporaryPharmacySales\TemporaryPharmacySales_Controller@destroy');
Route::post('/salesInsert', 'PharmacySales\PharmacySales_Controller@SaleInsertion');
Route::post('/salesDetailsInsert', 'PharmacySalesDetails\PharmacySalesDetails_Controller@store');
Route::get('/getSalesList/{PharmId}', 'PharmacySales\PharmacySales_Controller@show');
Route::get('/getOrderList/{PharmId}/{status}','UsersOrderDetails\UsersOrderDetails_Controller@getUserOrderDetailsStatus_Web');
Route::get('/getSalesDetails/{PharmId}/{saleId}', 'PharmacySalesDetails\PharmacySalesDetails_Controller@showBySalesId');
Route::get('/getOrderDetails/{PharmId}/{orderId}/{status}','UsersOrderDetails\UsersOrderDetails_Controller@getOrderDetailsByOrderId_1');
Route::put('/orderAccept','UsersOrderDetails\UsersOrderDetails_Controller@orderAccept');
Route::put('/orderUpdate','UsersOrderDetails\UsersOrderDetails_Controller@updateStatus');
Route::get('/getExpired/{id}', 'Stocks\Stocks_Controller@getExpiredProductsCount');
Route::get('/getOutofStock/{id}', 'Stocks\Stocks_Controller@getOutOfStockCount');
Route::get('/OrderThisWeek/{id}', 'Reports\Reports_Controller@GraphOrderByDaysThisWeek');
//Route::patch('/updatetemp','TemporaryPharmacySales\TemporaryPharmacySales_Controller@update');