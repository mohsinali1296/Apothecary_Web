import React, { Component } from 'react'
import axios from 'axios'
import { Button, Label, CustomInput,Col,Row } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField} from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';



export default class DistributorForm extends Component {

 
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
          Name: '',
          Email: '',
          Contact: '',
          Address: '',
          Pharm_Id: pharm_id,
          Company_Id: '',
          company:[],
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
       
        axios.get(`/api/getlistdata/4`).then(response => {
          this.setState({
            company: response.data
          });
        }).catch(errors => {
        console.log(errors)
      })
      } 

      handleCreateNewProject (event) {
        event.persist()

        const { history } = this.props

        const distributor = {
          Name: this.state.Name,
          Email: this.state.Email,
          Contact: this.state.Contact,
          Address: this.state.Address,
          Pharm_Id: this.state.Pharm_Id,
          Company_Id: this.state.Company_Id
        }
        console.log(distributor)

        axios.post('/api/distributorAdd', distributor)
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
    const { company } = this.state
    return (

          
          <div id='container2'>
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>The data was submitted successfully.</p>
                                <Link to="/distributors">
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
                    <div className='card-header' id='col' ><Link to="/distributors"><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }}/></Link><h4 id='tp'>Distributor Registration</h4></div>
                          <div className='card-body'>

                <AvForm onValidSubmit={this.handleCreateNewProject}>
                    
                    <AvGroup>
                        
                        <Label for="Name">Full Name<span id='red'>*</span></Label>
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
                          
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label for="Contact">Contact<span id='red'>*</span></Label>
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
                    <AvGroup>
                        <Label for="Company_Id">Company<span id='red'>*</span></Label>
                        <CustomInput type="select" id="Company_Id" name="Company_Id" onChange={this.handleFieldChange} >
                        {company.map(listdata => (
          
                            <option value={listdata.Id} key={listdata.Id}>{listdata.DataName}</option>
                             
                         ))}
                    
                        </CustomInput>
                    </AvGroup>
                   
                  
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