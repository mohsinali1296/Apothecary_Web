<?php

namespace App\Http\Controllers\PharmacySalesReturn;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacySalesReturn\PharmacySalesReturn_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class PharmacySalesReturn_Controller extends Controller
{
        //-------------------------------------Web API-----------------------------------------------------//


	 public function store(Request $request)
    {
        $rules = [
            'Pharm_Id'=>'required|numeric|gte:1',
            'Sale_Id'=>'required|numeric|gte:1',
            'Stock'=>'required|numeric|gte:1',
            'unit_Qty'=>'required|numeric|gte:1',
            'stock_type'=>'required|numeric|between:0,2',
            'TotalPrice'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            'Return_Date'=>'required|date',
            'Employee_Id'=>'required|numeric|gte:1'

             ];

          $validator = Validator::make($request->all(),$rules);

          if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{


            $Sale_return = new PharmacySalesReturn_Model();
            $Sale_return->Pharm_Id = $request->Pharm_Id;
            $Sale_return->Sale_Id = $request->Sale_Id;
            $Sale_return->Stock = $request->Stock;
            $Sale_return->unit_Qty = $request->unit_Qty;
            $Sale_return->stock_type = $request->stock_type;
            $Sale_return->TotalPrice = $request->TotalPrice;
            $Sale_return->Return_Date = $request->Return_Date;
            $Sale_return->Employee_Id = $request->Employee_Id;


           if($Sale_return->save()){
            $stocks = Stocks_Model::find($request->Stock);
            if($request->stock_type==0){
              $stocks->unit_Qty = $stocks->unit_Qty + $request->unit_Qty;
            }
            if($request->stock_type==1){

              $stocks->unit_Qty = $stocks->unit_Qty + ($stocks->qty_per_leaf*$request->unit_Qty);
            }
            if($request->stock_type==2){
              $stocks->unit_Qty = $stocks->unit_Qty + ($stocks->qty_per_box*$request->unit_Qty);
            }
            
            $stocks->update();
            return response()->json($Sale_return,201);
         }


            }
    }

    public function show($pharmid)
    {
          $Sale_return= DB::table('sale_return')
          ->join('pharmacysales','sale_return.Sale_Id','=','pharmacysales.Id')
          ->join('stock','sale_return.Stock','=','stock.Id')
         ->select('Id','sale_return.Sale_Id','stock.Name as Product'
         ,'stock.Item_Description as Description'
         ,'sale_return.unit_Qty as Return_Quantity','sale_return.TotalPrice',
         DB::raw("DATE_FORMAT(sale_return.Return_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(sale_return.Return_Date, '%T') as Time"))
  
         ->where('sale_return.Pharm_Id','=',$pharmid)
         ->where('sale_return.deleted', '=','0')
         ->where('pharmacysales.deleted', '=','0')
         ->orderBy('sale_return.Date','desc')
         ->get();

        return response()->json($Sale_return,200);
       
    }

    public function edit(PharmacySalesReturn_Model $PharmacySalesReturn_Model,$id)
    {
        $Sale_return= PharmacySalesReturn_Model::find($id);
        return response()->json($Sale_return,200);
        
    }

    public function update(Request $request,$id)
    {

         $rules = [
           
            'unit_Qty'=>'required|numeric',
            'stock_type'=>'required|numeric|between:0,2',
            'TotalPrice'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                ];

          $validator = Validator::make($request->all(),$rules);

          if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{

        $Sale_return = PharmacySalesReturn_Model::find($id);

        if($Sale_return->unit_Qty < $request->unit_Qty){

          $qty = $request->unit_Qty - $Sale_return->unit_Qty;

          $Sale_return->Sale_Id = $request->Sale_Id;
          $Sale_return->Stock = $request->Stock;
          $Sale_return->unit_Qty = $request->unit_Qty;
          $Sale_return->stock_type = $request->stock_type;
          $Sale_return->TotalPrice = $request->TotalPrice;
          $Sale_return->Return_Date = $request->Return_Date;
          $Sale_return->Employee_Id = $request->Employee_Id;

          if($Sale_return->update()){

              $stocks = Stocks_Model::find($request->Stock);

              if($request->stock_type==0){
                $stocks->unit_Qty = $stocks->unit_Qty + $qty;
              }
              if($request->stock_type==1){
                $qty_per_leaf = $stocks->qty_per_leaf * $request->qty;
                $stocks->unit_Qty = $stocks->unit_Qty + $qty;
                    }
              if($request->stock_type==2){
                $qty = $stocks->qty_per_box * $request->qty;
                $stocks->unit_Qty = $stocks->unit_Qty + $qty;
                  }
              $stocks->update();
              return response()->json($Sale_return,201);
          }
       
      }
      if($Sale_return->unit_Qty > $request->unit_Qty){

          $qty = $Sale_return->unit_Qty - $request->unit_Qty ;

          $Sale_return->Sale_Id = $request->Sale_Id;
        $Sale_return->Stock = $request->Stock;
        $Sale_return->unit_Qty = $request->unit_Qty;
        $Sale_return->stock_type = $request->stock_type;
        $Sale_return->TotalPrice = $request->TotalPrice;
        $Sale_return->Return_Date = $request->Return_Date;
        $Sale_return->Employee_Id = $request->Employee_Id;
       
          }
     
          if($Sale_return->update()){

            $stocks = Stocks_Model::find($request->Stock);

            if($request->stock_type==0){
              $stocks->unit_Qty = $stocks->unit_Qty - $qty;
            }
            if($request->stock_type==1){
              $qty_per_leaf = $stocks->qty_per_leaf * $request->qty;
              $stocks->unit_Qty = $stocks->unit_Qty - $qty;
                  }
            if($request->stock_type==2){
              $qty = $stocks->qty_per_box * $request->qty;
              $stocks->unit_Qty = $stocks->unit_Qty - $qty;
                }
            $stocks->update();
            return response()->json($Sale_return,201);
              
          }
       
      }
 
       
  }

    public function destroy($id)
    {
        $Sale_return = PharmacySalesReturn_Model::find($id);
        $Sale_return->deleted='1';   
        $Sale_return->update();
          return response()->json($Sale_return,201);
    }

	    //-------------------------------------Web API-----------------------------------------------------//


}
