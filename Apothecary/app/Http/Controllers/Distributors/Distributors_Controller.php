<?php

namespace App\Http\Controllers\Distributors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Distributors\Distributors_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Distributors_Controller extends Controller
{
    //-------------------------------------Web API-----------------------------------------------------//

    public function store(Request $request)
    {
        $rules = [

            'Name'=>'required|String|min:3',
            'Email'=>'required|email|unique:distributors,Email|max:255',
            'Company_Id'=>'required|numeric|gte:1',
  
                             
          ];

 
          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{

        $Distributors = new Distributors_Model();
        $Distributors->Name = $request->Name;
        $Distributors->Email = $request->Email;
        $Distributors->Contact = $request->Contact;
        $Distributors->Distributor_Address = $request->Address;
        $Distributors->Pharmacy_Id =$request->Pharm_Id; 
        $Distributors->Company_Id =$request->Company_Id;
        

        if($Distributors->save()){
            return response()->json($Distributors,201);
         }

            }
    }


    public function show($pharmid)
    {
        $Distributors= DB::table('distributors')
         ->select('distributors.Id as Distributor_Id','distributors.Name','distributors.Email','distributors.Contact'
         ,'list_data.DataName as Company_Name','distributors.Distributor_Address')
         ->join('list_data','distributors.Company_Id','=','list_data.Id')
          ->where('Pharmacy_Id','=',$pharmid)
         ->where('distributors.deleted', '=','0')

         ->get();

        return response()->json($Distributors,200);
      
    }

    public function edit($id)
    {

        $Distributors= DB::table('distributors')
         ->select('distributors.Id as Distributor_Id','distributors.Name','distributors.Email','distributors.Contact'
         ,'distributors.Company_Id'
         ,'list_data.DataName as Company_Name','distributors.Distributor_Address')
         ->join('list_data','distributors.Company_Id','=','list_data.Id')
          ->where('distributors.Id','=',$id)
         ->where('distributors.deleted', '=','0')

         ->first();

        //$Distributors= Distributors_Model::find($id);
         return response()->json($Distributors,200);
      
    }


    public function update(Request $request)
    {
         $rules = [
            'Id'=>'required|numeric|gte:1',
            'Name'=>'required|string|min:3',
            'Email'=>'required|email|max:255',
            'Contact'=>'required|numeric|min:11',
            'Company_Id'=>'required|numeric|gte:1',
            'Distributor_Address'=>'required|string|max:255'
                             
          ];


          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{
        

        $Distributors = Distributors_Model::find($request->Id);
        
        $Distributors->Name = $request->Name;
        $Distributors->Email = $request->Email;
        $Distributors->Contact = $request->Contact;
        $Distributors->Distributor_Address = $request->Distributor_Address;
        $Distributors->Company_Id =$request->Company_Id;

        $Distributors->update(); 
        return response()->json($Distributors,201);
    
        }
    }

    public function destroy($id)
    
    {
        $Distributors = Distributors_Model::find($id);
        $Distributors->deleted='1';   
        $Distributors->update(); 
        return response()->json($Distributors,201);
   }

    //-------------------------------------Web API-----------------------------------------------------//
}
