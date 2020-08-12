<?php

namespace App\Http\Controllers\ListData;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ListData\ListData_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Validation\Rule;

class ListData_Controller extends Controller
{

    public function viewPage(){
        return view('ApiViews\listdata');
    }

    public function displayTable(){
        $listdata = ListData_Model::all();
        return view('ApiViews\listdataform')->with('listdata',$listdata);
    }

    public function saveListData(Request $request){
        
        $listData = new ListData_Model();        

        if($request->hasfile('image')) {
            $rules = [
                'DataName' => 'required|min:3|unique:list_data,DataName',
                'List_Id' => 'required|numeric|min:1',
                'description'=>'nullable',
                'image'=>'nullable' 
            ];
        
        
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                    $listData->DataName=$request->input('DataName');
                    $listData->List_Id=$request->input('List_Id');
                    if($request->hasfile('image')){
                    
                        $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$listData->DataName.'_'.$listData->List_Id.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $listData->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $listData->image =$filename;
                    }
                    else{
                        $listData->image=null;
                        $listData->imageUrl=null;
                        return $request;
                        
                    }
                    $listData->save();
             //return view('ApiViews\listdata')->with('listdata',$listData);
            //viewlistdata
            return redirect('/viewlistdata')->with('listdata',$listData);

            }
        }else{
                
            $rules = [
                'DataName' => 'required|min:3',
                'List_Id' => 'required|numeric|min:1',
                'description'=>'nullable' 
            ];
        
        
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                    $listData->DataName=$request->input('DataName');
                    $listData->List_Id=$request->input('List_Id');
                    
                    $listData->image=null;
                    $listData->imageUrl=null;
                         
                    $listData->save();
            //return view('ApiViews\listdata')->with('listdata',$listData);
            //viewlistdata
            return redirect('/viewlistdata')->with('listdata',$listData);
            }
        }
        
            
    }

    public function getListDataByListId($listid){

        $listdata = DB::table('list_data')
                        ->join('list','list_data.List_Id','=','list.Id')
                        ->select('list_data.Id','list_data.DataName','list.ListName','list_data.image','list_data.imageUrl','list_data.description')
                        ->where('list_data.List_Id','=',$listid)
                        ->where(function($query){
                            $query->where('list_data.DataName','<>','None')
                            ->orWhere('list_data.DataName','<>','none');
                        })
                        ->where('list_data.DataName','<>','NULL')
                        ->where('list_data.deleted','=','0')
                        ->orderBy('list_data.Id')
                        ->get();

                        return response()->json($listdata,200);
    }

    public function getListDataByListId_Name($listid,$listname){

        $request = [$listid,$listname];

        $rules = [
            $listid => 'nullable',
            $listname => 'nullable' 
     
        ];
        $validator = Validator::make($request,$rules);

        if($validator->fails()){
            return $validator->errors();
            }
            else{ 

        $listdata = DB::table('list_data')
        ->join('list','list_data.List_Id','=','list.Id')
        ->select('list_data.Id','list_data.DataName','list.ListName','list_data.image','list_data.imageUrl','list_data.description')
        ->where('list_data.DataName','<>','NULL')
        ->where(function($query) use($listid,$listname){  
            $query
            ->where('list_data.List_Id','=', $listid)
            ->orWhere('list.ListName','=',$listname);
        })
        
        ->where(function($query1) {
            $query1->where('list_data.DataName','<>','None')
            ->orWhere('list_data.DataName','<>','none');
        })
        
        ->get();

        return response()->json($listdata,200);
         }
    }

    public function getListDataByListName($listname){

        $request = [$listname];

    /*    $rules = [
            $listname => 'required' 
     
        ];
        $validator = Validator::make($request,$rules);

        if($validator->fails()){
            return $validator->errors();
            }
            else{ */

        $listdata = DB::table('list_data')
        ->join('list','list_data.List_Id','=','list.Id')
        ->select('list_data.Id','list_data.DataName','list.ListName','list_data.image','list_data.imageUrl','list_data.description')
        ->where('list.ListName','=',$listname)
        ->where(function($query){
            $query->where('list_data.DataName','<>','None')
            ->orWhere('list_data.DataName','<>','none');
        })
        ->where('list_data.DataName','<>','NULL')
        ->get();

        return response()->json($listdata,200);
           // }
    }
    
    public function getListDataFiltered($dataname){

        $listdata = DB::table('list_data')
        //QueryBuilder::for(ListData_Model::class)
        ->join('list','list_data.List_Id','=','list.Id')
        ->select('list_data.Id','list_data.DataName','list.ListName','list_data.image','list_data.imageUrl','list_data.description')
        ->where('list_data.DataName','like','%'.$dataname.'%')
        //->orWhere('list.ListName','=',$listname)
        //->allowedFilters('list_data.DataName')
        ->get();

        return response()->json($listdata,200);
        
    }

    public function getPromotionImages(){
        $listdata = DB::table('list_data')
        ->join('list','list_data.List_Id','=','list.Id')
        ->select('list_data.Id','list_data.DataName','list.ListName','list_data.image','list_data.imageUrl','list_data.description')
        ->where('list_data.List_Id','=','6')
        ->where(function($query){
            $query->where('list_data.DataName','<>','None')
            ->orWhere('list_data.DataName','<>','none');
        })
        ->where('list_data.DataName','<>','NULL')
        ->inRandomOrder()
        ->limit(10)
        ->get();

        return response()->json($listdata,200);
    }

    public function edit($Id){
        $listdata = ListData_Model::find($Id);
        return view('ApiViews\updatelistdata')->with('listdata',$listdata);
    }

    public function updateListData(Request $request , $Id){
        $listdata = ListData_Model::find($Id); 
        $listdata->DataName = $request->input('DataName');
        $listdata->List_Id = $request->input('List_Id');

        if($request->hasfile('image')){
            $file=$request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename=$listdata->DataName.'_'.$listdata->List_Id.'_'.time().'.'.$extension;
            $file->move('uploads/images/',$filename);
            $listdata->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
            $listdata->image =$filename;

        }
        

        $listdata->save();

        return redirect('/viewlistdata')->with('listdata',$listdata);
    }

    public function saveSupplierCompany(Request $request){
        
        $listData = new ListData_Model();        

        
            $rules = [
                'DataName' => 'required|min:3|unique:list_data,DataName',
               // 'List_Id' => 'required|numeric|min:1',
               // 'description'=>'nullable',
               // 'image'=>'nullable' 
            ];
        
        
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return $validator->errors();
            }
            else{
                    $listData->DataName=$request->input('DataName');
                    $listData->List_Id=4;
                    $listData->save();
             //return view('ApiViews\listdata')->with('listdata',$listData);
            //viewlistdata
            return response()->json($listData,201);
            
        }        
        
            
    }
    
}
