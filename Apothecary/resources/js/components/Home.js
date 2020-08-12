import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { MDBContainer, MDBModal, MDBIcon,MDBBtn, MDBModalBody, MDBModalHeader, MDBRow,MDBCol } from 'mdbreact';
import { AwesomeButton } from "react-awesome-button";
import axios from 'axios';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField} from 'availity-reactstrap-validation-safe';
import { Label, FormText} from 'reactstrap';
import ImageUploader from "react-images-upload";



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
          pictures: [],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.handleCreateNewProject1 = this.handleCreateNewProject1.bind(this)
        this.getLocation = this.getLocation.bind(this)
        this.onDrop = this.onDrop.bind(this);
        this.getFiles= this.getFiles.bind(this)
      }

      getFiles(files){
        this.setState({ pictures: files })
      }

      onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures: pictureFiles[0]
        });
        console.log(pictureFiles[0])
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
        let formData = new FormData();
        let picture= this.state.pictures
        formData.append('image', picture,picture.name);
        formData.append('Pharm_Name', this.state.Pharm_Name);
        formData.append('Contact', this.state.Contact);
        formData.append('Pharmacy_Address', this.state.Pharmacy_Address);
        formData.append('Latitude', this.state.Latitude);
        formData.append('Longitude', this.state.Longitude);
        formData.append('email', this.state.email);
        formData.append('pass', this.state.pass);
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
        
        axios.post('/api/AddPharm',formData).then(response => {
          
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
                        <MDBModalHeader className="text-center" style={{backgroundColor:"lightblue"}} titleClass="w-100 font-weight-bold">Register</MDBModalHeader>
                        <MDBModalBody>
                        <AvForm onValidSubmit={this.handleCreateNewProject} className='form-style-2'><br></br><br></br>
                                <AvGroup id='margin0'>
                                <Label for="Phar_Name" id='loginLabel'>Pharmacy Name<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon icon="capsules" size='2x' id='fLeft' />
                                  <AvField
                                    id='Pharm_Name'
                                    type='text'
                                    name='Pharm_Name'
                                    style={{ width : '90%'}}
                                    value={this.state.Pharm_Name}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Please enter Pharmacy name'},
                                      minLength: {value: 4, errorMessage: 'Minimum 4 characters'},
                                     
                                    }}
                                    /></div>
                                    
                                </AvGroup>

                                <AvGroup id='margin0'>
                                <Label for="Contact" id='loginLabel'>Contact<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon icon="phone-alt" size='2x' id='fLeft' />
                                <AvField
                                  id='Contact'
                                  type='text'
                                  name='Contact'
                                  style={{ width : '90%'}}
                                  value={this.state.Contact}
                                  onChange={this.handleFieldChange}
                                  placeholder='xxxx-xxxxxxx'
                                  validate={{
                                        required: {value: true, errorMessage: 'Contact number is required to register.'},
                                        number: {value: true, errorMessage: ' Contact number should only compose of numbers'},
                                        minLength: {value: 11, errorMessage: 'Your Contact number must be between 11 and 13 characters'},
                                        maxLength: {value: 13, errorMessage: 'Your Contact number must be between 11 and 13 characters'}}}  
                                    /></div>
                                </AvGroup>

                                <AvGroup id='margin0'>
                                <Label for="Pharmacy_Address" id='loginLabel'>Pharmacy Address<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon  far icon="address-book" size='2x' id='fLeft' />
                                <AvInput
                                    id='Pharmacy_Address'
                                    type='text'
                                    style={{ width : '90%'}}
                                    name='Pharmacy_Address'
                                    value={this.state.Pharmacy_Address}
                                    onChange={this.handleFieldChange}
                                    required
                                  />
                                  <AvFeedback>Address is required to register.</AvFeedback></div>
                                </AvGroup><br></br>

                               <MDBRow>
                               <MDBCol md="1" className="mb-4"><MDBIcon icon='map' className='cyan-text'className='btnpos'size='2x'style={{ cursor: 'pointer' }} onClick={this.getLocation}/></MDBCol> 
                               <MDBCol md="5" className="mb-4">
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
                                </AvGroup></MDBCol>
                                <MDBCol md="5" className="mb-4">
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
                                </AvGroup></MDBCol>
                                </MDBRow>
                                
                                <AvGroup id='margin0'>
                                <Label for="email" id='loginLabel'>Email<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon far icon="envelope" size='2x' id='fLeft' /> 
                                <AvField
                                  id='email'
                                  type='email'
                                  name='email'
                                  style={{ width : '90%'}}
                                  value={this.state.email}
                                  onChange={this.handleFieldChange}
                                  validate={{
                                    required: {value: true, errorMessage: 'Email is required to register.'},
                                    email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                                  /></div>
                                </AvGroup>
                                
                                <AvGroup id='margin0'>
                                <Label for="pass" id='loginLabel'>Password<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon icon="lock" size='2x' id='fLeft' /> 
                                  <AvField
                                    id='pass'
                                    type='password'
                                    name='pass'
                                    style={{ width : '90%'}}
                                    value={this.state.pass}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Password is required to register.'},
                                      minLength: {value: 8, errorMessage: 'Your password must be between 8 and 25 characters'},
                                      maxLength: {value: 25, errorMessage: 'Your password must be between 8 and 25 characters'}}}
                                  /></div>
                                </AvGroup>
                                <ImageUploader
                                    withPreview={true}
                                    withIcon={true} 
                                    buttonText="Choose Image"
                                    onChange={this.onDrop}
                                    imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                  />
                                 
                                <FormText color="muted" id='tp'>
                                            Fields marked with * are necessary to be filled.
                                </FormText><br></br>
                                
                                
                        <div className='d-flex justify-content-center align-items-center'>
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
                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                        <MDBModalHeader className="text-center" style={{backgroundColor:"lightblue"}} titleClass="w-100 font-weight-bold">Sign in</MDBModalHeader>
                        <MDBModalBody>
                        <AvForm onValidSubmit={this.handleCreateNewProject1} className='form-style-2'><br></br><br></br>
                        <AvGroup id='margin0'>
                                <Label for='email' id='loginLabel'>Email<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon far icon="envelope" size='2x' id='fLeft' /> 
                                <AvField
                                  id='email'
                                  style={{ width : '90%'}}
                                  type='email'
                                  name='login_email'
                                  value={this.state.login_email}
                                  onChange={this.handleFieldChange}
                                  validate={{
                                    required: {value: true, errorMessage: 'Email is required to Login.'},
                                    email: {value:true, errorMessage: 'Please enter a valid email address.'}}}
                                  /></div>
                                </AvGroup> <br></br>
                                <AvGroup>
                                <Label for="pass" id='loginLabel'>Password<span id='red'>*</span></Label>
                                <div id="inline-block-parent"><MDBIcon icon="lock" size='2x' id='fLeft' /> 
                                  <AvField
                                    id='pass'
                                    style={{ width : '90%'}}
                                    type='password'
                                    name='login_pass'
                                    value={this.state.login_pass}
                                    onChange={this.handleFieldChange}
                                    validate={{
                                      required: {value: true, errorMessage: 'Password is required to Login.'},
                                      minLength: {value: 8, errorMessage: 'Your password must be between 8 and 25 characters'},
                                      maxLength: {value: 25, errorMessage: 'Your password must be between 8 and 25 characters'}}}
                                  /></div>
                                </AvGroup><br></br>
                                <FormText color="muted" id='tp'>
                                            Fields marked with * are necessary to be filled.
                                </FormText><br></br>
                                <div className='d-flex justify-content-center align-items-center'>
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
                                <Link to="/emplogin">
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
                                <Link to="/emplogin">
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

