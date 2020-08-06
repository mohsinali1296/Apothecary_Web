<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee\Employee_Model;
use Validator;
use App\resources\views\ApiViews;
use Illuminate\Support\Facades\DB;
use Alphametric\Validation\Rules\Decimal;


class Employee_Controller extends Controller
{
    //-------------------------------------Web API-----------------------------------------------------//

    public function EmployeeLogin(Request $request)
    {
        


        $rules=[

            'Username'=>'required|String',
            'Password'=>'required|alpha_num|min:8|max:255'
                        
          ];  
        
       $validator = Validator::make($request->all(),$rules);

      
       
        if($validator->fails())
        {
            return response()->json($validator->errors(),202);
        }
          
        else{


        $data= DB::table('employee')
        ->select('employee.Id as Employee_Id',DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Fullname"),
        DB::raw("CASE WHEN employee.Gender=0 THEN 'Male' WHEN employee.Gender=1 THEN 'Female' END as Gender"),
        'list_data.DataName as Designation','employee.Email','employee.Contact','employee.CNIC'
        ,'employee.Address')
          ->join('list_data','employee.Designation','=','list_data.Id')
            ->where('Username','=',$request->Username)
            ->where('Password', '=', $request->Password)
            ->first();

            if($data==NULL){
              // $returnData = array(
              //     'status' => 'error',
              //     'message' => 'No such User. Please SignUp to Continue'
              // );
             
              return response()->json($data,204);
          }

            $response= ['data'=>[ 'id' =>$data->Employee_Id,'name' =>$data->Fullname]];
            return response()->json($response,200);


            
              }
             
    }

   
    public function NewEmployeeInsertion(Request $request)
    {


        $employee = new Employee_Model();


          $rules = [
            'Pharm_Id'=>'required|numeric',
            'First_Name'=>'required|min:3',
            'Last_Name'=>'required|min:3',
            'Gender'=>'required|numeric|in:0,1',
            'Designation'=>'required|numeric',
            'Email'=>'required|email|unique:employee,Email|max:255',
            'Contact'=>'required|numeric|unique:employee,Contact|min:11',
            'CNIC'=>'required|String|unique:employee,CNIC|min:13|max:15',
            'Address'=>'required|max:255',
            'Username'=>'required|String|unique:employee,Username',
            'Password'=>'required|alpha_num|min:8|max:255'

          ];

          $validator = Validator::make($request->all(),$rules);

        
        if($validator->fails())
        {
             return response()->json($validator->errors(),202);
             
        }
            
        else{
            
        $employee->Pharm_Id =$request->Pharm_Id;
        $employee->First_Name = $request->First_Name;
        $employee->Last_Name = $request->Last_Name;
        $employee->Gender = $request->Gender;
        $employee->Designation = $request->Designation;
        $employee->Email = $request->Email;
        $employee->Contact = $request->Contact;
        $employee->CNIC = $request->CNIC;
        $employee->Address = $request->Address;
        $employee->Username = $request->Username;
        $employee->Password = $request->Password;  



         if($employee->save()){
            return response()->json($employee,201);
         }

     
            }
    }

   
    
    public function showEmployees($pharmid)
    {
         $employee= DB::table('employee')

         ->select('employee.Id as Employee_Id',DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Fullname"),
            DB::raw("CASE WHEN employee.Gender=0 THEN 'Male' WHEN employee.Gender=1 THEN 'Female' END as Gender"),
            'list_data.DataName as Designation','employee.Email','employee.Contact','employee.CNIC'
            ,'employee.Address','employee.Username')
        ->join('list_data','employee.Designation','=','list_data.Id')
        ->where('employee.Pharm_Id','=',$pharmid)
        ->where('employee.deleted', '=','0')
        ->where('list_data.deleted', '=','0')
        ->get();

       
       
         return response()->json($employee,200);
    }

    public function showEmployeesLoginList($pharmid)
    {
         $employee= DB::table('employee')

         ->select('employee.Id as Employee_Id',DB::raw("CONCAT(employee.First_Name,' ',employee.Last_Name) as Fullname"),
            DB::raw("CASE WHEN employee.Gender=0 THEN 'Male' WHEN employee.Gender=1 THEN 'Female' END as Gender"),
            'list_data.DataName as Designation','employee.Email','employee.Contact','employee.CNIC'
            ,'employee.Address','employee.Username')
        ->join('list_data','employee.Designation','=','list_data.Id')
        ->where('employee.Pharm_Id','=',$pharmid)
        ->where('employee.deleted', '=','0')
        ->where('list_data.deleted', '=','0')
        ->where('employee.Designation','<>','53')
        ->get();

       
       
         return response()->json($employee,200);
    }
   
    public function edit($id)
    {
        $employee= Employee_Model::find($id);
        return response()->json($employee,200);
      
    
    }



    public function update(Request $request,$id)
    {

         $rules = [
            
            'First_Name'=>'required|min:3',
            'Last_Name'=>'required|min:3',
            'Gender'=>'required|numeric|in:0,1',
            'Designation'=>'required|numeric',
            'Email'=>'required|email|unique:employee,Email|max:255',
            'Contact'=>'required|numeric|unique:employee,Contact|min:11',
            'CNIC'=>'required|S.com.com.com.com.com.com.com.com.com.com.com.comtring|unique:employee,CNIC|min:13|max:15',
            'Address'=>'required|max:255',
            'Username'=>'required|String|unique:employee,Username',
            'Password'=>'required|alpha_num|min:8|max:255'

          ];

          $validator = Validator::make($request->all(),$rules);
        
        if($validator->fails())
        {
             return response()->json($validator->errors(),202);
             
        }
            
        else{

        $employee = Employee_Model::find($id);
        $employee->First_Name = $request->First_Name;
        $employee->Last_Name = $request->Last_Name;
        $employee->Gender = $request->Gender;
        $employee->Designation = $request->Designation;
        $employee->Email = $request->Email;
        $employee->Contact = $request->Contact;
        $employee->CNIC = $request->CNIC;
        $employee->Address = $request->Address;
        $employee->Username = $request->Username;
        $employee->Password = $request->Password;         
        
        $employee->update();    
       
        return response()->json($employee,201);

           }


    }

    public function destroy($id)
    {
       
        $employee = Employee_Model::find($id);
        $employee->deleted='1';   
        $employee->update();
        return response()->json($employee,201);
    }


    //-------------------------------------Web API-----------------------------------------------------//
}
