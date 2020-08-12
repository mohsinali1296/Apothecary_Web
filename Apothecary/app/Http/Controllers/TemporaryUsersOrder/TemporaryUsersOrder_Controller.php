<?php

namespace App\Http\Controllers\TemporaryUsersOrder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TemporaryUsersOrder\TemporaryUsersOrder_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class TemporaryUsersOrder_Controller extends Controller
{

///////////////////////////// Web API ///////////////////////////////////////////////////

    public function AddTempUserOrder(Request $request){
        
        $rules = [
            'Stock_Id' => 'required|numeric|gt:0',
            'qty' => 'required|numeric|gt:0',
            'user_Id'=>'required|numeric|gt:0',
            'Pharm_Id'=>'required|numeric|gt:0',
            'Emp_Id'=>'required|numeric|gt:0',
            'total_price'=>'required|numeric|between:1,99999999999999999.99999999999999999999',
            'stock_type'=>'required|numeric|between:0,2',
            'price'=>'required|numeric|between:1,99999999999999999.99999999999999999999',

        ];


        $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails()){
                
                return response()->json($validator->errors(),202);
          
            }
            else{
                    $temp = new TemporaryUsersOrder_Model;
                    $temp->Stock_Id=$request->Stock_Id;
                    $temp->qty=$request->qty;
                    $temp->user_Id=$request->user_Id;
                    $temp->Pharm_Id=$request->Pharm_Id; 
                    $temp->total_price = $request->total_price;
                    $temp->stock_type = $request->stock_type;
                    $temp->price = $request->price;
                    $temp->Emp_Id = $request->Emp_Id;

                  if($temp->save()) {
                    
                    return response()->json($temp,201);
                  } 
                  
            
            }
    }

    public function display($Pharm_Id,$Emp_Id){

        $temp = DB::table('temporary_userorder')
    ->join('stock','temporary_userorder.Stock_Id','=','stock.Id')
    ->join('appusers','temporary_userorder.user_Id','=','appusers.Id')
    
    ->select('appusers.fullname as Customer','stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description','temporary_userorder.qty as Quantity'
    ,'temporary_userorder.price as Product_Price'
    ,'temporary_userorder.total_price as Total_Price' , 'temporary_userorder.stock_type as Type'
    )
    
    
    
    ->where('temporary_userorder.Pharm_Id','=',$Pharm_Id)
    ->where('temporary_userorder.Emp_Id','=',$Emp_Id)
    ->where('stock.expired','=','0')
    ->get();

    return response()->json($temp,200);

    }

    public function destroy(Request $request,$id){
        $temp = TemporaryUsersOrder_Model::find($id);
        $temp->delete();
        return response()->json(null,204);
    }

///////////////////////////// Web API ///////////////////////////////////////////////////

}
