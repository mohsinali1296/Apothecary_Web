import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import toaster from "toasted-notes";

export default class EmployeePage extends Component {
  constructor () {
    super()
    this.state = {
      employees: [],
      empId: '',
      loading: false,
      modal8: false,
      modal9: false,
      pharm_id: JSON.parse(localStorage["appState"]).user.id
    }
  }

  
  toggle = nr =>  () => {
    let modalName = 'modal' + nr;
    this.setState({
        [modalName]: !this.state[modalName]
    })
  }

  componentDidMount () {
    
    axios.get(`/api/getEmployees/${this.state.pharm_id}`).then(response => {
      this.setState({
        employees: response.data
      });
    }).catch(errors => {
    console.log(errors)
    })

    setTimeout(()=>{
      this.setState({
          loading:true
      })
      },2000)

      let edit = {
        cust_id: '',
        stock_id:'',
        emp_id: '',
        dist_id:'',
      }
      let editState = {
        data: edit
      };
      localStorage["editState"] = JSON.stringify(editState); 
  }

  handleDelEntry() {
  
    axios.put(`/api/empDestroy/${this.state.empId}`).then(response => {
      axios.get(`/api/getEmployees/${this.state.pharm_id}`).then(response => {
        this.setState({
          employees: response.data
        });
      }).catch(errors => {
      console.log(errors)
      }).finally(() => {
        this.setState({
          modal8:false
        })
        toaster.notify("The Employee data was successfully removed.", {
          position: "bottom-right",
          duration: 5000
      })
      }) 
      
    }).catch(errors => {
    console.log(errors)
  }) 
  }

  handleEntry(EmpId){
    this.setState({
      empId: EmpId,
      modal8:true
    });
    
  }

  handleEdit(empId){
    
    let edit = {
      cust_id: '',
      stock_id:'',
      emp_id: empId,
      dist_id:'',
    }
    let editState = {
      data: edit
    };
    localStorage["editState"] = JSON.stringify(editState); 
    this.setState({
      modal9:true,
    })

  }
  
  render() {
   
    const { employees } = this.state
  return (
    <>       {this.state.loading ? <div>
   
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to delete this data?</p>
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)}><MDBIcon icon="check" className="mr-3" />Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
            </MDBModal>

            <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to edit this data?</p>
                                <Link to='/empform'><MDBBtn color="danger" ><MDBIcon icon="check" className="mr-3" />Confirm</MDBBtn></Link>
                                <MDBBtn color="secondary" onClick={this.toggle(9)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
            </MDBModal>

          <div id='wrap'>
          <h3 id='slctset'>Employees: </h3>
          <Link to="/empform">
          <MDBBtn color="primary"><MDBIcon  icon="file-import" className="mr-3" />ADD AN EMPLOYEE</MDBBtn></Link> </div>
            
            <MDBTable responsive striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>CNIC</th>
                  <th>Address</th>
                  <th>Edit/Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {employees.map(employee => (
                <tr key={employee.Employee_Id}>
                  <td>{employee.Fullname}</td>
                  <td>{employee.Gender}</td>
                  <td>{employee.Designation}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.Contact}</td>
                  <td>{employee.CNIC}</td>
                  <td>{employee.Address}</td>
                  <td><MDBIcon icon="pen"  style={{ cursor: 'pointer' }} className='cyan-text'  onClick={this.handleEdit.bind(this,employee.Employee_Id)} ></MDBIcon> &nbsp;&nbsp;/&nbsp;&nbsp;
                      <MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }}  className='cyan-text' onClick={this.handleEntry.bind(this,employee.Employee_Id)} ></MDBIcon></td>
              </tr> )
                        
                      )}
              </MDBTableBody>
            </MDBTable>
            </div> :<div className='load'><div className="sweet-loading">
                 <PuffLoader
                   size={125}
                   color={"#123abc"}
                  /></div></div>}
    </>
  )
}
}
