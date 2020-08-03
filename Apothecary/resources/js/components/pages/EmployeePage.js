import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';

export default class EmployeePage extends Component {
  constructor () {
    super()
    this.state = {
      employees: [],
      empId:'',
      modal8:false,
    }
  }

  
  toggle = nr =>  () => {
    let modalName = 'modal' + nr;
    this.setState({
        [modalName]: !this.state[modalName]
    })
  }

  componentDidMount () {
    
     const pharm_id= JSON.parse(localStorage["appState"]).user.id
    
    axios.get(`/api/employees/${pharm_id}`).then(response => {
      this.setState({
        employees: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })
  }

  handleDelEntry() {
    const employeeId = this.state.empId 
    axios.put(`/api/empDestroy/${employeeId}`).then(response => {
      
      console.log(this.state.employeeId)
      window.location.reload(false); 
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
      editId: empId
    }
    console.log(empId)
    localStorage["editState"] = JSON.stringify(edit);
  }
  
  render() {
   
    const { employees } = this.state
  return (
   <>
   
   <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to delete this data?</p>
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)}>Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Cancel</MDBBtn>
                                </MDBModalBody>
     </MDBModal>
   <Link to="/empForm">
   <MDBBtn color="primary">ADD AN EMPLOYEE</MDBBtn></Link>
            
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
                  <th></th>
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
                  <td><MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }}   onClick={this.handleEntry.bind(this,employee.Employee_Id)}   ></MDBIcon>
                  &ensp;&ensp;<MDBIcon icon="pen"  style={{ cursor: 'pointer' }}   onClick={this.handleEdit.bind(this,employee.Employee_Id)}   ></MDBIcon></td>  
              </tr> )
                        
                      )}
              </MDBTableBody>
            </MDBTable>
    </>
  )
}
}
