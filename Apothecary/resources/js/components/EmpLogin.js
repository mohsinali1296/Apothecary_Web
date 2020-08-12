import React, { Component } from 'react';
import {MDBModal,MDBBtn, MDBModalBody,MDBIcon, MDBModalHeader,MDBModalFooter,MDBContainer} from 'mdbreact';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {FormText,Label,Table } from 'reactstrap';
import { AvForm, AvGroup, AvField} from 'availity-reactstrap-validation-safe';
import user from "../assets/user.png";


export default class EmpLogin extends Component {

    constructor () {
        super()
        this.state = {
          employees: [],
          modal1: false,
          modal10: false,
          modal11: false,
          designation:'',
          username:'',
          pass:'',
          pharm_id: JSON.parse(localStorage["appState"]).user.id,
        }
        this.openLogin = this.openLogin.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
      }
    
    componentDidMount () {

        axios.get(`/api/getEmployeesLoginList/${this.state.pharm_id}`).then(response => {
            this.setState({
              employees: response.data
            });
          }).catch(errors => {
          console.log(errors)
        })
        
    }

    handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }

    handleLogin(event){
        event.persist()

        const empDetails ={
          Username : this.state.username,
          Password : this.state.pass
        }

        axios.post('/api/empLogin',empDetails).then(response=>{
          
            if (response.data.length!=0){
            this.setState({
              modal10:true
            })
            
          }
          else{
             this.setState({
               modal11:true
             })
             
          }
          return response;
        }).then(json => {

           let empData = {
             id: json.data.data.id,
             name: json.data.data.name,
             desig: json.data.data.desig,
           };
 
           let empState = {
             isLoggedIn: true,
             user: empData
           };
           
           localStorage["empState"] = JSON.stringify(empState);

         }).catch(errors=>{
           console.log(errors);
         })
    }
    

    openLogin(employee){

        this.setState({
            modal1: true,
            designation : employee.Designation,
            username : employee.Username
        })

    }

    render() {
        const {employees} = this.state
        return (
            
            
              <div id='container2'>   
                 <MDBContainer>
                  <MDBModal size="sm" cascading className="modal-avatar" isOpen={this.state.modal1} toggle={this.toggle(1)}>
                    <MDBModalHeader className="mx-auto">
                      <img src={user} alt="avatar" className="rounded-circle img-responsive" />
                    </MDBModalHeader>
                    <MDBModalBody className="text-center mb-1">
                    <h5 className="mt-1 mb-2">{this.state.username}</h5>
                    <AvForm onValidSubmit={this.handleLogin} className='form-style-2'><br></br>
                               {/*  <AvGroup>
                                <Label for="username" id='loginLabel'>Username<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon far icon="user-circle" size='2x' id='fLeft' /> 
                                <AvField
                                  id='username'
                                  type='text'
                                  name='username'
                                  style={{ width : '90%'}}
                                  value={this.state.username}
                                  onChange={this.handleFieldChange}
                                  validate={{
                                    required: {value: true, errorMessage: 'Username is required to login.'}
                                    }}
                                  /></div>
                                </AvGroup><br></br> */}<br></br>
                                <AvGroup>
                                <Label id='loginLabel1' >Password<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon icon="lock" size='2x' id='fLeft' /> 
                                  <AvField
                                    id='pass'
                                    type='password'
                                    name='pass'
                                    style={{ width : '80%'}}
                                    value={this.state.pass}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Password is required to Login.'},
                                      minLength: {value: 8, errorMessage: 'Password must be between 8 and 25 characters'},
                                      maxLength: {value: 25, errorMessage: 'Password must be between 8 and 25 characters'}}}
                                  /></div>
                                </AvGroup><br></br>
                                <FormText color="muted" id='tp'>
                                            Fields marked with * are necessary to be filled.
                                </FormText>       
                        
                        </AvForm>
                      </MDBModalBody>                         
                    <MDBModalFooter className="justify-content-center">
                  <MDBBtn color="cyan" onClick={this.handleLogin}>Login
                <MDBIcon icon="sign-in-alt" className="ml-2" />
             </MDBBtn>
           </MDBModalFooter>
         </MDBModal>
      </MDBContainer> 

                <MDBModal toggle={this.toggle(10)} isOpen={this.state.modal10} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h5 id='blck'>Login Successful</h5>
                                <br></br>
                                {this.state.designation === 'Cashier' ? (
                                <Link to="/POS">
                                <MDBBtn color="secondary" onClick={this.toggle(10)}>Proceed</MDBBtn></Link>):(
                                <Link to="/dashboard">
                                <MDBBtn color="secondary" onClick={this.toggle(10)}>Proceed</MDBBtn></Link>)}
                                </MDBModalBody>
                </MDBModal>  

                <MDBModal toggle={this.toggle(11)} isOpen={this.state.modal11} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h6 id='blck'>Username and Password combination was unsuccessful, please try again.</h6>
                                <br></br>
                                <MDBBtn color="secondary" onClick={this.toggle(11)}>Close</MDBBtn>
                                </MDBModalBody>
                </MDBModal>   
    
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-5' id='margin-card'>
                        <div className='card'>
                        <div className='card-header' id='col' ><Link to="/empform"><MDBIcon id='back' icon='plus' size='2x' style={{ cursor: 'pointer' }}/></Link><h4 id='tp'>Employee Login</h4></div>
                              <div className='card-body'>
                                <Card border='info'>
                                <Table bordered hover responsive dark id='card-table'>
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Designation</th>                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {employees.map(employee => (
                                      <tr key={employee.Employee_Id} style={{ cursor: 'pointer' }} onClick={() => this.openLogin(employee)}>
                                        <td>{employee.Fullname}</td>
                                        <td>{employee.Designation}</td>
                                        </tr> ))}
                                      
                                       
                                    </tbody>
                                    </Table>
                                    </Card>
                                        <FormText color="muted" id='tp'>
                                            Please Choose the Employee that you want to login as.
                                        </FormText>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
           
        )
    }
}