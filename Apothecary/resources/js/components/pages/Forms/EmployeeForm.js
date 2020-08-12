import React, { Component } from 'react'
import axios from 'axios'
import { Button, Label, FormText ,Col,Row } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import Select from 'react-select';
import toaster from "toasted-notes";


export default class EmployeeForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
          modal8: false,
          modal9: false,
          Pharm_Id: JSON.parse(localStorage["appState"]).user.id,
          edit_id: JSON.parse(localStorage["editState"]).data.emp_id,
          First_Name: '',
          Last_Name: '',
          Gender: '0',
          Designation: '',
          Email: '',
          Contact: '',
          CNIC:'',
          Address: '',
          Username: '',
          Password: '',
          Data:[],
          designations: [],
          selectedOption: null,
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.setGender = this.setGender.bind(this)
        this.handleChange = this.handleChange.bind(this)

      }

      toggle = nr =>  () => {
        let modalName = 'modal' + nr;
        this.setState({
            [modalName]: !this.state[modalName]
        })
      }

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      setGender = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
        
      }

      handleChange(selectedOption) {
        this.setState({
          Designation : selectedOption.value,
          selectedOption
        });
      }

       componentDidMount () {
       
        if(this.state.edit_id!=''){
          axios.get(`/api/employeeEdit/${this.state.edit_id}`).then(response => {
            this.setState({
             Data:response.data
            });
          }).catch(errors => {
          console.log(errors)
            }).finally(()=>{
              
              this.setState({
                First_Name: this.state.Data.First_Name,
                Last_Name: this.state.Data.Last_Name,
                Gender: this.state.Data.Gender,
                Designation: this.state.Data.Designation,
                Email: this.state.Data.Email,
                Contact: this.state.Data.Contact,
                CNIC: this.state.Data.CNIC,
                Address: this.state.Data.Address,
              });
              let option=[]
              if(this.state.Data.Designation===50){
                option = {
                  value: 50, label:"Manager"
                }
                this.setState({selectedOption:option})
              }

              if(this.state.Data.Designation===51){
                option = {
                  value: 51, label:"Cashier"
                }
                this.setState({selectedOption:option})
              }

              if(this.state.Data.Designation===52){
                option = {
                  value: 52, label:"Accountant"
                }
                this.setState({selectedOption:option})
              }

              if(this.state.Data.Designation===53){
                option = {
                  value: 53, label:"Delivery Boy"
                }
                this.setState({selectedOption:option})
              }

            })
        } 

       axios.get(`/api/getlistdata/5`).then(response => {
            this.setState({
              designations: response.data
            });
          }).catch(errors => {
          console.log(errors)
          })

          setTimeout(()=>{
            this.setState({
                loading:true
            })
          },2000) 
       } 
      
      handleCreateNewProject (event) {

        if(this.state.Designation===''){
          toaster.notify("Please select a designation for the Employee.", {
            position: "bottom-right",
            duration: 5000
        })
        }
        else{

        event.persist()

        const { history } = this.props
        if(this.state.edit_id===''){  
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
        

        axios.post('/api/newEmployee', employee).then(response => {
            
            if( response.status ===201) {
              this.setState({
                modal8:true
              })
            } 

            else{
              this.setState({
                modal9:true
              })
            }
             
          }) .catch(errors => {
              console.log(errors)
          })}

        else{
          const employee = {
          Id: this.state.edit_id,
          First_Name: this.state.First_Name,
          Last_Name: this.state.Last_Name,
          Gender: this.state.Gender,
          Designation: this.state.Designation,
          Email: this.state.Email,
          Contact: this.state.Contact,
          CNIC: this.state.CNIC,
          Address: this.state.Address,
        }
        

        axios.put('/api/empUpdate', employee).then(response => {
  
              if( response.status ===201) {
                let edit = {
                  cust_id: '',
                  stock_id:'',
                  emp_id:'',
                  dist_id:'',
                }
                let editState = {
                  data: edit
                };
                localStorage["editState"] = JSON.stringify(editState); 

                this.setState({
                  modal8:true
                })           
              } 
  
              else{
                this.setState({
                  modal9:true
                })
              }
               
            })
            .catch(errors => {
              console.log(errors)
            })}
          
        }
      }

  render() {
    const { designations } = this.state
    let options= designations.map(function (listdata) {
      return { value: listdata.Id, label:listdata.DataName };
    })

    return (
      
      <>
      <div id='container1'>
      {this.state.loading ? <div>
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader><br></br>
                                <MDBModalBody className="text-center">
                                <h5 className='black-text'>The data was submitted successfully.</h5><br></br>
                                <Link to="/employees">
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon='times' className='mr-3'/>Close</MDBBtn></Link>
                                </MDBModalBody>
                              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader><br></br>
                                <MDBModalBody className="text-center">
                                <h5 className='black-text'>Data submission was unsucessfull, please try again.</h5>  <br></br>                             
                                <MDBBtn color="secondary" onClick={this.toggle(9)}><MDBIcon icon='times' className='mr-3'/>Close</MDBBtn>
                                </MDBModalBody>
                              </MDBModal>   

            <div className='container py-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-8'>
                    <div className='card'>
                      <div className='card-header' id='col' ><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h4 id='tp'>Employee Registration</h4></div>
                          <div className='card-body'>

                <h4 id='tp'>Please fill out the Details Below</h4><br></br>
                <AvForm onValidSubmit={this.handleCreateNewProject}>
   
                    <Row><Col>
                    <AvGroup>
                    
                        <Label  className='black-text' for="First_Name">First Name<span id='redFont'>*</span></Label>
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
                        <Label className='black-text' for="Last_Name">Last Name<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'><h4>Gender<span id='redFont'>*</span></h4></Label>
                        <AvRadioGroup inline name="Gender"  value={this.state.Gender} onChange={event => this.setGender(event)} required>
                        <AvRadio customInput label="Male" value="0" />
                        <AvRadio customInput label="Female" value="1" />
                        <AvFeedback>Please select an option.</AvFeedback>
                        </AvRadioGroup>
                        
                    </AvGroup></Col>
                    <Col><AvGroup>
                        <Label for="Designation" className='black-text'>Designation<span id='redFont'>*</span></Label>
                         <Select
                                    name="designation"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    clearable={true}
                                    searchable={true}                                  
                                    placeholder='Please select a designation.'
                                    options={options}                
                                />
                        
                    </AvGroup></Col> </Row>
                    <AvGroup>
                        <Label for="Email" className='black-text'>Email<span id='redFont'>*</span></Label>
                        <AvField
                          id='Email'
                          type='email'
                          name='Email'
                          value={this.state.Email}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Email is required to register.'},
                            email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                        />
                       
                    </AvGroup>  
                    <Row><Col><AvGroup>
                        <Label for="Contact" className='black-text'>Contact<span id='redFont'>*</span></Label>
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
                            minLength: {value: 11, errorMessage: 'Your Contact number must be between 11 and 13 characters'},
                            maxLength: {value: 13, errorMessage: 'Your Contact number must be between 11 and 13 characters'}}}
                        />
                        
                    </AvGroup></Col>
                    <Col><AvGroup>
                        <Label for="CNIC" className='black-text'>CNIC<span id='redFont'>*</span><span>&nbsp;(without dashes)</span></Label>
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
                        <Label for="Address" className='black-text'>Address<span id='redFont'>*</span></Label>
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
                    {this.state.edit_id!='' ?(
                          <label hidden>editing</label>):
                        (<Row><Col><AvGroup>
                          <Label for="Username" className='black-text'>Username<span id='redFont'>*</span></Label>
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
                          <Label for="Password" className='black-text'>Password<span id='redFont'>*</span></Label>
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
                         
                          </AvGroup></Col></Row>)}
                        <br></br>
                    <FormText color="muted" id='tp'>
                      All fields marked with * are neccessary to be filled.
                    </FormText>
                   
                    <div className='d-flex justify-content-center align-items-center'>
                    {this.state.edit_id!='' ?(<Button><MDBIcon icon="check-circle" className='mr-3'/>Update Data</Button>):(<Button><MDBIcon icon="check-circle" className='mr-3'/>Submit Data</Button>)}</div>
                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
       :<div className='load'><div className="sweet-loading">
       <PropagateLoader
         size={20}
         color={"#4B0082"}
        /></div></div>}

      </div>          
    </>
    )
  }
}