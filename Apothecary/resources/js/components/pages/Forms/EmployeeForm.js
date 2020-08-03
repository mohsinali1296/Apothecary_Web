import React, { Component } from 'react'
import axios from 'axios'
import './bg.css';
import { Button, Label, CustomInput,Col,Row } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';




export default class EmployeeForm extends Component {

 
toggle = nr =>  () => {
  let modalName = 'modal' + nr;
  this.setState({
      [modalName]: !this.state[modalName]
  })
}
    constructor (props) {
        const pharm_id= JSON.parse(localStorage["appState"]).user.id
        super(props)
        this.state = {
          modal8: false,
          modal9: false,
          Pharm_Id: pharm_id,
          First_Name: '',
          Last_Name: '',
          Gender: '',
          Designation: '',
          Email: '',
          Contact: '',
          CNIC:'',
          Address: '',
          Username: '',
          Password: '',
          pharmacies: [],
          errors:[]
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)

      }

      handleFieldChange (event) {

        this.setState({
          [event.target.name]: event.target.value
        })
        
      }

       componentDidMount () {
       
       axios.get(`/api/getlistdata/5`).then(response => {
         this.setState({
           pharmacies: response.data
         });
       }).catch(errors => {
       console.log(errors)
     })
     } 
      
      handleCreateNewProject (event) {
        event.persist()

        const { history } = this.props

        const employee = {
          Pharm_Id: this.state.Pharm_Id,
          First_Name: this.state.First_Name,
          Last_Name: this.state.Last_Name,
          Gender: this.state.Gender,
          Designation: this.state.Designation,
          Email: this.state.Email,
          Contact: this.state.Contact,
          CNIC: this.state.CNIC,
          Address: this.state.Address,
          Username: this.state.Username,
          Password: this.state.Password
        }
        console.log(employee)

        axios.post('/api/employees', employee)
          .then(response => {
           
        
            if( response.status ===201) {
              this.setState({
                modal8:true
              })
              console.log(response.data)
            } 

            else{
              this.setState({
                modal9:true
              })
            }
             
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

  render() {
    const { pharmacies } = this.state
    return (

     
          <div id='cont2'>
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>The data was submitted successfully.</p>
                                <Link to="/employees">
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Close</MDBBtn></Link>
                                </MDBModalBody>
                              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Data submission was unsucessfull, please try again.</p>
                                
                                <MDBBtn color="secondary" onClick={this.toggle(9)}>Close</MDBBtn>
                                </MDBModalBody>
                              </MDBModal>                  
            <div className='container py-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-8'>
                    <div className='card'>
                      <div className='card-header' id='col' ><Link to="/employees"><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }}/></Link><h4 id='tp'>Employee Registration</h4></div>
                          <div className='card-body'>

                <AvForm onValidSubmit={this.handleCreateNewProject}>
                    
                    
                     <AvGroup>
                        
                        <AvInput
                          id='Pharm_Id'
                          type='text'
                          name='Pharm_Id'
                          value={this.state.Pharm_Id}
                          hidden
                          readOnly
                        />
                        
                    </AvGroup> 
                    
                    <Row><Col>
                    <AvGroup>
                    
                        <Label for="First_Name">First Name<span id='red'>*</span></Label>
                        <AvField
                          id='First_Name'
                          type='text'
                          name='First_Name'
                          value={this.state.First_Name}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Please enter your name'},
                            pattern: {value: '^[A-Za-z ]+$', errorMessage: 'Your name must be composed only of letters'},
                           
                          }}
                        />
                       
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label for="Last_Name">Last Name<span id='red'>*</span></Label>
                        <AvField
                          id='Last_Name'
                          type='text'
                          name='Last_Name'
                          value={this.state.Last_Name}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Please enter your name'},
                            pattern: {value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only of letters'},
                           
                          }}
                        />
                      
                    </AvGroup></Col></Row>
                    <Row><Col><AvGroup>
                        <Label><h4>Gender<span id='red'>*</span></h4></Label>
                        <AvRadioGroup inline name="Gender"  value={this.state.Gender} onChange={this.handleFieldChange} required>
                        <AvRadio customInput label="Male" value="0" />
                        <AvRadio customInput label="Female" value="1" />
                        <AvFeedback>Please select an option.</AvFeedback>
                        </AvRadioGroup>
                        
                    </AvGroup></Col>
                    <Col><AvGroup>
                        <Label for="Designation">Designation<span id='red'>*</span></Label>
                        <CustomInput type="select" id="Designation" name="Designation" placeholder='Please Select an option' value={this.state.Designation} onChange={this.handleFieldChange} >
                        {pharmacies.map(listdata => (
                            
                            <option value={listdata.Id} key={listdata.Id}>{listdata.DataName}</option>
                             
                         ))}
                    
                        </CustomInput>
                        
                    </AvGroup></Col> </Row>
                    <AvGroup>
                        <Label for="Email">Email<span id='red'>*</span></Label>
                        <AvField
                          id='Email'
                          type='text'
                          name='Email'
                          value={this.state.Email}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Email is required to register.'},
                            email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                        />
                       
                    </AvGroup>  
                    <Row><Col><AvGroup>
                        <Label for="Contact">Contact<span id='red'>*</span></Label>
                        <AvField
                          minLength="11"
                          id='Contact'
                          type='text'
                          name='Contact'
                          value={this.state.Contact}
                          onChange={this.handleFieldChange}
                          placeholder='xxxx-xxxxxxx'
                          validate={{
                            required: {value: true, errorMessage: 'Contact number is required to register.'},
                            number: {value: true, errorMessage: ' Contact number should only compose of numbers'},
                            minLength: {value: 11, errorMessage: 'Your CNIC must be between 11 and 13 characters'},
                            maxLength: {value: 13, errorMessage: 'Your CNIC must be between 11 and 13 characters'}}}
                        />
                        
                    </AvGroup></Col>
                    <Col><AvGroup>
                        <Label for="CNIC">CNIC<span id='red'>*</span></Label>
                        <AvField
                          id='CNIC'
                          type='number'
                          name='CNIC'
                          value={this.state.CNIC}
                          onChange={this.handleFieldChange}
                          placeholder='xxxxx-xxxxxxx-x'
                          validate={{
                            required: {value: true, errorMessage: 'CNIC is required.'},
                            minLength: {value: 13, errorMessage: 'Your CNIC must be between 13 and 15 characters'},
                            maxLength: {value: 15, errorMessage: 'Your CNIC must be between 13 and 15 characters'}}}
                        />
                      
                    </AvGroup></Col></Row>
                    <AvGroup>
                        <Label for="Address">Address<span id='red'>*</span></Label>
                        <AvInput
                          id='Address'
                          type='textarea'
                          name='Address'
                          value={this.state.Address}
                          onChange={this.handleFieldChange}
                          required
                        />
                        <AvFeedback>Address is required to register.</AvFeedback>
                    </AvGroup>
                    <Row><Col><AvGroup>
                        <Label for="Username">Username<span id='red'>*</span></Label>
                        <AvField
                          id='Username'
                          type='text'
                          name='Username'
                          value={this.state.Username}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Username is required to register.'},
                            minLength: {value: 6, errorMessage: 'Your username must be between 6 and 25 characters'},
                            maxLength: {value: 25, errorMessage: 'Your username must be between 6 and 25 characters'}}}
                        />
                    
                    </AvGroup></Col>
                    <Col><AvGroup>
                        <Label for="Password">Password<span id='red'>*</span></Label>
                        <AvField
                          id='Password'
                          type='password'
                          name='Password'
                          value={this.state.Password}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Password is required to register.'},
                            minLength: {value: 8, errorMessage: 'Your password must be between 8 and 25 characters'},
                            maxLength: {value: 25, errorMessage: 'Your password must be between 8 and 25 characters'}}}
                        />
                       
                        </AvGroup></Col></Row>
                   
                  
                  <Button id='sbmt'>Submit Data</Button>
                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
            
       
    )
}
}