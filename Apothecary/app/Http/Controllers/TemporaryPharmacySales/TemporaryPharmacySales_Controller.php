<?php

namespace App\Http\Controllers\TemporaryPharmacySales;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TemporaryPharmacySales\TemporaryPharmacySales_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;


class TemporaryPharmacySales_Controller extends Controller
{
   //-------------------------------------Web API-----------------------------------------------------//



   public function store(Request $request)
    {
        $rules = [


            'Stock_Id'=>'required|numeric|gte:1',
            'Emp_Id'=>'required|numeric|gte:1',
            'Pharm_Id'=>'required|numeric|gte:1',
            'stock_type'=>'required|numeric|between:0,2',
            'unit_qty'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            //'total_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999'

                
          ];

          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{

            $t_Psales = new TemporaryPharmacySales_Model();

            $temp_Sales = DB::table('temporary_pharmacysales')->select('Id')
            ->where('Stock_Id','=',$request->Stock_Id)
           ->where('stock_type','=',$request->stock_type)
           ->where('Emp_Id','=',$request->Emp_Id)
           ->where('Pharm_Id','=',$request->Pharm_Id)
            ->first();

           if($temp_Sales){

            $t_Psales= TemporaryPharmacySales_Model::find($temp_Sales->Id);
            $stock = Stocks_Model::find($request->Stock_Id);

            if($request->stock_type==0){
                $t_Psales->unit_qty = $t_Psales->unit_qty +$request->unit_qty; 
                //$price = $stock->unit_price*$qty;
                 $stock->unit_Qty = $stock->unit_Qty - $request->unit_qty;
                 $t_Psales->total_price = $stock->unit_price * $t_Psales->unit_qty;

             }
             else if($request->stock_type==1){
                $t_Psales->unit_qty = $t_Psales->unit_qty + $request->unit_qty; 
                 //$price = $stock->leaf_price*$qty;
                 $stock->unit_Qty = $stock->unit_Qty - ($request->unit_qty*$stock->qty_per_leaf);
                 $t_Psales->total_price = $stock->leaf_price * $t_Psales->unit_qty;
             }
             else if($request->stock_type==2){
                $t_Psales->unit_qty = $t_Psales->unit_qty +$request->unit_qty; 
                 //$price = $stock->box_price*$qty;
                 $stock->unit_Qty = $stock->unit_Qty - ($request->unit_qty*$stock->qty_per_box);
                 $t_Psales->total_price = $stock->box_price * $t_Psales->unit_qty;
             } 

             $t_Psales->Stock_Id = $request->Stock_Id;
         $t_Psales->Emp_Id = $request->Emp_Id;
         $t_Psales->Pharm_Id = $request->Pharm_Id;   
         $t_Psales->stock_type = $request->stock_type;
         //$t_Psales->total_price = $request->total_price; 

         if($t_Psales->update()){

             if($stock->update()){
                 return response()->json($t_Psales,201);
             }

          }
            
            
           }
           
           else if(!$temp_Sales){

            $stock = Stocks_Model::find($request->Stock_Id);
        
        $t_Psales->Stock_Id = $request->Stock_Id;
        $t_Psales->Emp_Id = $request->Emp_Id;
        $t_Psales->Pharm_Id = $request->Pharm_Id;
        $t_Psales->unit_qty = $request->unit_qty;
        $t_Psales->stock_type = $request->stock_type; 

        if($request->stock_type==0){
            $t_Psales->total_price = $stock->unit_price * $request->unit_qty;

        }
        else if($request->stock_type==1){
            $t_Psales->total_price = $stock->leaf_price * $request->unit_qty;
        }
        else if($request->stock_type==2){
            $t_Psales->total_price = $stock->box_price * $request->unit_qty;
        } 

         if($t_Psales->save()){

            

            if($request->stock_type==0){
                $stock->unit_Qty = $stock->unit_Qty - $request->unit_qty;

            }
            else if($request->stock_type==1){
                $stock->unit_Qty = $stock->unit_Qty - ($request->unit_qty*$stock->qty_per_leaf);
            }
            else if($request->stock_type==2){
                $stock->unit_Qty = $stock->unit_Qty - ($request->unit_qty*$stock->qty_per_box);
            } 

            if($stock->update()){
                return response()->json($t_Psales,201);
            }

         }

           }
        
         
            }   
         }

    public function show($Pharm_id,$Emp_id)
    {

        $t_Psales= DB::table('temporary_pharmacysales')
        ->join('stock','temporary_pharmacysales.Stock_Id','=','stock.Id')

         ->select('temporary_pharmacysales.Id as Temp_Id','stock.Id as Stock_Id','stock.Name as Product','stock.Item_Description as Description'
         ,'temporary_pharmacysales.unit_qty as Quantity',
         'stock.unit_price','stock.leaf_price','stock.box_price','temporary_pharmacysales.stock_type'
         ,DB::raw("CASE WHEN temporary_pharmacysales.stock_type=0 THEN 'Unit'
         WHEN temporary_pharmacysales.stock_type=1 THEN 'Leaf' 
         WHEN temporary_pharmacysales.stock_type=2 THEN 'Pack' END as Product_Type")
         ,'temporary_pharmacysales.total_price as Total_Price')
          ->where('temporary_pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('temporary_pharmacysales.Emp_Id','=',$Emp_id)

         ->get();

       
         return response()->json($t_Psales,200);
    }

    public function edit(TemporaryPharmacySales_Model $temporary_pharmacysales,$id)
    {
        $t_Psales= TemporaryPharmacySales_Model::find($id);
        return response()->json($t_Psales,200);

    }

    public function update(Request $request)
    {

         $rules = [


            'Stock_Id'=>'required|numeric|gte:1',
            'Emp_Id'=>'required|numeric|gte:1',
            'Pharm_Id'=>'required|numeric|gte:1',
            'stock_type'=>'required|numeric|between:0,2',
            'unit_qty'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            //'total_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999'
    
          ];

          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{
            
            $t_Psales= TemporaryPharmacySales_Model::find($request->tempId);

            $stock = Stocks_Model::find($request->Stock_Id);
            

            if($request->unit_qty>$t_Psales->unit_qty){
                $qty = $request->unit_qty - $t_Psales->unit_qty;
                $t_Psales->unit_qty = $t_Psales->unit_qty + $qty;

                if($request->stock_type==0){
                    $price = $stock->unit_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty - $qty;
                    $t_Psales->total_price = $t_Psales->total_price + $price;

                }
                else if($request->stock_type==1){
                    $price = $stock->leaf_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty - ($qty*$stock->qty_per_leaf);
                    $t_Psales->total_price = $t_Psales->total_price + $price;
                }
                else if($request->stock_type==2){
                    $price = $stock->box_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty - ($qty*$stock->qty_per_box);
                    $t_Psales->total_price = $t_Psales->total_price + $price;
                } 

                $t_Psales->Stock_Id = $request->Stock_Id;
            $t_Psales->Emp_Id = $request->Emp_Id;
            $t_Psales->Pharm_Id = $request->Pharm_Id;   
            $t_Psales->stock_type = $request->stock_type; 

            if($t_Psales->update()){

                if($stock->update()){
                    return response()->json($t_Psales,201);
                }

             }


            }else if($request->unit_qty<$t_Psales->unit_qty){
                $qty = $t_Psales->unit_qty-$request->unit_qty;
                $t_Psales->unit_qty = $t_Psales->unit_qty - $qty;

                if($request->stock_type==0){
                    $price = $stock->unit_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty + $qty;
                    $t_Psales->total_price = $t_Psales->total_price - $price;

                }
                else if($request->stock_type==1){
                    $price = $stock->leaf_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty + ($qty*$stock->qty_per_leaf);
                    $t_Psales->total_price = $t_Psales->total_price - $price;
                }
                else if($request->stock_type==2){
                    $price = $stock->box_price*$qty;
                    $stock->unit_Qty = $stock->unit_Qty + ($qty*$stock->qty_per_leaf);
                    $t_Psales->total_price = $t_Psales->total_price - $price;
                } 

                $t_Psales->Stock_Id = $request->Stock_Id;
            $t_Psales->Emp_Id = $request->Emp_Id;
            $t_Psales->Pharm_Id = $request->Pharm_Id;   
            $t_Psales->stock_type = $request->stock_type; 

            if($t_Psales->update()){

                if($stock->update()){
                    return response()->json($t_Psales,201);
                }

             }

            }
            
           
    }
}

public function destroy($id)
{
    $t_Psales = TemporaryPharmacySales_Model::find($id);
    $t_Psales->delete();
     return response()->json($t_Psales,201);
}

public function deleteAlltemFromCart($pharm_Id,$Emp_Id)
{
    $t_Psales = TemporaryPharmacySales_Model::where('Emp_Id', $Emp_Id)
    ->where('Pharm_Id', $pharm_Id)
    ->delete();
    //$t_Psales->delete();
     return response()->json($t_Psales,204);
}

	//-------------------------------------Web API-----------------------------------------------------//
}
