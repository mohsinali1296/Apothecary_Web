<?php

namespace App\Http\Controllers\UsersOrderDetails;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UsersOrderDetails\UsersOrderDetails_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class UsersOrderDetails_Controller extends Controller
{

  /////////////////////////////////// Start Android API ////////////////////////
    public function addUserOrderDetails(Request $request){


        $rules = [
            'userOrder_Id' => 'required|numeric|gt:0',
            'user_Id' => 'required|numeric|gt:0',
            'Pharm_Id' => 'required|numeric|gt:0',
            'stock_Id' => 'required|numeric|gt:0',
            'qty' => 'required|numeric|gt:0',
            'stock_type' => 'required|numeric',
            //'status' => 'required|numeric|between:1,5',
            'total_Price'=>'required|numeric|between:1,99999999999999999.99999999999999999999',
            'price'=>'required|numeric|between:1,99999999999999999.99999999999999999999',
        ];

        
        $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails()){
                
                return response()->json($validator->errors(),202);
          
            }
            else{
                    $order = new UsersOrderDetails_Model;

                   $order->user_Id=$request->user_Id;
                   $order->userOrder_Id=$request->userOrder_Id;
                    $order->stock_Id = $request->stock_Id; 
                    $order->qty = $request->qty;
                    $order->total_Price = $request->total_Price;  
                    $order->stock_type = $request->stock_type;
                    //$order->status = $request->status;
                    $order->Pharm_Id = $request->Pharm_Id;
                    $order->price = $request->price;

                  if($order->save()) {
                    
                    return response()->json($order,201);
                  } 
                  
            
            }
    }

    public function getUserOrderDetails($orderId,$userId){

        $orderDetails = DB::table('stock')
        //->join('cart','stock.Id','=','cart.Stock_Id')//,'=','stock.Id')
        ->join('userorder_details','stock.Id','=','userorder_details.stock_Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'pharmacy.Pharm_Name as Pharmacy_Name','userorder_details.Pharm_Id'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'userorder_details.Id as OrderDetail_Id'
        ,'userorder_details.user_Id'
        ,'userorder_details.userOrder_Id'
        ,'userorder_details.qty as ItemOrdered_Quantity','userorder_details.total_Price'
        ,DB::raw("CASE WHEN userorder_details.status=0 THEN 'In Process' 
        WHEN userorder_details.status=1 THEN 'Accepted'
        WHEN userorder_details.status=2 THEN 'Dispatched'
        WHEN userorder_details.status=3 THEN 'Delivered'
        END as Order_Status")
        ,'userorder_details.stock_type as Stock_Type'
        ,'userorder_details.price as Item_Price'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        ->where('userorder_details.user_Id','=',$userId)
        ->where('userorder_details.userOrder_Id','=',$orderId)
        ->where('userorder_details.deleted','=','0')
        ->where('stock.deleted','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->inRandomOrder();

        $order= DB::table('user_orders')
      ->Select('user_orders.Id as Order_Id',
      'user_orders.total_amount as Total_Amount',
      'user_orders.item_count as Total_Item',
      'user_orders.prescription_image','user_orders.prescription_image_url',
      DB::raw("DATE_FORMAT(user_orders.order_date, '%d-%m-%Y') as Date")
      ,DB::raw("DATE_FORMAT(user_orders.order_date, '%T') as Time")
      )
        ->where('user_orders.Id','=',$orderId);

        $result = DB::query()
        ->select( 'orderDetails.*'
        ,'order.Total_Amount','order.Total_Item'
        ,'order.prescription_image','order.prescription_image_url'
        ,'order.Date','order.Time'
        )
        ->fromSub($orderDetails,'orderDetails')
        ->joinSub($order,'order','orderDetails.userOrder_Id','=','order.Order_Id')
        ->get();

        return response()->json($result,200);
    }

    public function getUserOrderDetailsStatus($orderId,$userId,$status){

        $order= DB::table('user_orders')
      ->Select('user_orders.Id as Order_Id',
      'user_orders.total_amount as Total_Amount',
      'user_orders.item_count as Total_Item',
      'user_orders.prescription_image','user_orders.prescription_image_url',
      DB::raw("DATE_FORMAT(user_orders.order_date, '%d/%m/%Y') as Date")
      ,DB::raw("DATE_FORMAT(user_orders.order_date, '%T') as Time")
      )
        ->where('user_orders.Id','=',$orderId);

        $orderDetails = DB::table('stock')
        //->join('cart','stock.Id','=','cart.Stock_Id')//,'=','stock.Id')
        ->join('userorder_details','stock.Id','=','userorder_details.stock_Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'pharmacy.Pharm_Name as Pharmacy_Name','userorder_details.Pharm_Id'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'userorder_details.Id as OrderDetail_Id'
        ,'userorder_details.user_Id'
        ,'userorder_details.userOrder_Id'
        ,'userorder_details.qty as ItemOrdered_Quantity','userorder_details.total_Price'
        ,DB::raw("CASE WHEN userorder_details.status=0 THEN 'In Process' 
        WHEN userorder_details.status=1 THEN 'Accepted'
        WHEN userorder_details.status=2 THEN 'Dispatched'
        WHEN userorder_details.status=3 THEN 'Delivered'
        END as Order_Status")
        ,'userorder_details.stock_type as Stock_Type'
        ,'userorder_details.price as Item_Price'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        ->where('userorder_details.user_Id','=',$userId)
        ->where('userorder_details.userOrder_Id','=',$orderId)
        ->where('userorder_details.status','=',$status)
        ->where('userorder_details.deleted','=','0')
        ->where('stock.deleted','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->inRandomOrder();


        $result = DB::query()
        ->select( 'orderDetails.*','order.*'
        //,'order.prescription_image'
        //,'order.prescription_image_url'
        )
        ->fromSub($orderDetails,'orderDetails')
        ->joinSub($order,'order','orderDetails.userOrder_Id','=','order.Order_Id')
        ->get();

        return response()->json($result,200);
    }

/////////////////////////////////// End Android API ////////////////////////////////////



/////////////////////////////////// Start Web API ////////////////////////////////////


public function getUserOrderDetailsStatus_Web($PharmId,$status){

  $order= DB::table('user_orders')
  ->join('appusers','user_orders.user_Id','=','appusers.Id')
  ->join('userorder_details','user_orders.Id','=','userorder_details.userOrder_Id')
->Select('user_orders.Id as Order_Id',
'user_orders.total_amount as Total_Amount',
'user_orders.item_count as Total_Item',
'user_orders.prescription_image','user_orders.prescription_image_url',
'appusers.fullname as Customer_Name','appusers.contact as Contact','appusers.email as Email',
DB::raw("CONCAT(appusers.local_Address,' ',appusers.City,' ',appusers.Country) as Address"),
DB::raw("CASE WHEN userorder_details.status=0 THEN 'In Process' 
  WHEN userorder_details.status=1 THEN 'Accepted'
  WHEN userorder_details.status=2 THEN 'Dispatched'
  WHEN userorder_details.status=3 THEN 'Delivered'
  WHEN userorder_details.status=4 THEN 'Cancelled'
  WHEN userorder_details.status=5 THEN 'Returned'
  END as Order_Status")
,DB::raw("DATE_FORMAT(user_orders.order_date, '%d/%m/%Y') as Date")
,DB::raw("DATE_FORMAT(user_orders.order_date, '%T') as Time")
)
->where('userorder_details.status','=',$status)
->where('userorder_details.Pharm_Id','=',$PharmId)
->distinct()
->get();
  
  return response()->json($order,200);
}


public function getOrderDetailsByOrderId_1($PharmId,$orderId,$status){
  $orderDetails = DB::table('userorder_details')
  ->join('stock','userorder_details.stock_Id','=','stock.Id')
  ->select('userorder_details.Id as OrderDetails_Id',
  'userorder_details.userOrder_Id as UserOrder_Id',
  'stock.Name as Product_Name','stock.Item_Description as Description',
  'userorder_details.qty as Quantity','userorder_details.total_Price as Total_Price'
  ,'userorder_details.stock_type as Stock_Type'
  ,'userorder_details.price as Item_Price'
  ,DB::raw("CASE WHEN userorder_details.status=0 THEN 'In Process' 
  WHEN userorder_details.status=1 THEN 'Accepted'
  WHEN userorder_details.status=2 THEN 'Dispatched'
  WHEN userorder_details.status=3 THEN 'Delivered'
  WHEN userorder_details.status=4 THEN 'Cancelled'
  WHEN userorder_details.status=5 THEN 'Returned'
  END as Order_Status")
  ,DB::raw("CASE WHEN userorder_details.stock_type=0 THEN 'Unit Quantity' 
  WHEN userorder_details.stock_type=1 THEN 'Leaf Quantity'
  WHEN userorder_details.stock_type=2 THEN 'Box Quantity'
  END as Item_StockType")
  )

->where('userorder_details.Pharm_Id','=',$PharmId)
->where('userorder_details.userOrder_Id','=',$orderId)
->where('userorder_details.status','=',$status)
->get();

// //->get();
// $result = DB::query()
//   ->select('order.Customer_Name'
//   ,'order.Contact','order.Email','order.Address'
//   ,'order.Date','order.Time','orderDetails.*'
//   )
//   ->fromSub($orderDetails,'orderDetails')
//   ->joinSub($order,'order','orderDetails.UserOrder_Id','=','order.Order_Id')
//   ->get();

return response()->json($orderDetails,200);
}


public function getOrderDetailsByOrderId_2($PharmId,$orderId){
  
  $order= DB::table('user_orders')
  ->join('appusers','user_orders.user_Id','=','appusers.Id')
  ->join('userorder_details','user_orders.Id','=','userorder_details.userOrder_Id')
->Select('user_orders.Id as Order_Id',
'user_orders.total_amount as Total_Amount',
'user_orders.item_count as Total_Item',
'user_orders.prescription_image','user_orders.prescription_image_url',
'appusers.fullname as Customer_Name','appusers.contact as Contact','appusers.email as Email',
DB::raw("CONCAT(appusers.local_Address,' ',appusers.City,' ',appusers.Country) as Address"),
DB::raw("CASE WHEN userorder_details.status=0 THEN 'In Process' 
  WHEN userorder_details.status=1 THEN 'Accepted'
  WHEN userorder_details.status=2 THEN 'Dispatched'
  WHEN userorder_details.status=3 THEN 'Delivered'
  WHEN userorder_details.status=4 THEN 'Cancelled'
  WHEN userorder_details.status=5 THEN 'Returned'
  END as Order_Status")
,DB::raw("DATE_FORMAT(user_orders.order_date, '%d/%m/%Y') as Date")
,DB::raw("DATE_FORMAT(user_orders.order_date, '%T') as Time")
)
->where('user_orders.Id','=',$orderId)
->where('userorder_details.Pharm_Id','=',$PharmId)
->distinct()
->get();

return response()->json($order,200);
}

public function edit($id)
{
    $userOrder= UsersOrderDetails_Model::find($id);
    return response()->json($userOrder,200);
  

}



public function updateStatus(Request $request)
{

     $rules = [
        
        'status'=>'required|numeric|gte:2,lt:6',
        'OrderDetails_Id'=>'required|numeric|gte:1',
        
      ];

      $validator = Validator::make($request->all(),$rules);
    
    if($validator->fails())
    {
         return response()->json($validator->errors(),202);
         
    }
        
    else{


    $order = UsersOrderDetails_Model::find($request->OrderDetails_Id);
    $order->status=$request->status;   
    $order->update();
    return response()->json($order,201);        

       }


}

public function orderAccept(Request $request){

  $rules = [
        
    'status'=>'required|numeric|gte:1|lte:1',
    'OrderDetails_Id'=>'required|numeric|gte:1',
    
  ];

  $validator = Validator::make($request->all(),$rules);

if($validator->fails())
{
     return response()->json($validator->errors(),202);
     
}
    
else{

//   $order_details= DB::table('userorder_details')
// ->Select('userorder_details.Id')
// ->where('userorder_details.user_Id','=',$request->user_Id)
// ->where('userorder_details.stock_Id','=',$request->Stock_Id)
// ->where('userorder_details.Pharm_Id','=',$request->Pharm_Id)
// ->where('userorder_details.qty','=',$request->qty)
// ->where('userorder_details.stock_type','=',$request->stock_type)
// ->where('userorder_details.status','=','0')
// ->first();


    $order = UsersOrderDetails_Model::find($request->OrderDetails_Id);
    if($request->status==1){
      $order->status=$request->status;  
    }
     
    
if($order->update()){

  if($order->status==1){

    $stocks = Stocks_Model::find($order->stock_Id);
  if($order->stock_type==0){
    $stocks->unit_Qty = $stocks->unit_Qty - $order->qty;
  }
  if($order->stock_type==1){
    $qty = $stocks->qty_per_leaf * $order->qty;
    $stocks->unit_Qty = $stocks->unit_Qty - $qty;
        }
  if($order->stock_type==2){
    $qty = $stocks->qty_per_box * $order->qty;
    $stocks->unit_Qty = $stocks->unit_Qty - $qty;
      }
      $stocks->update();
      return response()->json($order,201);  
      }
   
    }   
     

  }


}


/////////////////////////////////// End Web API ////////////////////////////////////

}
