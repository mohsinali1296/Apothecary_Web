<?php

namespace App\Http\Controllers\UsersOrder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UsersOrder\UsersOrder_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class UsersOrder_Controller extends Controller
{
    
    public function addUserOrder(Request $request){


        $rules = [
            'user_Id' => 'required|numeric|gt:0',
            'item_count' => 'required|numeric|gt:0',
            'total_amount'=>'required|numeric|between:1,99999999999999999.99999999999999999999',
            
        ];

        
        $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails()){
                
                return response()->json($validator->errors(),202);
          
            }
            else{
                    $order = new UsersOrder_Model;

                   $order->user_Id=$request->user_Id;
                   $order->item_count=$request->item_count;
                    $order->total_amount = $request->total_amount; 
                    

                    if($request->prescription_image!=NULL){

                      $image = $request->prescription_image;  // your base64 encoded
                    $image = str_replace('data:image/jpeg;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $filename=$order->user_Id.'_'.$order->total_amount.'_'.time().'.'.'jpg';
                    \File::put('uploads/images/' . $filename, base64_decode($image));
                    
                    $order->prescription_image_url ='http://localhost:8000/uploads/images/'.$filename;
                    $order->prescription_image =$filename;

                    }
                    else if($request->prescription_image==NULL){
                      $order->prescription_image='no_image_available.png';
                      $order->prescription_image_url='http://localhost:8000/uploads/images/no-image-available.png';
                    }

                    

                  if($order->save()) {
                    
                    return response()->json($order,201);
                  } 
                  
            
            }
    }

    public function getUserOrder($userId){

      $order= DB::table('user_orders')
      ->Select('user_orders.Id as Order_Id'
      ,'user_orders.user_Id'
      ,'user_orders.total_amount as Total_Amount',
      'user_orders.item_count as Total_Item',
      'user_orders.prescription_image','user_orders.prescription_image_url',
      DB::raw("DATE_FORMAT(user_orders.order_date, '%d-%m-%Y') as Date")
      ,DB::raw("DATE_FORMAT(user_orders.order_date, '%T') as Time")
      )
      ->where('user_orders.user_Id','=',$userId)
      ->where('user_orders.deleted','=','0')
      ->orderBy('user_orders.order_date','desc')
      ->paginate(10);
      ;

      return response()->json($order,200);

    }

}

