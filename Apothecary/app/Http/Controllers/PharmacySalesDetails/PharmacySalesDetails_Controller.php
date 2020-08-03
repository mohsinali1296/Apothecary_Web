<?php

namespace App\Http\Controllers\PharmacySalesDetails;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacySalesDetails\PharmacySalesDetails_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class PharmacySalesDetails_Controller extends Controller
{
        //-------------------------------------Web API-----------------------------------------------------//
   
   public function store(Request $request)
    {
       $rules = [

            'Pharm_Id'=>'required|numeric|gte:1',
            'Stock_Id'=>'required|numeric|gte:1',
            'Sale_Id'=>'required|numeric|gte:1',
            'unit_Qty'=>'required|numeric',
            'stock_type'=>'required|numeric|between:0,2'
            
        ];
          $validator = Validator::make($request->all(),$rules);
    

     if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{


        $Sale_details = new PharmacySalesDetails_Model();
        #$Sale_details->Pharm_Id = $request->session()->get('LoggedPharmacy');
        $Sale_details->Pharm_Id = $request->Pharm_Id;
        $Sale_details->Stock_Id = $request->Stock_Id;
        $Sale_details->Sale_Id = $request->Sale_Id;
        $Sale_details->unit_Qty = $request->unit_Qty;
        $Sale_details->stock_type = $request->stock_type;

         if($Sale_details->save()){

          $stock  = Stocks_Model::find($request->Stock_Id);

          if($request->stock_type==0){
            $stock->unit_Qty = $stock->unit_Qty -  $request->unit_Qty;
          }
          if($request->stock_type==1){
            $stock->unit_Qty = $stock->unit_Qty -  ($request->unit_Qty*$stock->qty_per_leaf);
          }

          if($request->stock_type==2){
            $stock->unit_Qty = $stock->unit_Qty -  ($request->unit_Qty*$stock->qty_per_box);
          }

            $stock->update();

            return response()->json($Sale_details,201);
         }
        

       }


    }

    public function show($pharm_id)
    {
         $Sale_details= DB::table('sale_details')
         ->join('pharmacysales','sale_details.Sale_Id','=','pharmacysales.Id')
         ->join('stock','sale_details.Stock_Id','=','stock.Id')
         ->select('sale_details.Id','sale_details.Sale_Id',
         'stock.Name as Product','stock.Item_Description as Description'
         ,'sale_details.unit_Qty as Sold_Quantity',
          DB::raw("CASE WHEN sale_details.stock_type=0 THEN 'Unit'
          WHEN sale_details.stock_type=1 THEN 'Leaf' 
          WHEN sale_details.stock_type=2 THEN 'Pack' END as Product_Type"),
          DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time")
         )
         ->where('sale_details.Pharm_Id','=',$pharm_id)
         ->where('sale_details.deleted', '=','0')
         ->orderBy('Date','desc')
         ->get();
        // ->where('deleted', '=','0');


      //   $stocks = DB::table('stock')
      //  // ->join('formulae','stock.Formula','=','formulae.Id')
      //   ->join('list_data as category','stock.Category_Id','=','category.Id')
      //   ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
      //   ->join('brands as brand','stock.Brand','=','brand.Id')
      //   //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')
      //   ->join('sale_details','stock.Id','=','sale_details.Stock_Id')

      //   ->select('sale_details.Id','sale_details.Sale_Id'
      //     ,'stock.Id as Product_Id','stock.Name as Product'
      //     ,'stock.Item_Description as Description',
      //     'sale_details.unit_Qty as Sold_Quantity'
      //       ,'category.DataName as Category_Name'
      //        , 'subcategory.DataName as SubCategory_Name'
      //       ,'brand.Brand_Name as Brand_Name');
      //  // ->where('sale_details.Pharm_Id','=',$pharm_id);
      //  // ->where('stock.deleted','=','0')
       
      // //  $result = DB::query()
      // //   ->select('Sale_details.Id','Sale_details.Sale_Id','stocks.Product','stocks.Description',
      // //   'Sale_details.Product_Type','Sale_details.Sold_Quantity','stocks.Category_Name',
      // //   'stocks.SubCategory_Name','stocks.Brand_Name'
      // //   ,'Sale_details.Date','Sale_details.Time')
      // //   ->fromSub($stocks,'stocks')
      // //   ->joinSub($Sale_details,'Sale_details','stocks.Sale_Id','=','Sale_details.Sale_Id')
      // //   ->orderBy('Sale_details.Date','desc')
      // //   ->get();
       
        return response()->json($Sale_details,200);

    }

    public function showBySalesId($pharm_id,$saleId)
    {
         $Sale_details= DB::table('sale_details')
         ->join('pharmacysales','sale_details.Sale_Id','=','pharmacysales.Id')
         ->join('stock','sale_details.Stock_Id','=','stock.Id')

         ->select('sale_details.Id','sale_details.Sale_Id'
         ,'sale_details.unit_Qty as Sold_Quantity',
         'stock.Name as Product','stock.Item_Description as Description',
          DB::raw("CASE WHEN sale_details.stock_type=0 THEN 'Unit'
          WHEN sale_details.stock_type=1 THEN 'Leaf' 
          WHEN sale_details.stock_type=2 THEN 'Pack' END as Product_Type"),
          DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time")
         )
         ->where('sale_details.Pharm_Id','=',$pharm_id)
         ->where('sale_details.Sale_Id','=',$saleId)
         ->where('sale_details.deleted', '=','0')
         //->orderBy('Sale_details.Date','desc')
         ->get();
        // ->where('deleted', '=','0');


      //   $stocks = DB::table('stock')
      //  // ->join('formulae','stock.Formula','=','formulae.Id')
      //   ->join('list_data as category','stock.Category_Id','=','category.Id')
      //   ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
      //   ->join('brands as brand','stock.Brand','=','brand.Id')
      //   //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')
      //   ->join('sale_details','stock.Id','=','sale_details.Stock_Id')

      //   ->select('sale_details.Id','sale_details.Sale_Id'
      //     ,'stock.Id as Product_Id','stock.Name as Product'
      //     ,'stock.Item_Description as Description'
      //       ,'category.DataName as Category_Name'
      //        , 'subcategory.DataName as SubCategory_Name'
      //       ,'brand.Brand_Name as Brand_Name'
      //       )
      //   ->where('sale_details.Pharm_Id','=',$pharm_id);
      //  // ->where('stock.deleted','=','0')
       
      // //  $result = DB::query()
      // //   ->select('Sale_details.Id','Sale_details.Sale_Id','stocks.Product','stocks.Description',
      // //   'Sale_details.Product_Type','Sale_details.Sold_Quantity','stocks.Category_Name',
      // //   'stocks.SubCategory_Name','stocks.Brand_Name'
      // //   ,'Sale_details.Date','Sale_details.Time')
      // //   ->fromSub($stocks,'stocks')
      // //   ->joinSub($Sale_details,'Sale_details','stocks.Sale_Id','=','Sale_details.Sale_Id')
      // //   ->orderBy('Sale_details.Date','desc')
      // //   ->get();
       
        return response()->json($Sale_details,200);

    }

    /*

    public function edit(PharmacySalesDetails_Model $sale_details,$id)
    {
        $Sale_details= PharmacySalesDetails_Model::find($id);
         return response()->json($Sale_details,200);
       
    }


    public function update(Request $request,$id)
    {
         $rules = [

            'Pharm_Id'=>'required|numeric|gte:1',
            'Stock_Id'=>'required|numeric|gte:1',
            'Sale_Id'=>'required|numeric|gte:1',
            'unit_Qty'=>'required|numeric',
            'stock_type'=>'required|numeric|between:0,2'
            
        ];
          $validator = Validator::make($request->all(),$rules);
    

     if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{
        $Sale_details = PharmacySalesDetails_Model::find($id);
        $Sale_details->Stock_Id = $request->Stock_Id;
        $Sale_details->Sale_Id = $request->Sale_Id;
        $Sale_details->unit_Qty = $request->unit_Qty;
        $Sale_details->stock_type = $request->stock_type;
              
        
        $Sale_details->update();

         return response()->json($Sale_details,201);

       }
    }
*/

    public function destroy($id)
    {
        $Sale_details = PharmacySalesDetails_Model::find($id);
        $Sale_details->deleted='1';   
        $Sale_details->update();
        return response()->json($Sale_details,201);
    }
    
    //-------------------------------------Web API-----------------------------------------------------//

}