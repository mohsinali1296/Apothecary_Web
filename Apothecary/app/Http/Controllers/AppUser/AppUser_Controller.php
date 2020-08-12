<?php

namespace App\Http\Controllers\AppUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AppUser\AppUser_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class AppUser_Controller extends Controller
{

//////////////////////////////// Start Android Api  ////////////////////
    public function registerUser(Request $request){
        
        $rules = [
            'fullname' => 'required|min:3',
            'contact' => 'required|unique:appusers,contact|min:11',
            'email'=>'required|email|unique:appusers,email|max:255',
            'pass'=>'required|alpha_num|min:8|max:255',

        ];

        $errorMessage = ['email.unique'=>'Email has already been taken',
                        'contact.unique'=>'Contact has already been taken'];

        $validator = Validator::make($request->all(),$rules,$errorMessage);
        
        if($validator->fails()){
          
                $returnData = array(
                    'success' => false,
                    'message' => $validator->errors(),
                    'body'=>NULL
                );
                
                //return response()->json($validator->errors(),202);
                return response()->json($returnData,202);
           // }
            //if($this->$validator($request->all(),$rules,$errorMessage)->fails()){
 
           // return response()->json($this->$validator,202);



            }
            else{
                    $user = new AppUser_Model();
                    $user->fullname=$request->fullname;
                    $user->contact=$request->contact;
                    $user->email=$request->email;
                    $user->pass=$request->pass;
                    
                  if($user->save()) {
                    //return response()->json($user, 201);
                    $returnData = array(
                        'success' => true,
                        'message' => 'Registration Successfully Completed',
                        'body'=>$user
                    );
                    
                    //return response()->json($validator->errors(),202);
                    return response()->json($returnData,201);
                  } 
                  //else{
                  //  return response()->json($validator,200);
                 // }
            //return view('ApiViews\pharmacy')->with('user',$user);
            
            }
    }

    public function registerUser2(Request $request){
        
        $rules = [
            'fullname' => 'required|min:3',
            'email'=>'required|email|unique:appusers,email|max:255'

        ];

        $errorMessage = ['email.unique'=>'Email has already been taken'];

        $validator = Validator::make($request->all(),$rules,$errorMessage);
        
        if($validator->fails()){
          
                $returnData = array(
                    'success' => false,
                    'message' => $validator->errors(),
                    'body'=>NULL
                );
                
                //return response()->json($validator->errors(),202);
                return response()->json($returnData,202);
           // }
            //if($this->$validator($request->all(),$rules,$errorMessage)->fails()){
 
           // return response()->json($this->$validator,202);



            }
            else{
                    $user = new AppUser_Model();
                    $user->fullname=$request->fullname;
                    $user->email=$request->email;
                    
                  if($user->save()) {
                    //return response()->json($user, 201);
                    $returnData = array(
                        'success' => true,
                        'message' => 'Registration Successfully Completed',
                        'body'=>$user
                    );
                    
                    //return response()->json($validator->errors(),202);
                    return response()->json($returnData,201);
                  } 
                  //else{
                  //  return response()->json($validator,200);
                 // }
            //return view('ApiViews\pharmacy')->with('user',$user);
            
            }
    }

    public function Login($email,$pass){

        $request = [$email,$pass];

        $rules = [
            'email'=>'required|email|max:255',
            'pass'=>'required|alpha_num|min:8|max:255',

        ];
        $validator = Validator::make($request,$rules);
        if($validator->fails()){
            return response()->json($validator->errors(),400);

            //if($user->isEmpty()){
                $returnData = array(
                    'status' => 'error',
                    'message' => 'No such User. Please SignUp to Continue'
                );
               
               // return response()->json($returnData,500);

            }
            else{
                $user = DB::table('appusers')
                ->select('appusers.Id as Customer_Id','appusers.fullname as Fullname','appusers.contact'
                ,'appusers.local_Address','appusers.City', 'appusers.Country'
                ,'appusers.email','appusers.image','appusers.imageUrl')
                ->where('appusers.email','=',$email)
                ->where('appusers.pass','=',$pass)
                ->where('appusers.deleted','=','0')
                ->get();
                
                if($user->isEmpty()){
                    $returnData = array(
                        'status' => 'error',
                        'message' => 'No such User. Please SignUp to Continue'
                    );
                    //return Response::json($returnData, 500);
                    return response()->json($returnData,202);
                }
                return response()->json($user,200);
            
            }

    }


    public function UserLogin(Request $request){

        $rules = [
            'email'=>'email|max:255',
            'pass'=>'alpha_num|min:8|max:255',

        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
            }
            else{
                $user = DB::table('appusers')
                ->select('appusers.Id as Customer_Id','appusers.fullname as Fullname','appusers.contact'
                ,'appusers.local_Address','appusers.City', 'appusers.Country'
                ,'appusers.email','appusers.image','appusers.imageUrl')
                ->where('appusers.email','=',$request->email)
                ->where('appusers.pass','=',$request->pass)
                ->where('appusers.deleted','=','0')
                ->get();
                
                if($user->isEmpty()){
                    $returnData = array(
                        'error' => true,
                        'message' => 'Login Failed!',
                        'body'=>$user
                    );
                    //return Response::json($returnData, 500);
                    return response()->json($returnData,500);
                }else{
                    $returnData1 = array(
                        'error' => false,
                        'message' => 'Login Succesfull!',
                        'body'=> $user
                    );
                    return response()->json($returnData1,200);
                }
                //return response()->json($user,200);
            
            }

    }


    public function getUserById($Id){

                $user = DB::table('appusers')
                ->select('appusers.Id as Customer_Id','appusers.fullname as Fullname','appusers.contact'
                ,'appusers.local_Address','appusers.City', 'appusers.Country'
                ,'appusers.email','appusers.image','appusers.imageUrl')
                ->where('appusers.Id','=',$Id)
                ->where('appusers.deleted','=','0')
                ->get();
        
                return response()->json($user,200);

    }

    public function getAllUser(){
        $user = DB::table('appusers')
                ->select('appusers.Id','appusers.fullname','appusers.contact'
                ,'appusers.local_Address','appusers.City', 'appusers.Country'
                ,'appusers.email','appusers.image','appusers.imageUrl')
                //->where('appusers.Id','=',$Id)
                //->where('appusers.deleted','=','0')
                ->get();
        
                return response()->json($user,200);
    }

    public function checkUser($email){
        $user = DB::table('appusers')
        ->select('appusers.Id as Customer_Id','appusers.fullname as Fullname','appusers.contact'
        ,'appusers.local_Address','appusers.City', 'appusers.Country'
        ,'appusers.email','appusers.image','appusers.imageUrl')
        ->where('appusers.email','=',$email)
        //->where('appusers.deleted','=','0')
        ->limit(1)
        ->get();

        return response()->json($user,200);
    }

    public function updateUser(Request $request,$Id){
        //$brand = Brands_Model::find($Id); 
        $user = AppUser_Model::find($Id);
        
        $rules = [
            'fullname' => 'nullable|min:4',
            'contact' => 'nullable|numeric|unique:appusers,contact|min:11',
            'local_Address'=>'nullable|max:255',
            'City' =>'nullable|numeric|between:0,999999.99999999999999999999',
            'Country' =>'nullable|numeric|between:0,999999.99999999999999999999',
            'email'=>'nullable|email|unique:appusers,email|max:255',
            'pass'=>'nullable|alpha_num|min:8|max:255',

        ];
        $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails()){
            return response()->json($validator->errors(),400);
            }
            else{
                    
                    $user->fullname=$request->fullname;
                    $user->contact=$request->contact;
                    $user->email=$request->email;
                    $user->pass=$request->pass;

                    if($request->hasfile('image')){
                        $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$user->email.'_'.$Id.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $user->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $user->image =$filename;
                    }
                    
                  if($user->save()) {
                    return response()->json($user, 201);
                  } else{
                    return response()->json('Updatation Failed',400);
                  }
            
            }
    }

    public function uploadImage(Request $request,$Id){
        //$brand = Brands_Model::find($Id); 
        $user = AppUser_Model::find($Id);
        

                    if($request->hasfile('image')){
                        $file=$request->file('image');
                        $extension = $file->getClientOriginalExtension();
                        $filename=$user->email.'_'.$Id.'_'.time().'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $user->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $user->image =$filename;
                        $user->update();
                        return response()->json($user, 201);

                    }
                 
    }

    public function uploadProfileImage(Request $request,$Id){
        //$brand = Brands_Model::find($Id); 
        $user = AppUser_Model::find($Id);
        //$image = $request->image;

       // $image = str_replace('data:image/jpeg/png;base64,', '', $image);
      //  $image = str_replace(' ', '+', $image);
        
        //$filename=$user->email.'_'.$user->Id.'_'.time().'.'.'jpg';
       // $image->move('uploads/images/',$filename);
        
       // $image = base64_decode($request->image);
       // $fp = fopen('uploads/images/','wb+');
      //  fwrite($fp,$image);
       // fclose($fp);
        

       $image = $request->image;  // your base64 encoded
       $image = str_replace('data:image/jpeg;base64,', '', $image);
       $image = str_replace(' ', '+', $image);
       $filename=$user->email.'_'.$user->Id.'_'.time().'.'.'jpg';
       \File::put('uploads/images/' . $filename, base64_decode($image));
        
        
        
        $user->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
        $user->image =$filename;
       
        $user->update();
        return response()->json($user, 201);

    /*
                    if($request->hasfile('image')){
                        $file=$request->file('image');
                        //$file = $request->image;
                        $extension = $file->getClientOriginalExtension();
                        $filename=$user->email.'_'.$user->Id.'_'.time();//.'.'.$extension;
                        $file->move('uploads/images/',$filename);
                        $user->imageUrl ='http://localhost:8000/uploads/images/'.$filename;
                        $user->image =$filename;
                        $user->update();
                        return response()->json($user, 201);

                    }*/
                 
    }

    public function UpdateUserAddress(Request $request,$Id){
        
        $user = AppUser_Model::find($Id);
        
        $user->local_Address=$request->local_Address;
        $user->City=$request->City;
        $user->Country=$request->Country;
        
        $user->update();
        return response()->json($user, 201);
     
    }

    public function UpdatePassword(Request $request,$Id){
        
        $user = AppUser_Model::find($Id);
        
        $user->pass=$request->pass;
        
        $user->update();
        return response()->json($user, 201);
     
    }

//////////////////////////////// End Android Api  ////////////////////

}
