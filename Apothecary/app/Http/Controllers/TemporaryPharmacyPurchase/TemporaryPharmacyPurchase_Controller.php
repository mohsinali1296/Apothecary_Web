<?php

namespace App\Http\Controllers\TemporaryPharmacyPurchase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TemporaryPharmacyPurchase\TemporaryPharmacyPurchase_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class TemporaryPharmacyPurchase_Controller extends Controller
{
        //-------------------------------------Web API-----------------------------------------------------//



        public function store(Request $request)
        {
            $rules = [
    
    
                'Stock_Id'=>'required|numeric|gte:1',
                'Emp_Id'=>'required|numeric|gte:1',
                'Pharm_Id'=>'required|numeric|gte:1',
                'unit_qty'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                'buy_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                //'total_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999'
    
                    
              ];
    
              $validator = Validator::make($request->all(),$rules);
    
            
            if($validator->fails())
            {
                return response()->json($validator->errors(),202);
            }
                
            else{
    
                $t_PPurchase = new TemporaryPharmacyPurchase_Model();
    
                $temp_Purchase = DB::table('temporary_pharmacypurchase')->select('Id')
                ->where('Stock_Id','=',$request->Stock_Id)
               ->where('Emp_Id','=',$request->Emp_Id)
               ->where('Pharm_Id','=',$request->Pharm_Id)
                ->first();
    
             if($temp_Purchase){
                $temppurchase= TemporaryPharmacyPurchase_Model::find($temp_Purchase->Id);
                $stock = Stocks_Model::find($request->Stock_Id);
    
                $temppurchase->unit_qty = $temppurchase->unit_qty + $request->unit_qty;
                $temppurchase->total_price = $temppurchase->buy_price * $temppurchase->unit_qty;
                $temppurchase->buy_price = $request->buy_price;
    
                // if($temppurchase->unit_qty<$request->unit_qty){
                //     $qty = $request->unit_qty - $temppurchase->unit_qty;
                //     $temppurchase->unit_qty = $temppurchase->unit_qty + 1;
                //     $temppurchase->total_price = $request->buy_price * $temppurchase->unit_qty;
                // }
                // else if($temppurchase->unit_qty>$request->unit_qty){
                //     $qty = $temppurchase->unit_qty-$request->unit_qty;
                //     $temppurchase->unit_qty = $temppurchase->unit_qty - 1;
                //     $temppurchase->total_price = $request->buy_price * $temppurchase->unit_qty;
                // }
                if($temppurchase->update()){
                    return response()->json($temppurchase,201);
                }
    
    
             }  else{
    
            $t_PPurchase->Stock_Id = $request->Stock_Id;
            $t_PPurchase->Emp_Id = $request->Emp_Id;
            $t_PPurchase->Pharm_Id = $request->Pharm_Id;
            $t_PPurchase->unit_qty = $request->unit_qty;
            $t_PPurchase->buy_price = $request->buy_price;
            //$t_PPurchase->total_price = $request->total_price; 
            $t_PPurchase->total_price = $request->buy_price * $request->unit_qty;
    
    
            if($t_PPurchase->save()){
                return response()->json($t_PPurchase,201);
             }
    
             } 
    
            
             
            }   
        }
    

    public function show($Pharm_id,$Emp_id)
    {
        $t_PPurchase= DB::table('temporary_pharmacypurchase')
        ->join('stock','temporary_pharmacypurchase.Stock_Id','=','stock.Id')

        ->select('temporary_pharmacypurchase.Id as Temp_Id','stock.Id as Stock_Id','stock.Name as Product','stock.Item_Description as Description'
        ,'temporary_pharmacypurchase.unit_qty as Quantity'
        ,'temporary_pharmacypurchase.buy_price as Buy_Price'
        ,'temporary_pharmacypurchase.total_price as Total_Price')
         ->where('temporary_pharmacypurchase.Pharm_Id','=',$Pharm_id)
         ->where('temporary_pharmacypurchase.Emp_Id','=',$Emp_id)
         ->get();

       
        return response()->json($t_PPurchase,200);
    }

    public function edit(TemporaryPharmacyPurchase_Model $temporary_pharmacypurchase,$id)
    {
        $t_PPurchase= TemporaryPharmacyPurchase_Model::find($id);
        return response()->json($t_PPurchase,200);
    }

    public function update(Request $request)
    {
        $rules = [

            'Temp_Id'=>'required|numeric|gte:1',
            'Stock_Id'=>'required|numeric|gte:1',
            'Emp_Id'=>'required|numeric|gte:1',
            'Pharm_Id'=>'required|numeric|gte:1',
            'unit_qty'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            'buy_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            //'total_price'=>'required|numeric|between:0,9999999999999999.99999999999999999999'
            //$t_PPurchase->total_price = $request->total_price; 

                
          ];

          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{
 
        $t_PPurchase= TemporaryPharmacyPurchase_Model::find($request->Temp_Id);
        $t_PPurchase->Stock_Id = $request->Stock_Id;
        $t_PPurchase->unit_qty = $request->unit_qty;
        $t_PPurchase->buy_price = $request->buy_price;
        $t_PPurchase->total_price = $request->buy_price * $request->unit_qty;


        $t_PPurchase->update();
        return response()->json($t_PPurchase,201);   

     }
   }

    public function destroy($id)
    {
        $t_PPurchase = TemporaryPharmacyPurchase_Model::find($id);
        $t_PPurchase->delete();
        return response()->json($t_PPurchase,201);
    }


    public function deleteAlltem($pharm_Id,$Emp_Id)
{
    $t_PPurchase = TemporaryPharmacyPurchase_Model::where('Emp_Id', $Emp_Id)
    ->where('Pharm_Id', $pharm_Id)
    ->delete();
    //$t_Psales->delete();
     return response()->json($t_PPurchase,204);
}

        //-------------------------------------Web API-----------------------------------------------------//



}