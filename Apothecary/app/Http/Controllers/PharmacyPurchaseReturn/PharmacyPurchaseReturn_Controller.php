<?php

namespace App\Http\Controllers\PharmacyPurchaseReturn;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacyPurchaseReturn\PharmacyPurchaseReturn_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class PharmacyPurchaseReturn_Controller extends Controller
{
        //-------------------------------------Web API-----------------------------------------------------//



public function store(Request $request)
    {
        $rules = [
            'Pharm_Id'=>'required|numeric|gte:1',
            'Purchase_Id'=>'required|numeric|gte:1',
            'Stock'=>'required|numeric',
            'unit_Qty'=>'required|numeric',
            'TotalPrice'=>'required',
            'Return_Date'=>'required|date',
            'Employee_Id'=>'required|numeric'

             ];

          $validator = Validator::make($request->all(),$rules);

          if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{


            $Purchase_return = new PharmacyPurchaseReturn_Model();
            $Purchase_return->Pharm_Id = $request->Pharm_Id;
            $Purchase_return->Purchase_Id = $request->Purchase_Id;
            $Purchase_return->Stock = $request->Stock;
            $Purchase_return->unit_Qty = $request->unit_Qty;
            $Purchase_return->TotalPrice = $request->TotalPrice;
            $Purchase_return->Return_Date = $request->Return_Date;
            $Purchase_return->Employee_Id = $request->Employee_Id;


               if($Purchase_return->save())
               {
                $stocks = Stocks_Model::find($request->Stock);
                $stocks->unit_Qty = $stocks->unit_Qty - $request->unit_Qty;
                $stocks->update();
                   return response()->json($Purchase_return,201);
                }
            }
      
    }


    public function show($pharmid)
    {
        $Purchase_return= DB::table('purchase_return')
        ->join('purchase','purchase_return.Purchase_Id','=','purchase.Id')
        ->join('stock','purchase_return.Stock','=','stock.Id')
       ->select('Id','purchase_return.Purchase_Id','stock.Name as Product'
       ,'stock.Item_Description as Description'
       ,'purchase_return.unit_Qty as Return_Quantity','purchase_return.TotalPrice',
       DB::raw("DATE_FORMAT(purchase_return.Return_Date, '%d/%m/%Y') as Date"),
       DB::raw("DATE_FORMAT(purchase_return.Return_Date, '%T') as Time"))

        ->where('purchase_return.Pharm_Id','=',$pharmid)
        ->where('purchase_return.deleted', '=','0')
        ->where('purchase.deleted', '=','0')
        ->orderBy('purchase_return.Date','desc') 
         ->get();

        return response()->json($Purchase_return,200);
        
    }

    
    public function edit(PharmacyPurchaseReturn_Model $PharmacyPurchaseReturn_Model,$id)
    {
        $Purchase_return= PharmacyPurchaseReturn_Model::find($id);
         return response()->json($Purchase_return,200);
     
    }

    public function update(Request $request,$id)
    {
        

             $rules = [

            'Pharm_Id'=>'required|numeric',
            'Purchase_Id'=>'required|numeric',
            'Stock'=>'required|numeric',
            'unit_Qty'=>'required|numeric',
            'TotalPrice'=>'required',
            'Return_Date'=>'required|date',
            'Employee_Id'=>'required|numeric'

             ];

          $validator = Validator::make($request->all(),$rules);

          if($validator->fails())
       
           {
            return response()->json($validator->errors(),202);
        }
            
        else{


        $Purchase_return = PharmacyPurchaseReturn_Model::find($id);

        if($Purchase_return->unit_Qty < $request->unit_Qty){

            $qty = $request->unit_Qty - $Purchase_return->unit_Qty;

            $Purchase_return->Purchase_Id = $request->Purchase_Id;
            $Purchase_return->Stock = $request->Stock;
            $Purchase_return->unit_Qty = $Purchase_return->unit_Qty + $qty ;
            $Purchase_return->TotalPrice = $request->TotalPrice;
            $Purchase_return->Return_Date = $request->Return_Date;
            $Purchase_return->Employee_Id = $request->Employee_Id;

            if($Purchase_return->update()){

                $stocks = Stocks_Model::find($request->Stock);
                $stocks->unit_Qty = $stocks->unit_Qty + $qty;
                $stocks->update();
                return response()->json($Purchase_return,201);
            }
         
        }
        if($Purchase_return->unit_Qty > $request->unit_Qty){

            $qty = $Purchase_return->unit_Qty - $request->unit_Qty ;

            $Purchase_return->Purchase_Id = $request->Purchase_Id;
            $Purchase_return->Stock = $request->Stock;
            $Purchase_return->unit_Qty = $Purchase_return->unit_Qty - $qty ;
            $Purchase_return->TotalPrice = $request->TotalPrice;
            $Purchase_return->Return_Date = $request->Return_Date;
            $Purchase_return->Employee_Id = $request->Employee_Id;
         
            }
       
            if($Purchase_return->update()){

                $stocks = Stocks_Model::find($request->Stock);
                $stocks->unit_Qty = $stocks->unit_Qty - $qty;
                $stocks->update();
                return response()->json($Purchase_return,201);
            }
         
        }
    }

    public function destroy($id)
    {
        $Purchase_return = PharmacyPurchaseReturn_Model::find($id);
        $Purchase_return->deleted='1';   
        $Purchase_return->update();
         return response()->json($Purchase_return,201);
    }




    //-------------------------------------Web API-----------------------------------------------------//
}
