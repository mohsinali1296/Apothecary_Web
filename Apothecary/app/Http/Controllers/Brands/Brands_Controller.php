<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brands\Brands_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Validation\Rule;

class Brands_Controller extends Controller
{

//////////////////////////////Both Web And Android Api ////////////
    public function viewPage(){
        return view('ApiViews\brand');
    }

    public function displayTable(){
        $brand = Brands_Model::all();
        return view('ApiViews\brandsform')->with('brand',$brand);
    }

    public function saveBrand(Request $request ){

        $brand = new Brands_Model();        

        if($request->hasfile('image')) {
            $rules = [
                'Brand_Name' => 'required|min:3',
                'SubCategoryId' => 'required|numeric|min:1',
                'image'=>'nullable' 
            ];
        
        
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                    $brand->Brand_Name=$request->input('Brand_Name');
                    $brand->SubCategoryId=$request->input('SubCategoryId');
                    //if($request->hasfile('image')){
                    
                        $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$brand->Brand_Name.'_'.$brand->SubCategoryId.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $brand->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $brand->image =$filename;
                   // }
                    // else{
                    //     $brand->image=null;
                    //     $brand->imageUrl=null;
                    //     return $request;
                        
                    // }
                    $brand->save();
            //return view('ApiViews\brand')->with('brand',$brand);
            //return redirect('/viewbrand')->with('brand',$brand);
            return response()->json($brand,201);

            }
        }else{
                
            $rules = [
                'Brand_Name' => 'required|min:3',
                'SubCategoryId' => 'required|numeric|min:1' 
            ];
        
        
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                $brand->Brand_Name=$request->input('Brand_Name');
                $brand->SubCategoryId=$request->input('SubCategoryId');
                    
                $brand->image=null;
                $brand->imageUrl=null;
                         
                $brand->save();
            //return view('ApiViews\brand')->with('brand',$brand);
            //return redirect('/viewbrand')->with('brand',$brand);
            return response()->json($brand,201);

            }
        }
        

    }

    public function getAllBrands(){

        $listdata = DB::table('brands')
                        ->join('list_data','brands.SubCategoryId','=','list_data.Id')
                        ->select('brands.Id','brands.Brand_Name','brands.SubCategoryId','list_data.DataName as Category_Name'
                        ,'brands.image','brands.imageUrl')
                        //->where('brands.SubCategoryId','=',$id)
                        ->where('list_data.deleted','=','0')
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where(function($query1){
                            $query1->where('brands.Brand_Name','<>','None')
                            ->orWhere('brands.Brand_Name','<>','none');
                        })
                        ->where('brands.image','<>','NULL')
                        ->where('list_data.DataName','<>','NULL')
                        ->where('brands.Brand_Name','<>','NULL')
                        ->orderBy('brands.Brand_Name')
                        ->get();

                        return response()->json($listdata,200);

    }

    public function getAllOtherBrands(){

        $listdata = DB::table('brands')
                        ->join('list_data','brands.SubCategoryId','=','list_data.Id')
                        ->select('brands.Id','brands.Brand_Name','brands.SubCategoryId','list_data.DataName as Category_Name'
                        ,'brands.image','brands.imageUrl')
                        //->where('brands.SubCategoryId','=',$id)
                        ->where('list_data.deleted','=','0')
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where(function($query1){
                            $query1->where('brands.Brand_Name','<>','None')
                            ->orWhere('brands.Brand_Name','<>','none');
                        })
                        ->where('brands.image','=','NULL')
                        ->where('list_data.DataName','<>','NULL')
                        ->where('brands.Brand_Name','<>','NULL')
                        ->orderBy('brands.Brand_Name')
                        ->get();

                        return response()->json($listdata,200);

    }

    public function getBrandsByCategoryId($id){

        $listdata = DB::table('brands')
                        ->join('list_data','brands.SubCategoryId','=','list_data.Id')
                        ->select('brands.Id','brands.Brand_Name','brands.SubCategoryId','list_data.DataName as Category_Name'
                        ,'brands.image','brands.imageUrl')
                        ->where('brands.SubCategoryId','=',$id)
                        ->where('list_data.deleted','=','0')
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where(function($query1){
                            $query1->where('brands.Brand_Name','<>','None')
                            ->orWhere('brands.Brand_Name','<>','none');
                        })
                        ->where('list_data.DataName','<>','NULL')
                        ->where('brands.Brand_Name','<>','NULL')
                        ->orderBy('brands.Brand_Name')
                        ->get();

                        return response()->json($listdata,200);
    }

    public function getLimitedBrands(){

        $listdata = DB::table('brands')
                        ->join('list_data','brands.SubCategoryId','=','list_data.Id')
                        ->select('brands.Id','brands.Brand_Name','list_data.Id','list_data.DataName as Category_Name'
                        ,'brands.image','brands.imageUrl')
                        ->where('brands.image','<>','NULL')
                        ->where('list_data.deleted','=','0')
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where(function($query1){
                            $query1->where('brands.Brand_Name','<>','None')
                            ->orWhere('brands.Brand_Name','<>','none');
                        })
                        ->where('list_data.DataName','<>','NULL')
                        ->where('brands.Brand_Name','<>','NULL')
                        ->inRandomOrder()
                        ->limit(10)
                        ->get();

                        return response()->json($listdata,200);

    }

    public function getLimitedBrandsByCategoryId($id){

        $listdata = DB::table('brands')
                        ->join('list_data','brands.SubCategoryId','=','list_data.Id')
                        ->select('brands.Id','brands.Brand_Name','list_data.Id','list_data.DataName as Category_Name'
                        ,'brands.image','brands.imageUrl')
                        ->where('brands.SubCategoryId','=',$id)
                        ->where('list_data.deleted','=','0')
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where(function($query1){
                            $query1->where('brands.Brand_Name','<>','None')
                            ->orWhere('brands.Brand_Name','<>','none');
                        })
                        ->where('list_data.DataName','<>','NULL')
                        ->where('brands.Brand_Name','<>','NULL')
                        ->inRandomOrder()
                        ->limit(10)
                        ->get();

                        return response()->json($listdata,200);
    }

    // public function edit($Id){
    //     $brand = Brands_Model::find($Id);
    //     return response()->json($brand,200);
    // }

    // public function updateBrandData(Request $request , $Id){
    //     $brand = Brands_Model::find($Id); 
    //     $brand->Brand_Name = $request->input('Brand_Name');
    //     $brand->SubCategoryId = $request->input('SubCategoryId');

    //     if($request->hasfile('image')){
    //         $file=$request->file('image');
    //         $extension = $file->getClientOriginalExtension();
    //         $filename=$brand->Brand_Name.'_'.$brand->SubCategoryId.'_'.time().'.'.$extension;
    //         $file->move('uploads/images/',$filename);
    //         $brand->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
    //         $brand->image =$filename;

    //     }
    //     /*else{
    //         $listdata->image=null;
    //         $listdata->imageUrl=null;
    //         return $request;
    //     }*/ 

    //     $brand->save();

    //     return redirect('/viewbrand')->with('brand',$brand);
    // }

    public function editBrand($Id){
        $brand = Brands_Model::find($Id);
        return response()->json($brand,200);
    }

    public function updateBrand(Request $request){
        $brand = Brands_Model::find($request->Id); 
        $brand->Brand_Name = $request->input('Brand_Name');
        $brand->SubCategoryId = $request->input('SubCategoryId');

        if($request->hasfile('image')){
            $file=$request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename=$brand->Brand_Name.'_'.$brand->SubCategoryId.'_'.time().'.'.$extension;
            $file->move('uploads/images/',$filename);
            $brand->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
            $brand->image =$filename;

        }
        /*else{
            $listdata->image=null;
            $listdata->imageUrl=null;
            return $request;
        }*/ 

        $brand->update();

        return response()->json($brand,20);
    }

//////////////////////////////Both Web And Android Api ////////////

}
