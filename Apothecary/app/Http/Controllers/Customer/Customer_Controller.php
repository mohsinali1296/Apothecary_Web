<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer\Customer_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Customer_Controller extends Controller
{
   //-------------------------------------Web API-----------------------------------------------------//

   public function store(Request $request)
   {
       $rules = [

           'Full_Name'=>'required|min:3',
           'Email'=>'nullable|Email|max:255',
           'Contact'=>'nullable|numeric|min:11',
           'Address'=>'nullable|max:255'
                            
         ];


         $validator = Validator::make($request->all(),$rules);

       
       if($validator->fails())
       {
            return response()->json($validator->errors(),202);
       }
           
       else{

       $Customer = new Customer_Model();
       $Customer->Full_Name = $request->Full_Name;
       $Customer->Email = $request->Email;
       $Customer->Contact = $request->Contact;
       $Customer->Address = $request->Address;
       $Customer->Pharm_Id =$request->Pharm_Id;

       if($Customer->save()){
           return response()->json($Customer,201);
        }

       }
   }

   
   public function show($pharmid)
   {
       $Customer= DB::table('customer')
        ->select('customer.Id as Customer_Id','customer.Full_Name','customer.Email','customer.Contact'
        ,'customer.Address')
        ->where('Pharm_Id','=',$pharmid)
        ->where('deleted', '=','0')
        ->get();

       return response()->json($Customer,200);
    
   }

   
   public function edit($id)
   {    
       $customer= new Customer_Model();
       $customer= Customer_Model::find($id);
       return response()->json($customer,200);
       
   }

   
   public function update(Request $request,$id)
   {

        $rules = [

           'Full_Name'=>'required|min:3',
           'Email'=>'nullable|email|unique:customer,Email|max:255',
           'Contact'=>'nullable|numeric|unique:customer,Contact|min:11',
           'Address'=>'nullable|String'
                            
         ];


         $validator = Validator::make($request->all(),$rules);

       
       if($validator->fails())
       {
            return response()->json($validator->errors(),202);
       }
           
       else{

       $Customer = Customer_Model::find($id);
       $Customer->Full_Name = $request->Full_Name;
       $Customer->Email = $request->Email;
       $Customer->Contact = $request->Contact;
       $Customer->Address = $request->Address;      
       
       $Customer->update();
       return response()->json($Customer,201);
   
   }
}

   
   public function destroy($id)
   {
       $Customer = Customer_Model::find($id);
       $Customer->deleted='1';   
       $Customer->update();
       return response()->json($Customer,201);
   }


    //-------------------------------------Web API-----------------------------------------------------//
}
