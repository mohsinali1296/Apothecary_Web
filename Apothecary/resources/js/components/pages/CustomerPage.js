import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';

export default class CustomerPage extends Component {
  constructor () {
    super()
    this.state = {
      customers: [],
      modal8:false,
      delTemp:'',
      CustId:'',
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
    
    axios.get(`/api/customer/${pharm_id}`).then(response => {
      this.setState({
        customers: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })
  }

  handleEdit(customerId){
    let edit = {
      editId: customerId
    }
    console.log(customerId)
    localStorage["editState"] = JSON.stringify(edit);
  }

  handleDelEntry() {
    const custId = this.state.CustId 
    axios.put(`/api/custDestroy/${custId}`).then(response => {
      
      console.log(this.state.CustId)
      window.location.reload(false); 
    }).catch(errors => {
    console.log(errors)
  }) 
  }

  handleEntry(customerId){
    this.setState({
      CustId: customerId,
      modal8:true
    });
    
  }
   
    
  render() {
   
    const { customers } = this.state
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
            
   <Link to="/custForm">
   <MDBBtn color="primary">ADD A CUSTOMER</MDBBtn></Link>
            
            <MDBTable responsive striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {customers.map(customer => (
                <tr key={customer.Customer_Id}>
                  
                  <td>{customer.Full_Name}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Contact}</td>
                  <td>{customer.Address}</td>
                  <td><MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }}   onClick={this.handleEntry.bind(this,customer.Customer_Id)}   ></MDBIcon>
                  &ensp;&ensp;<MDBIcon icon="pen"  style={{ cursor: 'pointer' }}   onClick={this.handleEdit.bind(this,customer.Customer_Id)}   ></MDBIcon></td> 
              </tr> )
                      
                      )}
              </MDBTableBody>
            </MDBTable>
    </>
  )
}
} 
