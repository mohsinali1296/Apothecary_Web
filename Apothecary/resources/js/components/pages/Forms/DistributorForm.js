import React, { Component } from 'react'
import axios from 'axios'
import { Button, Label, FormText,Col,Row } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField} from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import toaster from "toasted-notes";
import PropagateLoader from "react-spinners/PropagateLoader";


export default class DistributorForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
          modal8: false,
          modal9: false,
          loading: false,
          Name: '',
          Email: '',
          Contact: '',
          Address: '',
          Pharm_Id: JSON.parse(localStorage["appState"]).user.id,
          edit_id: JSON.parse(localStorage["editState"]).data.dist_id,
          selectedOption: null,
          company_id:'',
          company:[],
          Data:[],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
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

      handleChange(selectedOption) {
        this.setState({
          company_id : selectedOption.value,
          selectedOption
        }); 
      }

      componentDidMount () {
        if(this.state.edit_id!=''){
          axios.get(`/api/distributorEdit/${this.state.edit_id}`).then(response => {
            this.setState({
             Data:response.data
            });
          }).catch(errors => {
          console.log(errors)
            }).finally(()=>{
              
              this.setState({
                Name: this.state.Data.Name,
                Email: this.state.Data.Email,
                Contact: this.state.Data.Contact,
                Address: this.state.Data.Distributor_Address,
                company_id: this.state.Data.Company_Id
              });
              
              let option=[]
                option = {
                  value: this.state.Data.Company_Id, label:this.state.Data.Company_Name
                }
                this.setState({selectedOption:option})
              

            })}
       
        axios.get(`/api/getlistdata/4`).then(response => {
          this.setState({
            company: response.data
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
        
        if(this.state.company_id===''){
          toaster.notify("Please select the Company of the Distributor", {
            position: "bottom-right",
            duration: 5000
        })
        }
        else{
        
        event.persist()

        const { history } = this.props
        if(this.state.edit_id===''){    
        const distributor = {
          Name: this.state.Name,
          Email: this.state.Email,
          Contact: this.state.Contact,
          Address: this.state.Address,
          Pharm_Id: this.state.Pharm_Id,
          Company_Id: this.state.company_id
        }
        
        axios.post('/api/distributorAdd', distributor).then(response => {
                 
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
          }).catch(errors => {
              console.log(errors)
          })}

          else{
            const distributor = {
              Id: this.state.Data.Distributor_Id,
              Name: this.state.Name,
              Email: this.state.Email,
              Contact: this.state.Contact,
              Distributor_Address: this.state.Address,
              Pharm_Id: this.state.Pharm_Id,
              Company_Id: this.state.company_id
            }
            console.log(distributor)
            axios.put('/api/distUpdate', distributor).then(response => {
                     
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
              }).catch(errors => {
                  console.log(errors)
              })}}
          }
      

      
  render() {

    const { company } = this.state
    let options = company.map(function (listdata) {  
      return { value: listdata.Id, label: listdata.DataName };
    })


    return (

      <>
      <div id='container1'>
      {this.state.loading ? <div>
                            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader><br></br>
                                <MDBModalBody className="text-center">
                                <h5 className='black-text'>The data was submitted successfully.</h5><br></br>
                                <Link to="/distributors">
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
                    <div className='card-header' id='col' ><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h4 id='tp'>Distributor Registration</h4></div>
                          <div className='card-body'>

                <h4 id='tp'>Please fill out the Details Below</h4><br></br>
                <AvForm onValidSubmit={this.handleCreateNewProject}>
                    
                    <AvGroup>
                        
                        <Label className='black-text' for="Name">Full Name<span id='redFont'>*</span></Label>
                        <AvField
                          id='Name'
                          type='text'
                          name='Name'
                          value={this.state.Name}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Please enter your full name'},
                            pattern: {value: '^[A-Za-z ]+$', errorMessage: 'Your name must be composed only of letters'},
                           
                          }}
                        />
                        
                    </AvGroup>
                    <Row><Col><AvGroup>
                        <Label  className='black-text' for="Email">Email<span id='redFont'>*</span></Label>
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
                          
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label  className='black-text' for="Contact">Contact<span id='redFont'>*</span></Label>
                        <AvField
                          
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
                        
                    </AvGroup></Col></Row>
                    <AvGroup>
                        <Label className='black-text' for="Address">Address<span id='redFont'>*</span></Label>
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
                    <AvGroup>
                        <Label className='black-text' for="Company_Id">Company<span id='redFont'>*</span></Label>
                        <Select
                                    name="Company_Id"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    clearable={true}
                                    searchable={true}
                                    placeholder='Please select a Company.'
                                    options={options}                
                                />
                    </AvGroup>
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