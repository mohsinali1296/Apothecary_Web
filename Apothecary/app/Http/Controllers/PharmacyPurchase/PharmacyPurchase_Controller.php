<?php

namespace App\Http\Controllers\PharmacyPurchase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacyPurchase\PharmacyPurchase_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;

class PharmacyPurchase_Controller extends Controller
{
    //-------------------------------------Web API-----------------------------------------------------//

    public function PurchaseInsertion(Request $request)
    {
       
        $Purchase = new PharmacyPurchase_Model();

        $rules = [
                    //'Pharm_Id'=>'required|numeric|gte:1|gte:1',
                    //'Employee_Id'=>'required|numeric|gte:1',
                    'Actual_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'Discount'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
                    'Total_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'payed'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'Due'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
                    'Purchase_Date'=>'nullable|date',
                    'Distributor_Id'=>'required|numeric|gte:1',
             ];
   

            $validator = Validator::make($request->all(),$rules);
             if($validator->fails())
             {
             return response()->json($validator->errors(),202);
             }
          
          else{

           $Purchase->Pharm_Id =$request->Pharm_Id;
           $Purchase->Employee_Id =$request->Employee_Id;
           $Purchase->Actual_Amount = $request->Actual_Amount;
           $Purchase->Discount =$request->Discount;
           $Purchase->Total_Amount = $request->Actual_Amount-$request->Discount;
           $Purchase->payed = $request->payed;
           $Purchase->Due = $Purchase->Total_Amount-$request->payed;
           $Purchase->Purchase_Date = $request->Purchase_Date;
           $Purchase->Distributor_Id = $request->Distributor_Id;


            if($Purchase->save())
            {
            return response()->json($Purchase,201);
            }



           }
    }
   
    public function show($Pharm_id)
    {
        
        $Purchase= DB::table('purchase')

         ->select('purchase.Id as Purchase_Id'
          ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
          ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
          ,'distributors.Name as Distributor_Name'
          ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
          DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
        
         ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
         ->join('employee','purchase.Employee_Id','=','employee.Id')
         ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
         ->where('purchase.Pharm_Id','=',$Pharm_id)
         ->where('purchase.deleted', '=','0')
         ->where('pharmacy.deleted', '=','0')
         ->paginate(25);
         return response()->json($Purchase,200);
    }

    


/*
    public function edit(PharmacyPurchase_Model $purchase,$id)
    {
         $Purchase= PharmacyPurchase_Model::find($id);
        return response()->json($Purchase,200);
    }
 
   public function update(Request $request,$id)
    {

         $rules = [
                    'Actual_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'Discount'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
                    'Total_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'payed'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
                    'Due'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
                    'Purchase_Date'=>'nullable|date'
                    ];

          $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails())
        {
             return response()->json($validator->errors(),202);
             
        }
            
        else{
           

           $Purchase= PharmacyPurchase_Model::find($id);
           $Purchase->Actual_Amount = $request->Actual_Amount;
           $Purchase->Discount =$request->Discount;
           $Purchase->Total_Amount = $request->Actual_Amount-$request->Discount;
           $Purchase->payed = $request->payed;
           $Purchase->Due = $Purchase->Total_Amount-$request->payed;
           $Purchase->Purchase_Date = $request->Purchase_Date;
           $Purchase->update();    
       
           return response()->json($Purchase,201);

        }
    }
   
    public function destroy($id)
    {
        $Purchase = PharmacyPurchase_Model::find($id);
        $Purchase->deleted='1';   
        $Purchase->update();
        return response()->json($Purchase,201);
    }
*/


public function TodayPurchase($Pharm_id)
    {
         $Purchase= DB::table('purchase')

         ->select('purchase.Id as Purchase_Id'
          ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
          ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
          ,'distributors.Name as Distributor_Name'
          ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
          DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
        
         ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
         ->join('employee','purchase.Employee_Id','=','employee.Id')
         ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
         ->where('purchase.Pharm_Id','=',$Pharm_id)
         ->where('purchase.deleted', '=','0')
         ->where('pharmacy.deleted', '=','0')
         ->whereDate('purchase.Purchase_Date', Carbon::today())
         ->get();
         return response()->json($Purchase,200);

    }

    public function PastWeekPurchase($Pharm_id)
    {

     $previous_week = strtotime("-1 week +1 day");
     $start_week = strtotime("last sunday midnight",$previous_week);
     $end_week = strtotime("next saturday",$start_week);
     $start_week = date("Y-m-d",$start_week);
     $end_week = date("Y-m-d",$end_week);

     $Purchase= DB::table('purchase')

     ->select('purchase.Id as Purchase_Id'
      ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
      ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
      ,'distributors.Name as Distributor_Name'
      ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
      DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
    
     ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
     ->join('employee','purchase.Employee_Id','=','employee.Id')
     ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
     ->where('purchase.Pharm_Id','=',$Pharm_id)
     ->where('purchase.deleted', '=','0')
     ->where('pharmacy.deleted', '=','0')
         ->whereBetween('purchase.Purchase_Date', [$start_week, $end_week])
         //->whereRaw('pharmacysales.Order_Date >= DATE(NOW()) - INTERVAL 7 DAY')
         ->get();
         return response()->json($Purchase,200);
    }

    public function Past_7Days_Purchase($Pharm_id)
    {

        $Purchase= DB::table('purchase')

        ->select('purchase.Id as Purchase_Id'
         ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,'distributors.Name as Distributor_Name'
         ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
       
        ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
        ->join('employee','purchase.Employee_Id','=','employee.Id')
        ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
        ->where('purchase.Pharm_Id','=',$Pharm_id)
        ->where('purchase.deleted', '=','0')
        ->where('pharmacy.deleted', '=','0')
         ->where('purchase.Purchase_Date','>=',Carbon::now()->subdays(7))
         //->whereRaw('pharmacysales.Order_Date >= DATE(NOW()) - INTERVAL 7 DAY')
         ->get();
         return response()->json($Purchase,200);
    }


    

    public function CurrentMonthPurchase($Pharm_id)
    {
          $currentMonth = date('m');
          $Purchase= DB::table('purchase')

        ->select('purchase.Id as Purchase_Id'
         ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,'distributors.Name as Distributor_Name'
         ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
       
        ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
        ->join('employee','purchase.Employee_Id','=','employee.Id')
        ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
        ->where('purchase.Pharm_Id','=',$Pharm_id)
        ->where('purchase.deleted', '=','0')
        ->where('pharmacy.deleted', '=','0')
         ->whereRaw('MONTH(purchase.Purchase_Date) = ?',[$currentMonth])
         ->get();
         return response()->json($Purchase,200);
    }


    /*
    $current_week = User::
    whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();
    */

    public function CurrentWeekPurchase($Pharm_id)
    {
        $Purchase= DB::table('purchase')

        ->select('purchase.Id as Purchase_Id'
         ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,'distributors.Name as Distributor_Name'
         ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
       
        ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
        ->join('employee','purchase.Employee_Id','=','employee.Id')
        ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
        ->where('purchase.Pharm_Id','=',$Pharm_id)
        ->where('purchase.deleted', '=','0')
        ->where('pharmacy.deleted', '=','0')
         //->whereRaw('MONTH(pharmacysales.Order_Date) = ?',[$currentMonth])
         ->whereBetween('purchase.Purchase_Date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
         ->get();
         return response()->json($Purchase,200);
    }
    
    public function CurrentYearPurchase($Pharm_id)
    {
          $currentYear = date('Y');
          $Purchase= DB::table('purchase')

        ->select('purchase.Id as Purchase_Id'
         ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,'distributors.Name as Distributor_Name'
         ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"),
         DB::raw("YEAR(purchase.Purchase_Date) as year")
         )
       
        ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
        ->join('employee','purchase.Employee_Id','=','employee.Id')
        ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
        ->where('purchase.Pharm_Id','=',$Pharm_id)
        ->where('purchase.deleted', '=','0')
        ->where('pharmacy.deleted', '=','0')
         //->groupBy('year')
         ->whereRaw('YEAR(purchase.Purchase_Date) = ?',[$currentYear])
         ->get();
         return response()->json($purchase,200);
    }

    public function PurchaseByDate($Pharm_id,$date)
    {
          $currentMonth = date('m');
          $Purchase= DB::table('purchase')

        ->select('purchase.Id as Purchase_Id'
         ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,'distributors.Name as Distributor_Name'
         ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time")
         )
       
        ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
        ->join('employee','purchase.Employee_Id','=','employee.Id')
        ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
        ->where('purchase.Pharm_Id','=',$Pharm_id)
        ->where('purchase.deleted', '=','0')
        ->where('pharmacy.deleted', '=','0')
         ->whereRaw('date(purchase.Purchase_Date) = ?',[$date])
         ->get();
         return response()->json($Purchase,200);
    }

    public function GraphPurchaseByMonthThisYear($Pharm_id){
     $Purchase= PharmacyPurchase_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("MONTHNAME(Purchase_Date) as monthname"))
     ->whereYear('Purchase_Date',date('Y'))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('monthname')
     ->get();
     return response()->json($Purchase,200);
    }

    public function GraphPurchaseByDaysThisWeek($Pharm_id){
     
     $Purchase= PharmacyPurchase_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("DAYNAME(Order_Date) as dayname"))
     ->whereYear('Purchase_Date',date('Y'))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('dayname')
     ->get();
     return response()->json($Purchase,200);

    }

    public function GraphPurchaseByYearWise($Pharm_id){
        $Purchase= PharmacyPurchase_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("YEAR(Purchase_Date) as year"))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('year')
     ->get();
     return response()->json($Purchase,200);
    }



    //-------------------------------------Web API-----------------------------------------------------//
}
