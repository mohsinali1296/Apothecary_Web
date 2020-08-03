<?php

namespace App\Http\Controllers\PharmacyPurchaseDetails;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacyPurchaseDetails\PharmacyPurchaseDetails_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class PharmacyPurchaseDetails_Controller extends Controller
{
    //-------------------------------------Web API-----------------------------------------------------//

    public function store(Request $request)
    {
        $rules = [


            'Stock_Id'=>'required|numeric|gte:1',
            'Purchase_Id'=>'required|numeric|gte:1',
            'unit_Qty'=>'required|numeric',
            'unit_BuyPrice'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
           // 'Pharm_Id'=>'required|numeric'
            
            
        ];
          $validator = Validator::make($request->all(),$rules);
    

     if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{


        $Purchase_details = new PharmacyPurchaseDetails_Model();
        $Purchase_details->Stock_Id = $request->Stock_Id;
        $Purchase_details->Purchase_Id = $request->Purchase_Id;
        $Purchase_details->unit_Qty = $request->unit_Qty;
        $Purchase_details->unit_BuyPrice = $request->unit_BuyPrice;
        $Purchase_details->Pharm_Id = $request->Pharm_Id;
        

        if($Purchase_details->save()){

            $stock  = Stocks_Model::find($request->Stock_Id);
            $stock->unit_Qty = $stock->unit_Qty +  $request->unit_Qty;
            $stock->unit_price = $request->unit_BuyPrice;
            if($stock->qty_per_leaf>0){
                $stock->leaf_price = $stock->qty_per_leaf * $request->unit_BuyPrice;
            }
            if($stock->qty_per_box>0){
                $stock->box_price = $stock->qty_per_box * $request->unit_BuyPrice;
            }
            $stock->update();

            return response()->json($Purchase_details,201);
         }
        
       }

    }

    public function show($pharm_id)
    {
         $Purchase_details= DB::table('purchase_details')
         ->join('purchase','purchase_details.Purchase_Id','=','purchase.Id')

         ->select('purchase_details.Purchase_Id','purchase.Total_Amount'
          ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
          DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
         ->where('purchase_details.Pharm_Id','=',$pharm_id);
        // ->where('deleted', '=','0');


        $stocks = DB::table('stock')
       // ->join('formulae','stock.Formula','=','formulae.Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('brands as brand','stock.Brand','=','brand.Id')
        //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')
        ->join('purchase_details','stock.Id','=','purchase_details.Stock_Id')

        ->select('purchase_details.Id','purchase_details.Purchase_Id'
          ,'stock.Id as Product_Id','stock.Name as Product_Name',
          'purchase_details.unit_Qty as Purchase_Quantity'
          ,'purchase_details.unit_BuyPrice as Purchase_Price'
            ,'category.DataName as Category_Name'
             , 'subcategory.DataName as SubCategory_Name'
            ,'brand.Brand_Name as Brand_Name'
            )
        ->where('purchase_details.Pharm_Id','=',$pharm_id);
       // ->where('stock.deleted','=','0')
       
       $result = DB::query()
        ->select( 'stocks.*','Purchase_details.Total_Amount','Purchase_details.Date','Purchase_details.Time')
        ->fromSub($stocks,'stocks')
        ->joinSub($Purchase_details,'Purchase_details','stocks.Purchase_Id','=','Purchase_details.Purchase_Id')
        ->orderBy('Purchase_details.Date','desc')
        ->get();
       
        return response()->json($result,200);

    }
/*
    public function edit(PharmacyPurchaseDetails_Model $purchase_details,$id)
    {
        $Purchase_details= PharmacyPurchaseDetails_Model::find($id);
        return response()->json($Purchase_details,200);
        
    }

    public function update(Request $request,$id)
    {

        $rules = [


            'Stock_Id'=>'required|numeric|gte:1',
            'Purchase_Id'=>'required|numeric|gte:1',
            'unit_Qty'=>'required|numeric',
            'unit_BuyPrice'=>'required|numeric|between:0,9999999999999999.99999999999999999999'
   
        ];
          $validator = Validator::make($request->all(),$rules);
    

     if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{ 

        $Purchase_details = PharmacyPurchaseDetails_Model::find($id);
        $Purchase_details->Stock_Id = $request->Stock_Id;
        $Purchase_details->Sale_Id = $request->Purchase_Id;
        $Purchase_details->unit_Qty = $request->unit_Qty;
        $Purchase_details->unit_BuyPrice = $request->unit_BuyPrice;
              
        
        $Purchase_details->update();
         return response()->json($Purchase_details,201);
        }
    
    }
*/
    public function destroy($id)
    {
        $Purchase_details = PharmacyPurchaseDetails_Model::find($id);
        $Purchase_details->deleted='1';   
        $Purchase_details->update();
         return response()->json($Purchase_details,201);
    }

    //-------------------------------------Web API-----------------------------------------------------//
}
