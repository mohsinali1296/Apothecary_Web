<?php

namespace App\Http\Controllers\Stocks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Stocks_Controller extends Controller
{
   
  ///////////////////////// Start Android API /////////////////////  
    public function viewPage(){
        return view('ApiViews\stock');
    }

    public function displayTable(){
        $stock = Stocks_Model::all();
        return view('ApiViews\stocksform')->with('stock',$stock);
    }

    public function getProductById($id){
        $stocks = DB::table('stock')
        ->join('formulae','stock.Formula','=','formulae.Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('brands as brand','stock.Brand','=','brand.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
        ,'formulae.Formula as Formula_Name'
        ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
        ,'pharmacy.Contact as Pharmacy_Contact'
        ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
        ,'pharmacy.Latitude','pharmacy.Longitude'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        
        ->where('stock.Id','=',$id)
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0')
        ->limit(1)
        ->get();

        return response()->json($stocks,200);
    }

    public function getProductBySubCategoryId($id,$stockid){
        $stocks = DB::table('stock')
        ->join('formulae','stock.Formula','=','formulae.Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('brands as brand','stock.Brand','=','brand.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
        ,'formulae.Formula as Formula_Name'
        ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
        ,'pharmacy.Contact as Pharmacy_Contact'
        ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
        ,'pharmacy.Latitude','pharmacy.Longitude'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        
        ->where('stock.sub_category','=',$id)
        ->where('stock.Id','<>',$stockid)
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0')
        ->where('stock.image','<>','NULL')
        ->limit(15)
        ->get();

        return response()->json($stocks,200);
    }


    public function getProductByBrandId($id,$stockid){
        $stocks = DB::table('stock')
        ->join('formulae','stock.Formula','=','formulae.Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('brands as brand','stock.Brand','=','brand.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
        ,'formulae.Formula as Formula_Name'
        ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
        ,'pharmacy.Contact as Pharmacy_Contact'
        ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
        ,'pharmacy.Latitude','pharmacy.Longitude'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        
        ->where('stock.Brand','=',$id)
        ->where('stock.Id','<>',$stockid)
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0')
        ->where('stock.image','<>','NULL')
        ->limit(15)
        ->get();

        return response()->json($stocks,200);
    }

    public function getAllStockListForApp($id){
        $stocks = DB::table('stock')
        ->join('formulae','stock.Formula','=','formulae.Id')
        ->join('list_data as category','stock.Category_Id','=','category.Id')
        ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
        ->join('brands as brand','stock.Brand','=','brand.Id')
        ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
        ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
        ,'formulae.Formula as Formula_Name'
        ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
        ,'pharmacy.Contact as Pharmacy_Contact'
        ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
        ,'pharmacy.Latitude','pharmacy.Longitude'
        ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
        ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
        ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
        ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
        ,'stock.unit_price','stock.leaf_price','stock.box_price'
        ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
        
        
        ->where('stock.Category_Id','=',$id)
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0')
        ->paginate(15);

        return response()->json($stocks,200);
    }


    //->where('stock.Name','like','%'.$name.'%')

    public function getStockListForAppByName($name,$lat,$long,$distance){

        $pharm = DB::query()
        ->select('p1.Id as Pharmacy_Id','p1.Pharm_Name as Pharmacy_Name','p1.distance as Pharmacy_Distance'
        ,'p1.Latitude as Pharmacy_Latitude','p1.Longitude as Pharmacy_Longitude','p1.Contact as Pharmacy_Contact'
        ,'p1.Pharmacy_Address as Pharmacy_Address','p1.email as Pharmacy_Email','p1.deleted')
         ->fromSub(function ($query){
                 $query
                 ->select(
                     DB::raw("p.*,
                     (
                         (
                             (
                                 acos(
                                     sin(( (?) * pi() / 180))
                                     *
                                     sin(( p.Latitude * pi() / 180)) + cos(( (?) * pi() /180 ))
                                     *
                                     cos(( p.Latitude * pi() / 180)) * cos((( (?) - p.Longitude) * pi()/180)))
                             ) * 180/pi()
                         ) * 60 * 1.1515 * 1.609344
                     )
                 as distance from pharmacy as p
                     "),//["lat"=>$lat,"lat_i"=>$lat,"lng"=>$lng]
                     //[$lat, $lat, $long]
                 )
                 //->setBindings([$lat, $lat, $long])
                 ;
         },'p1')
         //->where('p1.distance','<=','10')
         ->where('p1.distance','<=',$distance)
         ->where('p1.deleted','=','0')
         ->setBindings([$lat, $lat, $long],'select');
    

         $stocks =// DB::table('stock')
         DB::query()
         
         ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
         ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
         ,'formulae.Formula as Formula_Name'
         ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
         ,'pharmacy.Contact as Pharmacy_Contact'
         ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
         ,'pharmacy.Latitude','pharmacy.Longitude'
         ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
         ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
         ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
         ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
         ,'stock.unit_price','stock.leaf_price','stock.box_price'
         ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')

        ->from('stock')

        ->join('formulae','stock.Formula','=','formulae.Id')
         ->join('list_data as category','stock.Category_Id','=','category.Id')
         ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
         ->join('brands as brand','stock.Brand','=','brand.Id')
         ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        //->where('stock.Category_Id','=',$id) 
        ->where('stock.Name','like','%'.$name.'%')
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0');


       $result = DB::query()
       ->select('stocks.*','pharm.*')
       ->fromSub($stocks,'stocks')
       ->joinSub($pharm,'pharm','stocks.Pharmacy_Id','=','pharm.Pharmacy_Id')
       ->paginate(15);

        return response()->json($result,200);
  
    }

    public function saveStock(Request $request){

        $stock = new Stocks_Model();        

        $rules = [
            'Name' => 'required|min:3',
            'Item_Description' => 'required',
            'Item_Detailed_Description'=>'nullable',
            'Formula'=>'required|numeric|min:1|gte:1',
            'Pharm_Id'=>'required|numeric|min:1|gte:1',
            'Category_Id'=>'required|numeric|min:1|gte:1',
            'sub_category'=>'required|numeric|min:1|gte:1',
            'unit_Qty'=>'required|numeric|gte:1',
            'qty_per_leaf'=>'required|numeric|gte:0',
            'qty_per_box'=>'required|numeric|gte:0',
            'unit_price'=>'required|numeric|gte:1|between:1,9999999999999999.99999999999999999999',
            'leaf_price'=>'required|numeric|gte:0|between:0,9999999999999999.99999999999999999999',
            'box_price'=>'required|numeric|gte:0|between:0,9999999999999999.99999999999999999999',
            'DOE'=>'required|date',
            'Brand'=>'required|numeric|min:1|gte:1',
            'prescription_required'=>'required|numeric|in:0,1'
        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                    $stock->Name=$request->input('Name');
                    $stock->Item_Description=$request->input('Item_Description');
                    $stock->Item_Detailed_Description=$request->input('Item_Detailed_Description');
                    $stock->Formula=$request->input('Formula');
                    $stock->Pharm_Id=$request->input('Pharm_Id');
                    $stock->Category_Id=$request->input('Category_Id');
                    $stock->sub_category=$request->input('sub_category');
                    $stock->unit_Qty=$request->input('unit_Qty');
                    $stock->qty_per_leaf=$request->input('qty_per_leaf');
                    $stock->qty_per_box=$request->input('qty_per_box');
                    $stock->unit_price=$request->input('unit_price');
                    $stock->leaf_price=$request->input('leaf_price');
                    $stock->box_price=$request->input('box_price');
                    $stock->DOE=$request->input('DOE');
                    $stock->Brand=$request->input('Brand');
                    $stock->prescription_required=$request->input('prescription_required');

                    if($request->hasfile('image')){
                        $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$stock->Name.'_'.$stock->Pharm_Id.'_'.$stock->Category_Id.'_'.$stock->sub_category.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $stock->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $stock->image =$filename;
                    }
                    else{
                        $stock->image='no_image_available.png';
                        $stock->imageUrl='http://localhost:8000/uploads/images/no-image-available.png';
                        return $request;
                        
                    }
                    $stock->save();
            //return view('ApiViews\stock')->with('stock',$stock);
            return redirect('/viewstock')->with('stock',$stock);

            }

    }

    public function getAllStockListNearYouForApp($id,$lat,$long,$distance){

        $pharm = DB::query()
        ->select('p1.Id as Pharmacy_Id','p1.Pharm_Name as Pharmacy_Name','p1.distance as Pharmacy_Distance'
        ,'p1.Latitude as Pharmacy_Latitude','p1.Longitude as Pharmacy_Longitude','p1.Contact as Pharmacy_Contact'
        ,'p1.Pharmacy_Address as Pharmacy_Address','p1.email as Pharmacy_Email','p1.deleted')
         ->fromSub(function ($query){
                 $query
                 ->select(
                     DB::raw("p.*,
                     (
                         (
                             (
                                 acos(
                                     sin(( (?) * pi() / 180))
                                     *
                                     sin(( p.Latitude * pi() / 180)) + cos(( (?) * pi() /180 ))
                                     *
                                     cos(( p.Latitude * pi() / 180)) * cos((( (?) - p.Longitude) * pi()/180)))
                             ) * 180/pi()
                         ) * 60 * 1.1515 * 1.609344
                     )
                 as distance from pharmacy as p
                     "),//["lat"=>$lat,"lat_i"=>$lat,"lng"=>$lng]
                     //[$lat, $lat, $long]
                 )
                 //->setBindings([$lat, $lat, $long])
                 ;
         },'p1')
         //->where('p1.distance','<=','10')
         ->where('p1.distance','<=',$distance)
         ->where('p1.deleted','=','0')
         ->setBindings([$lat, $lat, $long],'select');
    

         $stocks =// DB::table('stock')
         DB::query()
         
         ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
         ,'stock.Item_Detailed_Description','stock.Formula as Formula_Id'
         ,'formulae.Formula as Formula_Name'
         ,'stock.Pharm_Id as Pharmacy_Id','pharmacy.Pharm_Name as Pharmacy_Name'
         ,'pharmacy.Contact as Pharmacy_Contact'
         ,'pharmacy.Pharmacy_Address','pharmacy.email as Pharmacy_Email'
         ,'pharmacy.Latitude','pharmacy.Longitude'
         ,'stock.Category_Id as Category_Id','category.DataName as Category_Name'
         ,'stock.sub_category as SubCategory_Id', 'subcategory.DataName as SubCategory_Name'
         ,'stock.Brand as Brand_Id', 'brand.Brand_Name as Brand_Name'
         ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
         ,'stock.unit_price','stock.leaf_price','stock.box_price'
         ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')

        ->from('stock')

        ->join('formulae','stock.Formula','=','formulae.Id')
         ->join('list_data as category','stock.Category_Id','=','category.Id')
         ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
         ->join('brands as brand','stock.Brand','=','brand.Id')
         ->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

        ->where('stock.Category_Id','=',$id) 
        ->where('stock.deleted','=','0')
        ->where('stock.expired','=','0')
        ->where('pharmacy.deleted','=','0')
        ->where('category.deleted','=','0')
        ->where('subcategory.deleted','=','0')
        ->where('formulae.deleted','=','0');


       $result = DB::query()
       ->select('stocks.*','pharm.*')
       ->fromSub($stocks,'stocks')
       ->joinSub($pharm,'pharm','stocks.Pharmacy_Id','=','pharm.Pharmacy_Id')
       ->paginate(15);

        return response()->json($result,200);
  
    }

    public function edit($Id){
        $stock = Stocks_Model::find($Id);
        return view('ApiViews\updatestock')->with('stock',$stock);
    }

    public function edit2($Id){
        $stock = Stocks_Model::find($Id);
        return view('ApiViews\addstock')->with('stock',$stock);
    }

    public function updateStockData(Request $request , $Id){
        $stock = Stocks_Model::find($Id); 
                    $stock->Name=$request->input('Name');
                    $stock->Item_Description=$request->input('Item_Description');
                   // $stock->Item_Detailed_Description=$request->input('Item_Detailed_Description');
                    $stock->Formula=$request->input('Formula');
                    $stock->Pharm_Id=$request->input('Pharm_Id');
                    $stock->Category_Id=$request->input('Category_Id');
                    $stock->sub_category=$request->input('sub_category');
                    $stock->unit_Qty=$request->input('unit_Qty');
                    $stock->qty_per_leaf=$request->input('qty_per_leaf');
                    $stock->qty_per_box=$request->input('qty_per_box');
                    $stock->unit_price=$request->input('unit_price');
                    $stock->leaf_price=$request->input('leaf_price');
                    $stock->box_price=$request->input('box_price');
                    $stock->DOE=$request->input('DOE');
                    $stock->Brand=$request->input('Brand');
                    $stock->deleted=$request->input('deleted');
                    $stock->expired=$request->input('expired');
                    $stock->Available=$request->input('Available');
                    $stock->Profit_Price=$request->input('Profit_Price');
                    $stock->unit_BuyPrice=$request->input('unit_BuyPrice');
                    $stock->Barcode=$request->input('Barcode');


        if($request->hasfile('image')){
            $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$stock->Name.'_'.$stock->Pharm_Id.'_'.$stock->Category_Id.'_'.$stock->sub_category.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $stock->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $stock->image =$filename;

        }
        /*else{
            $listdata->image=null;
            $listdata->imageUrl=null;
            return $request;
        }*/ 

        $stock->save();

        return redirect('/viewstock')->with('stock',$stock);
    }


//////////////////////// End Android Api //////////////////////////

public function getProductByPharmId($id){
    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description'
    ,'formulae.Formula as Formula_Name'
    ,'category.DataName as Category_Name'
    , 'subcategory.DataName as SubCategory_Name'
    , 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    //->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    ->get();
    //->limit(1)
    //->paginate(25);

    return response()->json($stocks,200);
}

public function getProductList_POS($id){

    $stocks = DB::table('stock')
    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Barcode',
    DB::raw("CONCAT(stock.Name, ' | ', stock.Item_Description) as Product"),
    )
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ->get();
    return response()->json($stocks,200);
}

public function getProductByProductId($id,$productId){
    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description'
    ,'formulae.Formula as Formula_Name'
    ,'category.DataName as Category_Name'
    , 'subcategory.DataName as SubCategory_Name'
    , 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.Id','=',$productId)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ///->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    ->get();
    //->limit(1);
    //->paginate(25);

    return response()->json($stocks,200);
}

public function getProductByName($id,$stockName){
    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description'
    ,'formulae.Formula as Formula_Name'
    ,'category.DataName as Category_Name'
    , 'subcategory.DataName as SubCategory_Name'
    , 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.Name','=',$stockName)
    //->where('stock.Name','like','%'.$stockName.'%')
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ///->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    ->get();
    //->limit(1);
    //->paginate(25);

    return response()->json($stocks,200);
}

public function getProductByBarcode($id,$barcode){
    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description'
    ,'formulae.Formula as Formula_Name'
    ,'category.DataName as Category_Name'
    , 'subcategory.DataName as SubCategory_Name'
    , 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.Barcode','=',$barcode)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','0')
    ///->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    ->get();
    //->limit(1);
    //->paginate(25);

    return response()->json($stocks,200);
}

public function destroy($id)
{
   
    $stock = Stocks_Model::find($id);
    $stock->deleted='1';   
    $stock->update();
    return response()->json($stock,201);
}

public function checkExpiredProducts(){

    $stock =  DB::table('stock')->whereRaw('Date(DOE) = CURDATE()')->get();
    foreach ($stock as $s) {
        $st = Stocks_Model::find($s->Id);
        $st->expired='1';   
        $st->update();
    }
    return response()->json('Products Expiry Checked',202);
}

public function getExpiredProductsList($id){

    $stocks = DB::table('stock')
    ->join('formulae','stock.Formula','=','formulae.Id')
    ->join('list_data as category','stock.Category_Id','=','category.Id')
    ->join('list_data as subcategory','stock.sub_category','=','subcategory.Id')
    ->join('brands as brand','stock.Brand','=','brand.Id')
    //->join('pharmacy','stock.Pharm_Id','=','pharmacy.Id')

    ->select('stock.Id as Product_Id','stock.Name as Product_Name','stock.Item_Description'
    ,'stock.Item_Detailed_Description'
    ,'formulae.Formula as Formula_Name'
    ,'category.DataName as Category_Name'
    , 'subcategory.DataName as SubCategory_Name'
    , 'brand.Brand_Name as Brand_Name'
    ,'stock.unit_Qty','stock.qty_per_leaf','stock.qty_per_box'
    ,'stock.unit_price','stock.leaf_price','stock.box_price'
    ,'stock.image','stock.imageUrl','stock.Available','stock.delivery_charges as Delivery_Charges')
    
    
    
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.deleted','=','0')
    ->where('stock.expired','=','1')
    //->where('pharmacy.deleted','=','0')
    ->where('category.deleted','=','0')
    ->where('subcategory.deleted','=','0')
    ->where('formulae.deleted','=','0')
    //->limit(1)
    ->paginate();

    return response()->json($stocks,200);
    
}

public function getExpiredProductsCount($id){
    $expired = DB::table('stock')
    ->where('stock.Pharm_Id','=',$id)
    ->where('expired','=','1')
    ->count();
    return response()->json($expired,200);
}

public function getOutOfStockCount($id){
    $outOfStock = DB::table('stock')
    ->where('stock.Pharm_Id','=',$id)
    ->where('stock.unit_Qty','<=','0')
    ->count();
    return response()->json($outOfStock,200);
}

}
