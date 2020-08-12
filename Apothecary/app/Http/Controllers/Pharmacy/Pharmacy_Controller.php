<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pharmacy\Pharmacy_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Pharmacy_Controller extends Controller
{
    //---------------------------------------Android API----------------------------------------------------//

    public function viewPage(){
        return view('ApiViews\pharmacy');
    }

    public function savePharmacy(Request $request){
        
        $pharmacy = new Pharmacy_Model();

        $rules = [
            'Pharm_Name' => 'required|min:4',
            'Contact' => 'required|numeric|unique:pharmacy,Contact|min:11',
            'Pharmacy_Address'=>'required|max:255',
            'Latitude' =>'required|numeric|between:0,999999999.99999999999999999999',
            'Longitude' =>'required|numeric|between:0,999999999.99999999999999999999',
            'email'=>'required|email|unique:pharmacy,email|max:255',
            'pass'=>'required|alpha_num|min:8|max:255',

        ];
        $validator = Validator::make($request->all(),$rules);
        //$validator2 = $request->validate([
        //    'Latitude' => ['required', new Decimal],
        //    'Longitude' => ['required' ,new Decimal],
       // ]);
        if($validator->fails()){
            //return $validator->errors();
            return response()->json($validator->errors(),202);
            }
            else{
                    $pharmacy->Pharm_Name=$request->input('Pharm_Name');
                    $pharmacy->Contact=$request->input('Contact');
                    $pharmacy->Pharmacy_Address=$request->input('Pharmacy_Address');
                    $pharmacy->Latitude=$request->input('Latitude');
                    $pharmacy->Longitude=$request->input('Longitude');
                    $pharmacy->email=$request->input('email');
                    $pharmacy->pass=$request->input('pass');
                    
                    $pharmacy->save();
            //return view('ApiViews\pharmacy')->with('pharmacy',$pharmacy);
            return response()->json($pharmacy,201);

            }
    }


    public function getAllPharmacyWithDistance($lat,$long){

        $data = DB::query()
       ->select('p1.Id as Pharmacy_Id','p1.Pharm_Name as Pharmacy_Name','p1.distance as Pharmacy_Distance'
       ,'p1.Latitude as Pharmacy_Latitude','p1.Longitude as Pharmacy_Longitude','p1.Contact as Pharmacy_Contact'
       ,'p1.Pharmacy_Address as Pharmacy_Address','p1.email as Pharmacy_Email'
       )
        ->fromSub(function ($query){
                $query
                ->select(
                    DB::raw("p.*,
                    ( (
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
                    ))
                as distance from pharmacy as p
                    "),//["lat"=>$lat,"lat_i"=>$lat,"lng"=>$lng]
                    //[$lat, $lat, $long]
                     );
                //->setBindings([$lat, $lat, $long])
                
        },'p1')
        //->where('p1.distance','<=','10')
        ->setBindings([$lat, $lat, $long],'select');
        

        $pharmacy = DB::table('pharmacy')
        ->select('pharmacy.Id','pharmacy.Pharm_Name','pharmacy.Contact','pharmacy.Pharmacy_Address',
        'pharmacy.email','pharmacy.Latitude','pharmacy.Longitude','pharmacy.image','pharmacy.imageUrl')
        ->where('pharmacy.deleted','=','0')
        ->orderBy('pharmacy.Pharm_Name');

        $ratingavg = DB::query()
        ->select('r1.Pharm_Id as PharmacyId','r1.ratingavg as Average_Rating')//,'r2.rating2')
         ->fromSub(function ($query){
             $query->select(DB::raw("r.Pharm_Id,
             avg(r.rating)as ratingavg from ratings as r
              Group By r.Pharm_Id"),);         
         },'r1');



        $result = DB::query()
        ->select( 'pharmacy.*','data.Pharmacy_Distance','ratingavg.Average_Rating')
        ->fromSub($pharmacy,'pharmacy')
        ->leftJoinSub($ratingavg,'ratingavg','pharmacy.Id','=','ratingavg.PharmacyId')
        ->joinSub($data,'data','pharmacy.Id','=','data.Pharmacy_Id')
        ->orderBy('data.Pharmacy_Distance')
        ->orderBy('pharmacy.Pharm_Name')
        ->paginate(15);


        return response()->json($result,200);
    }

    public function getAllPharmacy(){



        $pharmacy = DB::table('pharmacy')
        ->select('pharmacy.Id','pharmacy.Pharm_Name','pharmacy.Contact','pharmacy.Pharmacy_Address',
        'pharmacy.email','pharmacy.Latitude','pharmacy.Longitude')
        ->where('pharmacy.deleted','=','0')
        ->orderBy('pharmacy.Pharm_Name')
        ->paginate(5);

        return response()->json($pharmacy,200);
    }

    public function getAllPharmacies(){
        $pharmacy = DB::table('pharmacy')
        ->select('pharmacy.Id','pharmacy.Pharm_Name','pharmacy.Contact','pharmacy.Pharmacy_Address',
        'pharmacy.email','pharmacy.Latitude','pharmacy.Longitude')
        ->where('pharmacy.deleted','=','0')
        ->orderBy('pharmacy.Pharm_Name')
        ->get();

        return response()->json($pharmacy,200);
    }

    public function nearestPharmacies($lat,$long){

       // $lat = 31.528808;
       // $long = 74.368788 ;

       $data = DB::query()
       ->select('p1.Id as Pharmacy_Id','p1.Pharm_Name as Pharmacy_Name','p1.distance as Pharmacy_Distance'
       ,'p1.Latitude as Pharmacy_Latitude','p1.Longitude as Pharmacy_Longitude','p1.Contact as Pharmacy_Contact'
       ,'p1.Pharmacy_Address as Pharmacy_Address','p1.email as Pharmacy_Email'
       )
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
                     );
                //->setBindings([$lat, $lat, $long])
                
        },'p1')
        //->where('p1.distance','<=','10')
        ->setBindings([$lat, $lat, $long],'select');
        
        $pharmacy = DB::query()
        ->select( 'data.*')
        ->fromSub($data,'data')
        ->get();

        //return response()->json($data,200);
        return response()->json($pharmacy,200);
        
    }


    public function getPharmacy(){

        $rating =  DB::table('ratings')
                        ->select('ratings.*')
                        ->avg('rating')->get();


                        return response()->json($rating,200);



    }

    public function getAllPharmacyWithDistance2($lat,$long){

        $data = DB::query()
       ->select('p1.Id as Pharmacy_Id','p1.Pharm_Name as Pharmacy_Name','p1.distance as Pharmacy_Distance'
       ,'p1.Latitude as Pharmacy_Latitude','p1.Longitude as Pharmacy_Longitude','p1.Contact as Pharmacy_Contact'
       ,'p1.Pharmacy_Address as Pharmacy_Address','p1.email as Pharmacy_Email'
       )
        ->fromSub(function ($query){
                $query
                ->select(
                    DB::raw("p.*,
                    (
                        6371 * acos (
                        cos ( radians(?) )
                        * cos( radians( p.Latitude ) )
                        * cos( radians( p.Longitude ) - radians(?) )
                        + sin ( radians(?) )
                        * sin( radians( p.Latitude ) )
                      )
                  ) 
                as distance from pharmacy as p
                    "),//["lat"=>$lat,"lat_i"=>$lat,"lng"=>$lng]
                    //[$lat, $lat, $long]
                     );
                //->setBindings([$lat, $lat, $long])
                
        },'p1')
        //->where('p1.distance','<=','10')
        ->setBindings([$lat, $lat, $long],'select');
        

        $pharmacy = DB::table('pharmacy')
        ->select('pharmacy.Id','pharmacy.Pharm_Name','pharmacy.Contact','pharmacy.Pharmacy_Address',
        'pharmacy.email','pharmacy.Latitude','pharmacy.Longitude','pharmacy.image','pharmacy.imageUrl')
        ->where('pharmacy.deleted','=','0')
        ->orderBy('pharmacy.Pharm_Name');

        $ratingavg = DB::query()
        ->select('r1.Pharm_Id as PharmacyId','r1.ratingavg as Average_Rating')//,'r2.rating2')
         ->fromSub(function ($query){
             $query->select(DB::raw("r.Pharm_Id,
             avg(r.rating)as ratingavg from ratings as r
              Group By r.Pharm_Id"),);         
         },'r1');



        $result = DB::query()
        ->select( 'pharmacy.*','data.Pharmacy_Distance','ratingavg.Average_Rating')
        ->fromSub($pharmacy,'pharmacy')
        ->leftJoinSub($ratingavg,'ratingavg','pharmacy.Id','=','ratingavg.PharmacyId')
        ->joinSub($data,'data','pharmacy.Id','=','data.Pharmacy_Id')
        ->orderBy('data.Pharmacy_Distance')
        ->orderBy('pharmacy.Pharm_Name')
        ->paginate(5);


        return response()->json($result,200);
    }

    //---------------------------------------Android API----------------------------------------------------//

    //------------------------------------------------------------------------------------------------------//


    //---------------------------------------WEB API----------------------------------------------------//

    public function PharmacyRegistration (Request $request)
    {

        $pharmacy = new Pharmacy_Model();

        $rules = [
            'Pharm_Name' => 'required|min:4',
            'Contact' => 'required|numeric|unique:pharmacy,Contact|min:11',
            'Pharmacy_Address'=>'required|max:255',
            'Latitude' =>'required|numeric|between:0,999999999.99999999999999999999',
            'Longitude' =>'required|numeric|between:0,999999999.99999999999999999999',
            'email'=>'required|email|unique:pharmacy,email|max:255',
            'pass'=>'required|alpha_num|min:8|max:255',

        ];
        $validator = Validator::make($request->all(),$rules);
        //$validator2 = $request->validate([
        //    'Latitude' => ['required', new Decimal],
        //    'Longitude' => ['required' ,new Decimal],
       // ]);
        if($validator->fails()){
            //return $validator->errors();
            return response()->json($validator->errors(),202);
            }
            else{
                    $pharmacy->Pharm_Name=$request->input('Pharm_Name');
                    $pharmacy->Contact=$request->input('Contact');
                    $pharmacy->Pharmacy_Address=$request->input('Pharmacy_Address');
                    $pharmacy->Latitude=$request->input('Latitude');
                    $pharmacy->Longitude=$request->input('Longitude');
                    $pharmacy->email=$request->input('email');
                    $pharmacy->pass=$request->input('pass');

        if ($request->hasfile('image'))
         {
          
        $file=$request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = $pharmacy->Pharm_Name.'_'.time().'.'.$extension;
                
        $file->move('uploads/images/',$filename);
        $pharmacy->imageUrl ='http://localhost/Apothecary/public/uploads/images/'.$filename;
        $pharmacy->image =$filename;
                   
        
        }  
           else 
            {
                
                $pharmacy->image='no_image_available.png';
                $pharmacy->imageUrl='http://localhost:8000/uploads/images/no-image-available.png';
                        
            }  


                    
                    $pharmacy->save();
            //return view('ApiViews\pharmacy')->with('pharmacy',$pharmacy);
            return response()->json($pharmacy,201);

            }
       
    }

    public function show($pharm_id)
    {
        $pharmacy= DB::table('pharmacy')
         ->select(DB::raw("CONCAT('PHARM-',pharmacy.Id) as Pharm_Id"),'Id','Pharm_Name','Contact','Pharmacy_Address','Latitude','Longitude','email')

         ->where('Id','=',$pharm_id)
         ->where('deleted', '=','0')
         ->get();

         return response()->json($pharmacy,200);
    }


    public function login(Request $request)
    {

        $rules=[

            'email'=>'required|String',
            'pass'=>'required|alpha_num|min:8|max:255'
                        
          ];  
       
       $validator = Validator::make($request->all(),$rules);


        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else{


            $data= DB::table('pharmacy')
            ->select('Id','Pharm_Name','Contact','Pharmacy_Address','Latitude','Longitude','email')
            ->where('email','=',$request->email)
            ->where('pass', '=', $request->pass)
            ->first();

            
           // return response()->json($response,201);

             if($data==NULL){
                    // $returnData = array(
                    //     'status' => 'error',
                    //     'message' => 'No such User. Please SignUp to Continue'
                    // );
                   
                    return response()->json($data,204);
                }
                
                $response= ['data'=>[ 'id' =>$data->Id,'name' =>$data->Pharm_Name]];
                return response()->json($response,201);
            
              }
    
    }

    public function edit(Pharmacy_Model $pharmacy,$id)
    {
        $pharmacy= Pharmacy_Model::find($id);
        return response()->json($pharmacy,200);
    }

        
    public function update(Request $request,$id)
    {
        
        $rules = [
            'Pharm_Name' => 'required|min:4',
            'Contact' => 'required|numeric|unique:pharmacy,Contact|min:11',
            'Pharmacy_Address'=>'required|max:255',
            'Latitude'=>'required|numeric|between:0,999999.9999999999999999999',
            'Longitude'=>'required|numeric|between:0,999999.9999999999999999999',
            'email'=>'required|email|unique:pharmacy,email|max:255',
            'pass'=>'required|alpha_num|min:8|max:255',
            'image'=>'required|image',
            'imageUrl'=>'required'

        ];
        $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
            
        else
        {
       

        $pharmacy= Pharmacy_Model::find($id);
        $pharmacy->Pharm_Name = $request->Pharm_Name;
        $pharmacy->Contact = $request->Contact;
        $pharmacy->Pharmacy_Address = $request->Pharmacy_Address;
        $pharmacy->Latitude = $request->Latitude;
        $pharmacy->Longitude = $request->Longitude;
        $pharmacy->email = $request->email;
        $pharmacy->pass = $request->pass;
           
        
        //if ($request->hasfile('image'))
        if ($request->image!=NULL)
         {
          
        $file=$request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = $pharmacy->Pharm_Name.'_'.$pharmacy->Pharm_Id.'_'.time().'.'.$extension;
                
        $file->move('uploads/images/',$filename);
        $pharmacy->imageUrl ='http://localhost/Apothecary/public/uploads/images/'.$filename;
        $pharmacy->image =$filename;
                   
        
        }  
        else 
            {
                
                $pharmacy->image='no_image_available.png';
                $pharmacy->imageUrl='http://localhost:8000/uploads/images/no-image-available.png';

                        
            }  


         if($pharmacy->update())
          {
            return response()->json($pharmacy,201);
              
          }

        }
    }

    public function destroy($id)
    {
        $pharmacy = Pharmacy_Model::find($id);
        $pharmacy->deleted='1';   
        $pharmacy->update();
        return response()->json($pharmacy,201);
    }


    //---------------------------------------WEB API----------------------------------------------------//

    
  }