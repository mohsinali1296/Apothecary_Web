<?php

namespace App\Http\Controllers\Ratings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ratings\Ratings_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class Ratings_Controller extends Controller
{
    public function AddUserRatingForPharmacy(Request $request){

        $rules = [
            'Pharm_Id' => 'required|numeric',
            'User_Id' => 'required|numeric',
            'rating'=>'required|numeric', 
        ];

        $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails()){
           
                return response()->json($validator->errors(),202);

            }
            else{
                    $Rating = new Ratings_Model();
                    $Rating->Pharm_Id=$request->Pharm_Id;
                    $Rating->User_Id=$request->User_Id;
                    $Rating->rating=$request->rating;

                  if($Rating->save()) {
                    return response()->json($Rating, 201);
                  }
            
            }
    }

    public function getPharmaryRating_ByPharmId($pharmId){

       
        $rating1 = DB::query()
       ->select('r1.Pharm_Id','r1.rating1')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as rating1 from ratings as r
            where( r.rating = 1) and r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');

        $rating2 = DB::query()
       ->select('r1.Pharm_Id','r1.rating2')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as rating2 from ratings as r
            where( r.rating = 2) and r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');
        
        $rating3 = DB::query()
       ->select('r1.Pharm_Id','r1.rating3')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as rating3 from ratings as r
            where( r.rating = 3) and r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');

        $rating4 = DB::query()
       ->select('r1.Pharm_Id','r1.rating4')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as rating4 from ratings as r
            where( r.rating = 4) and r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');

        $rating5 = DB::query()
       ->select('r1.Pharm_Id','r1.rating5')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as rating5 from ratings as r
            where( r.rating = 5) and r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');

        $ratingsum = DB::query()
       ->select('r1.Pharm_Id','r1.ratingsum')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            count(r.rating)as ratingsum from ratings as r
            where r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');

        $ratingavg = DB::query()
       ->select('r1.Pharm_Id','r1.ratingavg')//,'r2.rating2')
        ->fromSub(function ($query){
            $query->select(DB::raw("r.Pharm_Id,
            avg(r.rating)as ratingavg from ratings as r
            where r.Pharm_Id=? Group By r.Pharm_Id"),);         
        },'r1') 
        ->setBindings([$pharmId],'where');
        

        
        $result = DB::query()
        ->select( 'avg.*','sum.ratingsum','r5.rating5','r4.rating4'
        ,'r3.rating3','r2.rating2','r1.rating1')
        ->fromSub($ratingavg,'avg')
        ->joinSub($ratingsum,'sum','avg.Pharm_Id','=','sum.Pharm_Id')
        ->joinSub($rating5,'r5','avg.Pharm_Id','=','r5.Pharm_Id')
        ->joinSub($rating4,'r4','avg.Pharm_Id','=','r4.Pharm_Id')
        ->joinSub($rating3,'r3','avg.Pharm_Id','=','r3.Pharm_Id')
        ->joinSub($rating2,'r2','avg.Pharm_Id','=','r2.Pharm_Id')
        ->joinSub($rating1,'r1','avg.Pharm_Id','=','r1.Pharm_Id')
        ->get();

        return response()->json($result,200);

    }

    public function getAverageRatings(){

        $ratingavg = DB::query()
        ->select('r1.Pharm_Id','r1.ratingavg')//,'r2.rating2')
         ->fromSub(function ($query){
             $query->select(DB::raw("r.Pharm_Id,
             avg(r.rating)as ratingavg from ratings as r
              Group By r.Pharm_Id"),);         
         },'r1')->get();

         return response()->json($ratingavg,200);

    }

    public function checkRatingByUserId($userId){

        $rating = DB::table('ratings')
        ->select('ratings.*')
        ->where('ratings.User_Id','=',$userId)
        ->get();
        return response()->json($rating,200);

    }

}
