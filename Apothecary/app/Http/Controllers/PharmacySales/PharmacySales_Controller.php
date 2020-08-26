<?php

namespace App\Http\Controllers\PharmacySales;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacySales\PharmacySales_Model;
use App\Models\Stocks\Stocks_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;
use Carbon\Carbon;

class PharmacySales_Controller extends Controller
{


	//-------------------------------------Web API-----------------------------------------------------//

	
   public function SaleInsertion(Request $request)
    {
         $Pharmacysales = new PharmacySales_Model();


          $rules = [
           
            'Pharm_Id'=>'required|numeric',
            'Customer_Id'=>'required|numeric',
            'Employee_Id'=>'required|numeric',
            'Actual_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            'Discount'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
            'Payed'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
            //'Order_Date'=>'nullable|date'


          ];

          $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails())
        {
             return response()->json($validator->errors(),202);
             
        }
            
        else{


    $Pharmacysales->Id =$request->Id;
    $Pharmacysales->Pharm_Id =$request->Pharm_Id;
    $Pharmacysales->Customer_Id = $request->Customer_Id;
    $Pharmacysales->Employee_Id = $request->Employee_Id;
    $Pharmacysales->Actual_Amount = $request->Actual_Amount;
    $Pharmacysales->Discount = $request->Discount;
    $Pharmacysales->Total_Amount = $Pharmacysales->Actual_Amount-$Pharmacysales->Discount;
    $Pharmacysales->Payed = $request->Payed;
    //$Pharmacysales->Order_Date = $request->Order_Date;
            


                 if($Pharmacysales->save())
                  {
                  return response()->json($Pharmacysales,201);
                  }

             }


    }



 
    public function show($Pharm_id)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->paginate(25);
         return response()->json($Pharmacysales,200);
    }

    public function TodaySales($Pharm_id)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->whereDate('pharmacysales.Order_Date', Carbon::today())
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function PastWeekSales($Pharm_id)
    {

     $previous_week = strtotime("-1 week +1 day");
     $start_week = strtotime("last sunday midnight",$previous_week);
     $end_week = strtotime("next saturday",$start_week);
     $start_week = date("Y-m-d",$start_week);
     $end_week = date("Y-m-d",$end_week);

       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->whereBetween('pharmacysales.Order_Date', [$start_week, $end_week])
         //->whereRaw('pharmacysales.Order_Date >= DATE(NOW()) - INTERVAL 7 DAY')
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function Past_7Days_Sales($Pharm_id)
    {

       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->where('pharmacysales.Order_Date','>=',Carbon::now()->subdays(7))
         //->whereRaw('pharmacysales.Order_Date >= DATE(NOW()) - INTERVAL 7 DAY')
         ->get();
         return response()->json($Pharmacysales,200);
    }


    

    public function CurrentMonthSales($Pharm_id)
    {
          $currentMonth = date('m');
          $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->whereRaw('MONTH(pharmacysales.Order_Date) = ?',[$currentMonth])
         ->get();
         return response()->json($Pharmacysales,200);
    }


    /*
    $current_week = User::
    whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();
    */

    public function CurrentWeekSales($Pharm_id)
    {
          $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         //->whereRaw('MONTH(pharmacysales.Order_Date) = ?',[$currentMonth])
         ->whereBetween('pharmacysales.Order_Date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function CurrentYearSales($Pharm_id)
    {
          $currentYear = date('Y');
          $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"),
         DB::raw("YEAR(pharmacysales.Order_Date) as year"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         //->groupBy('year')
         ->whereRaw('YEAR(pharmacysales.Order_Date) = ?',[$currentYear])
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function SalesByDate($Pharm_id,$date)
    {
          $currentMonth = date('m');
          $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->whereRaw('date(pharmacysales.Order_Date) = ?',[$date])
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function GraphSalesByMonthThisYear($Pharm_id){
     $Pharmacysales= PharmacySales_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("MONTHNAME(Order_Date) as monthname"))
     ->whereYear('Order_Date',date('Y'))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('monthname')
     ->get();
     return response()->json($Pharmacysales,200);
    }

    public function GraphSalesByDaysThisWeek($Pharm_id){
     $Pharmacysales= PharmacySales_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("DAYNAME(Order_Date) as dayname"))
     ->whereBetween('Order_Date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
     ->whereYear('Order_Date',date('Y'))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('dayname')
     ->get();
     return response()->json($Pharmacysales,200);
    }

    public function GraphSalesByYearWise($Pharm_id){
     $Pharmacysales= PharmacySales_Model::select(DB::raw("(COUNT(*)) as count"),DB::raw("SUM(Total_Amount) as Sum_Total_Amount")
     ,DB::raw("YEAR(Order_Date) as year"))
     //->whereBetween('Order_Date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
     //->whereYear('Order_Date',date('Y'))
     ->where('Pharm_Id','=',$Pharm_id)
     ->groupBy('year')
     ->get();
     return response()->json($Pharmacysales,200);
    }

    public function SearchSaleById($Pharm_id,$saleId)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.Id','=',$saleId)
         ->where('pharmacysales.deleted', '=','0')
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function SearchSaleByDate($Pharm_id,$date)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.Order_Date','=',$date)
         ->where('pharmacysales.deleted', '=','0')
         ->get();
         return response()->json($Pharmacysales,200);
    }

/*
    public function edit(PharmacySales_Model $PharmacySales_Model,$id)
    {
        $Pharmacysales= PharmacySales_Model::find($id);
        return response()->json($Pharmacysales,200);
    }

    public function update(Request $request,$id)
    {
        
         $rules = [


    'Actual_Amount'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
    'Discount'=>'nullable|numeric|between:0,9999999999999999.99999999999999999999',
    'payed'=>'required|numeric|between:0,9999999999999999.99999999999999999999',
    'Order_Date'=>'nullable|date'


                 ];

          $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails())
        {
             return response()->json($validator->errors(),202);
             
        }
            
        else
        {

            $Pharmacysales= PharmacySales_Model::find($id);
            $Pharmacysales->Actual_Amount = $request->Actual_Amount;
            $Pharmacysales->Discount = $request->Discount;
            $Pharmacysales->Total_Amount = $Pharmacysales->Actual_Amount-$Pharmacysales->Discount;
            $Pharmacysales->Payed = $request->Payed;
            $Pharmacysales->Order_Date = $request->Order_Date;


         
           $Pharmacysales->update();    
       
           return response()->json($Pharmacysales,201);




         }
    }

    public function destroy($id)
    {
        $Pharmacysales = PharmacySales_Model::find($id);
        $Pharmacysales->deleted='1';   
        $Pharmacysales->update();
        return response()->json($Pharmacysales,201);   
     }

*/
     //-------------------------------------Web API-----------------------------------------------------//
}
