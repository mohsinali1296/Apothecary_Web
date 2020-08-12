<?php

namespace App\Http\Controllers\Favourites;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favourites\Favourites_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Favourites_Controller extends Controller
{

  public function AddFavourite(Request $request){

    $rules = [
        'userId' => 'required|numeric|gte:1',
        'stockId' => 'required|numeric|gte:1',
        'type'=>'required|numeric|in:0,1', //[0:favourite , 1:wishlist]
        

    ];

    $validator = Validator::make($request->all(),$rules);
    
    if($validator->fails()){
       
            return response()->json($validator->errors(),202);

        }
        else{
                $fav = new Favourites_Model();
                $fav->userId=$request->userId;
                $fav->stockId=$request->stockId;
                $fav->type=$request->type;

              if($fav->save()) {
                return response()->json($fav, 201);
              }
        
        }
}


public function CheckFavourite($stockId, $userId){

    $fav = DB::table('favourites')
                    ->select('favourites.*')                            
                    ->where('favourites.userId','=',$userId)
                    ->where('favourites.stockId','=',$stockId)
                    ->where('favourites.type','=','0')
                    ->get();

                    return response()->json($fav,200);

}

public function CheckWishList($stockId, $userId){

    $fav = DB::table('favourites')
                    ->select('favourites.*')                            
                    ->where('favourites.userId','=',$userId)
                    ->where('favourites.stockId','=',$stockId)
                    ->where('favourites.type','=','1')
                    ->get();

                    return response()->json($fav,200);

}

public function Delete(Request $request,$id){

    $fav = Favourites_Model::find($id); 
   // $fav = DB::table('favourites')
     //           ->where('favourites.Id','=',)
   /* $fav = DB::table('favourites')
                    ->select('favourites.*')                            
                    ->where('favourites.userId','=',$userId)
                    ->where('favourites.stockId','=',$stockId)
                    ->get();*/

    $fav->delete();
        return response()->json($fav,204);

    
   

}


public function DeleteByStockID(Request $request,$stockId,$userId,$type){

  // $fav = Favourites_Model::find($id); 
   // $fav = DB::table('favourites')
     //           ->where('favourites.Id','=',)
    $fav = DB::table('favourites')
                    ->select('favourites.*')                            
                    ->where('favourites.userId','=',$userId)
                    ->where('favourites.stockId','=',$stockId)
                    ->where('favourites.type','=',$type)
                    ->get();

    $fav->delete();
        return response()->json($fav,204);


}

public function getWishListForUser($userId,$type){

    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')
    ->join('favourites','stock.Id','=','favourites.stockId')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
    ,'formulae.Formula as Formula_Name'
    ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
    ,'pharmacy.Contact as Pharmacy_Contact'
    ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
    ,'pharmacy.Latitude','pharmacy.Longitude'
    ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
    ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
    ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges',
    'favourites.Id as Fav_Id')
    
    
    ->where('favourites.userId','=',$userId)
    ->where('favourites.type','=',$type)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    ->paginate(10);
    

    return response()->json($stocks,200);

}

}



