<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart\Cart_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Cart_Controller extends Controller
{
  public function AddToCart(Request $request){

    $rules = [
        'user_Id' => 'required|numeric|gte:1',
        'Stock_Id' => 'required|numeric|gte:1',
        'qty'=>'required|numeric|gte:1',
        'type'=>'required|numeric',
        'totalPrice'=>'required|numeric|between:1,999999999.99999999999999999999'
    ];

    $validator = Validator::make($request->all(),$rules);
    
    if($validator->fails()){
       
            return response()->json($validator->errors(),202);

        }
        else{
                $cart = new Cart_Model();
                $cart->user_Id=$request->user_Id;
                $cart->Stock_Id=$request->Stock_Id;
                $cart->qty=$request->qty;
                $cart->type=$request->type;
                $cart->totalPrice=$request->totalPrice;
                

              if($cart->save()) {
                return response()->json($cart, 201);
              }
        
        }
}


public function UpdateAdd(Request $request, $id){

    $cart = Cart_Model::find($id); 
    $stock = Stocks_Model::find($cart->Stock_Id);
    $cart->qty = $cart->qty + 1;

    if($cart->qty>10){
      $cart->qty=10;
    }

    $cart->totalPrice = $cart->totalPrice + $stock->unit_price;

    if($cart->update()) {
        return response()->json($cart, 201);
      }


}

public function UpdateSubtract(Request $request, $id){

    $cart = Cart_Model::find($id); 
    $stock = Stocks_Model::find($cart->Stock_Id);
    $cart->qty = $cart->qty - 1;
    $cart->totalPrice = $cart->totalPrice - $stock->unit_price;

    if($cart->update()) {
        return response()->json($cart, 201);
      }


}

public function UpdateCart(Request $request, $id){

    $cart = Cart_Model::find($id); 

    $rules = [
       // 'userId' => 'required|numeric|gte:1',
       // 'stockId' => 'required|numeric|gte:1',
        'qty'=>'required|numeric|gte:1',
        'totalPrice'=>'required|numeric|between:1,999999999.99999999999999999999'
    ];

    $validator = Validator::make($request->all(),$rules);
    
    if($validator->fails()){
       
            return response()->json($validator->errors(),202);

        }
        else{
               // $cart2 = new Cart_Model();
               // $cart->userId=$request->userId;
                //$cart->stockId=$request->stockId;
                $cart->qty=$cart->qty+$request->qty;

                if($cart->qty>10){
                  $cart->qty = 10;
                }

                $cart->totalPrice=$cart->totalPrice + $request->totalPrice;

              if($cart->update()) {
                return response()->json($cart, 201);
              }
        
        }
}

public function DeleteCart(Request $request, $id){

    $cart = Cart_Model::find($id); 
    $cart->delete();
            return response()->json($cart,204);
    
}

public function DeleteAllCart(Request $request, $userId){

  $cart = DB::table('cart')->where('cart.user_Id','=',$userId); 
  $cart->delete();
          return response()->json($cart,204);
  
}

public function CartList($userId){

    $cart = DB::table('stock')
    ->join('cart','stock.Id','=','cart.Stock_Id')//,'=','stock.Id')
   // ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
  //  ->join('brands as brand','stock.Brand','=','brand.Id')
    ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'pharmacy.Pharm_Name as Pharmacy_Name','stock.Pharm_Id'
    ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
    ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
    ,'cart.Id as CartId','cart.user_Id'
    ,'cart.qty as Quantity','cart.totalPrice'
    ,'cart.type as Cart_Type','stock.prescription_required'
    ,DB::raw("CASE WHEN stock.prescription_required=0 THEN 'No Precription Required' 
    WHEN stock.prescription_required=1 THEN 'Precription Required'
    END as PrecriptionRequired_Text")
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    ->where('cart.user_Id','=',$userId)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
   // ->where('formulae.deleted','=','0')
   
    ->paginate(15);

    return response()->json($cart,200);
}

public function CheckCartList($userId,$stockId){

    $cart = DB::table('stock')
    ->join('cart','stock.Id','=','cart.Stock_Id')//,'=','stock.Id')
   // ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
  //  ->join('brands as brand','stock.Brand','=','brand.Id')
    ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'pharmacy.Pharm_Name as Pharmacy_Name'
    ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
    ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
    ,'cart.Id as CartId','cart.user_Id'
    ,'cart.qty as Quantity','cart.totalPrice'
    ,'cart.type as Cart_Type'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    ->where('cart.user_Id','=',$userId)
    ->where('cart.Stock_Id','=',$stockId)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
   // ->where('formulae.deleted','=','0')
    ->inRandomOrder()
    ->paginate(15);

    return response()->json($cart,200);
}


}
