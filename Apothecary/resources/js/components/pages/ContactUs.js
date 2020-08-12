import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap'
import { MDBModal, MDBBtn, MDBModalBody, MDBModalHeader} from 'mdbreact';


class ContactUs extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      modal1: false,
      userEmail: '',
      subject: '',
      userName: '',
      emailBody: ''
    }
      this.toggle = this.toggle.bind(this)
      this.resetForm = this.resetForm.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }


  toggle(){
   
    this.setState({
        modal1: !this.state.modal1
    })
  }

handleSubmit(e) {

    e.preventDefault()
    const {userName,userEmail, subject, emailBody } = this.state
   
    var template_params = {
      userName: userName,
      userEmail: userEmail,
      subject : subject,
      emailBody : emailBody
   }
   
   var service_id = "default_service";
   var template_id = "template_4UBhJYYp";
   var user_id = "user_VsQmtC5NcLwAr64iaKkSs"
   emailjs.send(service_id, template_id, template_params, user_id)
   .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    this.resetForm()
    this.toggle()
    }, (err) => {
    console.log('FAILED...', err);
    });
 } 

 resetForm() {
    this.setState({ 
      userName:'',
      userEmail: '',
      subject: '',
      emailBody: '',
    })
  } 

handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    
  }

render() {
    return (
      <>
          <MDBModal toggle={this.toggle} isOpen={this.state.modal1} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Email Sent</p>
                                
                                <MDBBtn color="secondary" onClick={this.toggle}>Proceed</MDBBtn>
                                </MDBModalBody>
                    </MDBModal>
          <h1 className="p-heading1">Get in Touch With Us</h1>
          <Form  onSubmit={this.handleSubmit} >
            <FormGroup>
              <Label className="text-muted">Email address</Label>
              <Input
                type="email"
                name="userEmail"
                className="text-primary"
                required
                value={this.state.userEmail}
                onChange={this.handleChange}
                placeholder="Enter your email."
              />
            </FormGroup>
            <FormGroup>
              <Label className="text-muted">Name</Label>
              <Input
                type="text"
                name="userName"
                className="text-primary"
                required
                value={this.state.userName}
                onChange={this.handleChange}
                placeholder="Enter your name."
              />
            </FormGroup>
            <FormGroup>
              <Label className="text-muted">Subject</Label>
              <Input
                type="text"
                name="subject"
                className="text-primary"
                required
                value={this.state.subject}
                onChange={this.handleChange}
                placeholder="Enter the subject of the email."
              />
            </FormGroup>
            <FormGroup >
              <Label className="text-muted">Message</Label>
              <Input
                type="textarea"
                name="emailBody"
                className="text-primary"
                required
                value={this.state.emailBody}
                onChange={this.handleChange}
              />
            </FormGroup><br></br>
            <Button variant="primary" type="submit" id='emailsbmt'>
              Send Email
            </Button>
            
          </Form>
        
      </>
    )
  }
}
export default ContactUs