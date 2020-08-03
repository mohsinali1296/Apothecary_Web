<?php

namespace App\Http\Controllers\Alternatives;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alternatives\Alternatives_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Alternatives_Controller extends Controller
{ 
    //-------------------------------------Web API-----------------------------------------------------//

    public function store(Request $request)
    {
         $rules = [

            'medicine'=>'required|numeric',
            'alternative_med'=>'required|numeric'
                  ];
          

          $validator = Validator::make($request->all(),$rules);


          if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{

            
        $Alternative = new Alternatives_Model();
        $Alternative->medicine = $request->medicine;
        $Alternative->alternative_med = $request->alternative_med;
        
            if($Alternative->save()){
                return response()->json($Alternative,201);
              }
  

            }
    }

  
    public function show()  
    {
         $Alternative= DB::table('alternatives')
         ->join('stock as med','alternatives.medicine','=','med.Id')
         ->join('stock as alter','alternatives.alternative_med','=','alter.Id')
         ->select('Id','med.Name as Medicine','alter.Name as Alternative Medicine')
         ->where('deleted', '=','0')
         ->where('med.deleted','=','0')
         ->where('alter.deleted','=','0')
         ->get();

       
         return response()->json($Alternative,200);
    }

    public function edit(Alternatives_Model $alternatives,$id)
    {
        $Alternative= Alternatives_Model::find($id);
        return response()->json($Alternative,200);
    }

 
    public function update(Request $request,$id)
    {

        $rules = [

            'medicine'=>'required|numeric',
            'alternative_med'=>'required|numeric'
                  ];
          

          $validator = Validator::make($request->all(),$rules);


          if($validator->fails())
        {
             return response()->json($validator->errors(),202);
        }
            
        else{

         $Alternative = Alternatives_Model::find($id);
         $Alternative->medicine = $request->medicine;
         $Alternative->alternative_med = $request->alternative_med;
         $Alternative->update();  


         return response()->json($Alternative,201);

           }
    }

    public function destroy($id)
    {
        $Alternative = Alternatives_Model::find($id);
        $Alternative->deleted='1';   
        $Alternative->update();
         return response()->json($Alternative,201);
    }

    //-------------------------------------Web API-----------------------------------------------------//
    
}
