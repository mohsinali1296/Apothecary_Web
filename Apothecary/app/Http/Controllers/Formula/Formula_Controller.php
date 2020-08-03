<?php

namespace App\Http\Controllers\Formula;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formula\Formula_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Formula_Controller extends Controller
{
    //-------------------------------------Web API-----------------------------------------------------//

    public function store(Request $request)
    {
         $rules = [
            'Formula'=>'required|alpha_num|unique:formulae,Formula',        
              ];
         $validator = Validator::make($request->all(),$rules);
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{ 
          
        $formula = new Formula_Model();
        $formula->Formula = $request->Formula;
        
        if($formula->save())
              {
            return response()->json($formula,201);
               }
            }
    }


    public function show()
    {
         $formula= DB::table('formulae')
         ->select('Id','Formula')
         ->where('formulae.deleted', '=','0')
         ->get();

       
        return response()->json($formula,200);
    }

    public function edit(Formula_Model $Formula_Model,$id)
    {
         $formula= Formula_Model::find($id);
         return response()->json($formula,200);
    }

    public function update(Request $request,$id)
    {
         $rules = [

            'formula'=>'required|alpha_num|unique:formulae,formula',
        
             
         ];
         $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
        else{
             $formula= Formula_Model::find($id);
             $formula->Formula = $request->Formula;

             $formula->update();    
       
             return response()->json($formula,201);

    
           }
     }


    
    public function destroy($id)
    {
        $formula = Formula_Model::find($id);
        $formula->deleted='1';   
        $formula->update();
        return response()->json($formula,201);
    }

    //-------------------------------------Web API-----------------------------------------------------//
}
