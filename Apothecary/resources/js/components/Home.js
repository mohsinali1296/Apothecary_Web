import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import { MDBContainer, MDBModal, MDBIcon,MDBBtn, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import axios from 'axios';
import {Form,Col} from 'react-bootstrap';
import { geolocated } from "react-geolocated";
import { AvForm, AvGroup, AvInput, AvFeedback, AvField} from 'availity-reactstrap-validation-safe';
import { Label } from 'reactstrap';



export default class Home extends Component {
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });
}

    constructor (props) {
        super(props)
        this.state = {
          modal1: false,
          modal2: false,
          modal8: false,
          modal9: false,
          modal10: false,
          modal11: false,
          Pharm_Name:'',
          Contact:'',
          Pharmacy_Address: '',
          Latitude:'',
          Longitude:'',  
          email: '',
          pass: '',
          login_email:'',
          login_pass:'',
          
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.handleCreateNewProject1 = this.handleCreateNewProject1.bind(this)
        this.getLocation = this.getLocation.bind(this)
        
      }

  

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleCreateNewProject1 (event) {
        event.persist()

        const pharm_login ={
          email:this.state.login_email,
          pass:this.state.login_pass
        }

        axios.post('/api/Pharm_login',pharm_login)
        .then(response=>{
          if (response.status===201){
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

           let userData = {
             id: json.data.data.id,
             name: json.data.data.name,
             timestamp: new Date().toString(),
             _id:''
 
           };
 
           let appState = {
             isLoggedIn: true,
             user: userData
           };
           // save app state with user date in local storage
 
           localStorage["appState"] = JSON.stringify(appState);
           this.setState({
             isLoggedIn: appState.isLoggedIn,
             user: appState.user
           });
         }).catch(errors=>{
           console.log(errors);
         })
      }

      handleCreateNewProject (event) {
        event.persist()

        const pharmacy = {
          Pharm_Name:this.state.Pharm_Name,
          Contact: this.state.Contact,
          Pharmacy_Address: this.state.Pharmacy_Address,
          Latitude: this.state.Latitude,
          Longitude: this.state.Longitude,
          email: this.state.email,
          pass: this.state.pass
        }
         

        axios.post('/api/AddPharm',pharmacy).then(response => {
          
          if( response.status ===201) {
              
            const pharm_login ={
              email:this.state.email,
              pass:this.state.pass
            }
    
            axios.post('/api/Pharm_login',pharm_login)
            .then(response=>{
              if (response.status===201){
                this.setState({
                  modal8:true
                })
                
              }
              else{
                 this.setState({
                   modal11:true
                 })
                 
              }
              return response;
            }).then(json => {
    
               let userData = {
                 id: json.data.data.id,
                 name: json.data.data.name,
                 timestamp: new Date().toString(),
                 _id:''
     
               };
     
               let appState = {
                 isLoggedIn: true,
                 user: userData
               };
               
               // save app state with user data in local storage
     
               localStorage["appState"] = JSON.stringify(appState);
               this.setState({
                 isLoggedIn: appState.isLoggedIn,
                 user: appState.user
               });
             }).catch(errors=>{
               console.log(errors);
             })
              
            }

            else{
              this.setState({
                modal9:true
              })
            }
           }).catch(errors=>{
             console.log(errors);
           })
        

        }
          
      toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }
      
      getLocation(){
        var lat=1,lon=1;
        navigator.geolocation.getCurrentPosition((position)=> {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          this.setState({
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude
          })
         });
      }
    render() {
        return (
            
        <div id="container1">
            
               
            <div style={{position:"relative"}} >
                <div className="topbtn2">
                    <MDBContainer>
                        <AwesomeButton type="secondary" onPress={this.toggle(2)}>Register</AwesomeButton>
                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                        <MDBModalHeader className="text-center" style={{backgroundColor:"lightblue"}} titleClass="w-100 font-weight-bold" toggle={this.toggle(2)}>Register</MDBModalHeader>
                        <MDBModalBody>
                        <AvForm onValidSubmit={this.handleCreateNewProject} className='form-style-2'>
                                <AvGroup>
                                <Label for="Phar_Name">Pharmacy Name<span id='red'>*</span></Label>
                                  <AvField
                                    id='Pharm_Name'
                                    type='text'
                                    name='Pharm_Name'
                                    value={this.state.Pharm_Name}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Please enter Pharmacy name'},
                                      minLength: {value: 4, errorMessage: 'Minimum 4 characters'},
                                     
                                    }}
                                    />
                                    
                                </AvGroup>
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
                                </AvGroup>
                                <AvGroup>
                                <Label for="Pharmacy_Address">Pharmacy_Address<span id='red'>*</span></Label>
                                <AvInput
                                    id='Pharmacy_Address'
                                    type='text'
                                    name='Pharmacy_Address'
                                    value={this.state.Pharmacy_Address}
                                    onChange={this.handleFieldChange}
                                    required
                                  />
                                  <AvFeedback>Address is required to register.</AvFeedback>
                                </AvGroup>
                               <Form.Row><Col>
                                <AvGroup>
                                <Label for="Latitude">Latitude<span id='red'>*</span></Label>
                                    <AvInput
                                    id='Latitude'
                                    type='text'
                                    name='Latitude'
                                    value={this.state.Latitude}
                                    onChange={this.handleFieldChange}
                                    disabled
                                    required
                                    />
                                    <AvFeedback>Press the Map icon to enter values automatically.</AvFeedback>
                                </AvGroup></Col>
                                <Col>
                                <AvGroup>
                                <Label for="Longitude">Longitude<span id='red'>*</span></Label>
                                    <AvInput
                                    id='Longitude'
                                    type='text'
                                    name='Longitude'
                                    value={this.state.Longitude}
                                    onChange={this.handleFieldChange}
                                    disabled
                                    required
                                    />
                                    <AvFeedback>Press the Map icon to enter values automatically.</AvFeedback>
                                </AvGroup></Col>
                                <Col><MDBIcon icon='map' className='cyan-text'className='btnpos'size='2x'style={{ cursor: 'pointer' }} onClick={this.getLocation}/></Col></Form.Row>
                                <AvGroup>
                                <Label for="email">Email<span id='red'>*</span></Label>
                                <AvField
                                  id='email'
                                  type='text'
                                  name='email'
                                  value={this.state.email}
                                  onChange={this.handleFieldChange}
                                  validate={{
                                    required: {value: true, errorMessage: 'Email is required to register.'},
                                    email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                                  />
                                </AvGroup>
                                <AvGroup>
                                <Label for="pass">Password<span id='red'>*</span></Label>
                                  <AvField
                                    id='pass'
                                    type='password'
                                    name='pass'
                                    value={this.state.pass}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Password is required to register.'},
                                      minLength: {value: 8, errorMessage: 'Your password must be between 8 and 25 characters'},
                                      maxLength: {value: 25, errorMessage: 'Your password must be between 8 and 25 characters'}}}
                                  />
                                </AvGroup>
                                
                                
                                
                        <div id='sbmt'>
                        <AwesomeButton type="secondary">Register</AwesomeButton>
                        </div>
                        </AvForm>
                        </MDBModalBody>
                        </MDBModal>
                    </MDBContainer>
                </div>
                    
                <div className="topbtn1">
                    <MDBContainer>
                    <AwesomeButton type="primary" onPress={this.toggle(1)}>Login</AwesomeButton>
                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)}>
                        <MDBModalHeader className="text-center" style={{backgroundColor:"lightblue"}} titleClass="w-100 font-weight-bold" toggle={this.toggle(1)}>Sign in</MDBModalHeader>
                        <MDBModalBody>
                        <AvForm onValidSubmit={this.handleCreateNewProject1} className='form-style-2'>
                        <AvGroup>
                                <Label for="email">Email<span id='red'>*</span></Label>
                                <AvField
                                  id='email'
                                  type='text'
                                  name='login_email'
                                  value={this.state.login_email}
                                  onChange={this.handleFieldChange}
                                  validate={{
                                    required: {value: true, errorMessage: 'Email is required to register.'},
                                    email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                                  />
                                </AvGroup>
                                <AvGroup>
                                <Label for="pass">Password<span id='red'>*</span></Label>
                                  <AvField
                                    id='pass'
                                    type='password'
                                    name='login_pass'
                                    value={this.state.login_pass}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Password is required to register.'},
                                      minLength: {value: 8, errorMessage: 'Your password must be between 8 and 25 characters'},
                                      maxLength: {value: 25, errorMessage: 'Your password must be between 8 and 25 characters'}}}
                                  />
                                </AvGroup>
                                
                                <div id='sbmt'>
                                <AwesomeButton type="primary">Login</AwesomeButton>
                                </div>
                        
                        </AvForm>
                        </MDBModalBody>
                        </MDBModal>
                    </MDBContainer>
                    </div> 
                     <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h5 id='blck'>Registration Successful</h5>
                                <br></br>
                                <Link to="/dashboard">
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Proceed</MDBBtn></Link>
                                </MDBModalBody>
                    </MDBModal>

                    <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h5 id='blck'>Data submission was unsucessfull, please try again.</h5>
                                <br></br>
                                <MDBBtn color="secondary" onClick={this.toggle(9)}>Close</MDBBtn>
                                </MDBModalBody>
                    </MDBModal> 

                    <MDBModal toggle={this.toggle(10)} isOpen={this.state.modal10} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h5 id='blck'>Login Successful</h5>
                                <br></br>
                                <Link to="/dashboard">
                                <MDBBtn color="secondary" onClick={this.toggle(10)}>Proceed</MDBBtn></Link>
                                </MDBModalBody>
                    </MDBModal>  

                    <MDBModal toggle={this.toggle(11)} isOpen={this.state.modal11} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <br></br>
                                <h6 id='blck'>Email and Password combination was unsuccessful, please try again.</h6>
                                <br></br>
                                <MDBBtn color="secondary" onClick={this.toggle(11)}>Close</MDBBtn>
                                </MDBModalBody>
                    </MDBModal>          
                
            </div>


                <div className="flex-center position-ref full-height">

                    <div className="content">
                        <div  className="animate-bottom"  style={{fontSize: "150px"}}>
                            Apothecary
                        </div>   
                    </div>

                    

                </div>
      
        </div>
            
        );
    }
}

