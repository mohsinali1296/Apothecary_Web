<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PharmacySales\PharmacySales_Model;
use App\Models\PharmacyPurchase\PharmacyPurchase_Model;
use App\Models\PharmacyPurchaseReturn\PharmacyPurchaseReturn_Model;
use App\Models\PharmacySalesReturn\PharmacySalesReturn_Model;
use App\Models\UserOrderDetails\UserOrderDetails_Model;
use App\Models\Stocks\Stocks_Model;
use App\Models\Employee\Employee_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;
use Carbon\Carbon;

class Reports_Controller extends Controller
{
    
    public function SalesReportThisYear($Pharm_id){
        $Pharmacysales= PharmacySales_Model::select(DB::raw("SUM(Total_Amount) as Sales_Sum_Total_Amount")
        ,DB::raw("YEAR(Order_Date) as Year")
        )
        ->whereYear('Order_Date',date('Y'))
        ->where('Pharm_Id','=',$Pharm_id)
        ->groupBy('Year')
        ->get();
        return response()->json($Pharmacysales,200);
       }

    public function SalesDiscountReportThisYear($Pharm_id){
        $Pharmacysales= PharmacySales_Model::select(DB::raw("SUM(Discount) as SalesDiscount_Sum_Total_Amount")
        ,DB::raw("YEAR(Order_Date) as Year")
        )
        ->whereYear('Order_Date',date('Y'))
        ->where('Pharm_Id','=',$Pharm_id)
        ->groupBy('Year')
        ->get();
        return response()->json($Pharmacysales,200);
       }

    public function PurchaseReportThisYear($Pharm_id){
        $Pharmacypurchase= PharmacyPurchase_Model::select(DB::raw("SUM(Total_Amount) as Purchase_Sum_Total_Amount")
        ,DB::raw("YEAR(Purchase_Date) as Year")
        )
        ->whereYear('Purchase_Date',date('Y'))
        ->where('Pharm_Id','=',$Pharm_id)
        ->groupBy('Year')
        ->get();
        return response()->json($Pharmacypurchase,200);
       }

    public function SupplierDueReport($Pharm_id)
    {
        
        $Purchase= DB::table('purchase')

         ->select('purchase.Id as Purchase_Id'
          ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount','purchase.Due as Due_Amount'
          ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name"),
          'distributors.Name as Distributor_Name'
          ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
          DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
        
         ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
         ->join('employee','purchase.Employee_Id','=','employee.Id')
         ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
         ->where('purchase.Pharm_Id','=',$Pharm_id)
         ->where('purchase.deleted', '=','0')
         ->where('pharmacy.deleted', '=','0')
         ->where(function($query) {
            return $query->where('purchase.Due', '>','0')
                ->orWhere('purchase.Due', '<>',null);
        })
         ->get();
         return response()->json($Purchase,200);
    }

    public function SupplierDue_SumReport($Pharm_id)// dashboard
    {
        
        $Purchase= DB::table('purchase')

         ->select('purchase.Id as Purchase_Id'
          ,'purchase.Actual_Amount','purchase.Discount','purchase.Total_Amount','purchase.payed as Payed_Amount'
          ,'purchase.Due as Due_Amount',DB::raw("SUM(purchase.Due) as Total_Due")
          ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name"),
          'distributors.Name as Distributor_Name'
          ,DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%d/%m/%Y') as Date"),
          DB::raw("DATE_FORMAT(purchase.Purchase_Date, '%T') as Time"))
        
         ->join('pharmacy','purchase.Pharm_Id','=','pharmacy.Id')
         ->join('employee','purchase.Employee_Id','=','employee.Id')
         ->join('distributors','purchase.Distributor_Id','=','distributors.Id')
         ->where('purchase.Pharm_Id','=',$Pharm_id)
         ->where('purchase.deleted', '=','0')
         ->where('pharmacy.deleted', '=','0')
         ->where(function($query) {
            return $query->where('purchase.Due', '>','0')
                ->orWhere('purchase.Due', '<>',null);
        })
         ->get();
         return response()->json($Purchase,200);
    }

    public function CustomerDueReport($Pharm_id)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.due as Due Amount','pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->where(function($query) {
            return $query->where('pharmacysales.Due', '>','0')
                ->orWhere('pharmacysales.Due', '<>',null);
        })
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function CustomerDueSumReport($Pharm_id)
    {
       $Pharmacysales= DB::table('pharmacysales')
         ->select('pharmacysales.Id'
         ,'pharmacysales.Actual_Amount','pharmacysales.Discount','pharmacysales.Total_Amount'
         ,'pharmacysales.due as Due Amount',DB::raw("SUM(pharmacysales.due) as Total_Due")
         ,'pharmacysales.payed','customer.Full_Name as Customer_Name' 
         ,DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Employee_Name")
         ,DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%d/%m/%Y') as Date"),
         DB::raw("DATE_FORMAT(pharmacysales.Order_Date, '%T') as Time"))

         ->join('customer','pharmacysales.Customer_Id','=','customer.Id')
         ->join('employee','pharmacysales.Employee_Id','=','employee.Id')
         ->where('pharmacysales.Pharm_Id','=',$Pharm_id)
         ->where('pharmacysales.deleted', '=','0')
         ->where(function($query) {
            return $query->where('pharmacysales.Due', '>','0')
                ->orWhere('pharmacysales.Due', '<>',null);
        })
         ->get();
         return response()->json($Pharmacysales,200);
    }

    public function SalesReturnReportThisYear($Pharm_id){
        $PharmacysalesReturn= PharmacySalesReturn_Model::select(DB::raw("SUM(TotalPrice) as SalesReturn_Sum_Total_Amount")
        ,DB::raw("YEAR(Return_Date) as Year")
        )
        ->whereYear('Return_Date',date('Y'))
        ->where('Pharm_Id','=',$Pharm_id)
        ->groupBy('Year')
        ->get();
        return response()->json($PharmacysalesReturn,200);
       }

    public function PurchaseReturnReportThisYear($Pharm_id){
        $PharmacyPurchaseReturn= PharmacyPurchaseReturn_Model::select(DB::raw("SUM(TotalPrice) as PurchaseReturn_Sum_Total_Amount")
        ,DB::raw("YEAR(Return_Date) as Year")
        )
        ->whereYear('Return_Date',date('Y'))
        ->where('Pharm_Id','=',$Pharm_id)
        ->groupBy('Year')
        ->get();
        return response()->json($PharmacyPurchaseReturn,200);
       }

    public function UserOrderReportThisYear($Pharm_id){
        $UserOrder= DB::table('user_orders')
        ->join('userorder_details','user_orders.Id','=','userorder_details.userOrder_Id')
        ->select(DB::raw("SUM(userorder_details.total_Price) as UserOrder_Sum_Total_Amount")
        ,DB::raw("YEAR(user_orders.order_date) as Year")
        )
        ->whereYear('user_orders.order_date',date('Y'))
        ->where('userorder_details.Pharm_Id','=',$Pharm_id)
        // ->where(function($query) {
        //     return $query->where('userorder_details.status', '=','2')
        //         ->orWhere('userorder_details.status', '=','3');
        // })
        ->where('userorder_details.status', '=','3')
        ->groupBy('Year')
        ->get();
        return response()->json($UserOrder,200);
       }


    public function GraphOrderByMonthThisYear($Pharm_id){  // this on call karle bc

        $order= DB::table('user_orders')
        ->join('userorder_details','user_orders.Id','=','userorder_details.userOrder_Id')
      ->Select(DB::raw("(COUNT(*)) as count")
        ,DB::raw("SUM(userorder_details.total_price) as Sum_Total_Amount")
      ,DB::raw("MONTHNAME(user_orders.order_date) as monthname")
      )
      ->whereYear('user_orders.order_date',date('Y'))
        ->where('userorder_details.Pharm_Id','=',$Pharm_id)
        ->groupBy('monthname')
        ->where('userorder_details.status','=','3')
      ->groupBy('monthname')
      ->distinct()
      ->get();
      
        return response()->json($order,200);
       }
      
    public function GraphOrderByDaysThisWeek($Pharm_id){ // completed order as well multi purpose fucntion ok
      
        $order= DB::table('user_orders')
        ->join('userorder_details','user_orders.Id','=','userorder_details.userOrder_Id')
      ->Select(DB::raw("(COUNT(*)) as count")
        ,DB::raw("SUM(userorder_details.total_price) as Sum_Total_Amount")
      ,DB::raw("DAYNAME(user_orders.order_date) as dayname")
      )
      ->whereBetween('user_orders.order_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
      ->whereYear('user_orders.order_date',date('Y'))
      ->where('userorder_details.Pharm_Id','=',$Pharm_id)
      ->where('userorder_details.status','=','3')
      ->groupBy('dayname')
      ->distinct()
      ->get();
        return response()->json($order,200); 
       }

    
    public function TotalRegisteredEmployeeUser($id){
        $employee = DB::table('employee')
        ->where('Pharm_Id','=',$id)
        ->where(function($query) {
            return $query->where('Designation', '=','50')
                ->orWhere('Designation', '=','51')
                ->orWhere('Designation', '=','52');
        })
        ->count();
        return response()->json($employee,200);
    }

    public function TotalProducts($id){
        $Stock = DB::table('stock')
        ->where('stock.Pharm_Id','=',$id)
        ->count();
        return response()->json($Stock,200);
    }

    public function TotalDistributors($id){
        $Supplier = DB::table('distributors')
        ->where('Pharmacy_Id','=',$id)
        ->count();
        return response()->json($Supplier,200);
    }

    public function TotalPOS_CurrentYear($id){
        $currentYear = date('Y');
        $POS = DB::table('pharmacysales')
        ->where('Pharm_Id','=',$id)
        ->whereRaw('YEAR(pharmacysales.Order_Date) = ?',[$currentYear])
        ->count();
        return response()->json($POS,200);
    }

    public function TotalPOS_CurrentMonth($id){
        $currentMonth = date('m');
        $POS = DB::table('pharmacysales')
        ->where('Pharm_Id','=',$id)
        ->whereRaw('MONTH(pharmacysales.Order_Date) = ?',[$currentMonth])
        ->count();
        return response()->json($POS,200);
    }
}
