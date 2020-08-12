import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import toaster from "toasted-notes";

export default class CustomerPage extends Component {
  constructor () {
    super()
    this.state = {
      customers: [],
      modal8:false,
      modal9:false,
      loading: false,
      delTemp:'',
      CustId:'',
      pharm_id: JSON.parse(localStorage["appState"]).user.id,
    }

  }

  toggle = nr =>  () => {
    let modalName = 'modal' + nr;
    this.setState({
        [modalName]: !this.state[modalName]
    })
  }

  componentDidMount () {
    
    axios.get(`/api/customer/${this.state.pharm_id}`).then(response => {
      this.setState({
        customers: response.data
      });
    }).catch(errors => {
    console.log(errors)
      })

      setTimeout(()=>{
        this.setState({
            loading:true
        })
        },2000) 

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

  }

  handleEdit(customerId){
    let edit = {
      cust_id: customerId,
      stock_id:'',
      emp_id:'',
      dist_id:'',
    }
    let editState = {
      data: edit
    };
    localStorage["editState"] = JSON.stringify(editState); 
    this.setState({
      modal9:true,
    })
    
  }

  handleDelEntry() {
    const custId = this.state.CustId 
    axios.put(`/api/custDestroy/${custId}`).then(response => {
      axios.get(`/api/customer/${this.state.pharm_id}`).then(response => {
        this.setState({
          customers: response.data
        });
      }).catch(errors => {
      console.log(errors)
        }).finally(() => {
          this.setState({
            modal8:false
          })
          toaster.notify("The Customer data was successfully removed.", {
            position: "bottom-right",
            duration: 5000
        })
        }) 
      
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
    <>       {this.state.loading ? <div>
              <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to delete this data?</p>
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)} ><MDBIcon icon="check" className="mr-3" />Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to edit this data?</p>
                                <Link to='/custform'><MDBBtn color="danger" ><MDBIcon icon="check" className="mr-3" />Confirm</MDBBtn></Link>
                                <MDBBtn color="secondary" onClick={this.toggle(9)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
              </MDBModal>
            
              <div id='wrap'>
              <h3 id='slctset'>Customers: </h3>
              <Link to="/custform">
              <MDBBtn color="primary"><MDBIcon  icon="file-import" className="mr-3" />ADD A CUSTOMER</MDBBtn></Link> </div>
            
            <MDBTable responsive striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Edit/Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {customers.map(customer => (
                <tr key={customer.Customer_Id}>
                  
                  <td>{customer.Full_Name}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Contact}</td>
                  <td>{customer.Address}</td>
                  <td><MDBIcon icon="pen"  style={{ cursor: 'pointer' }}  className='cyan-text' onClick={this.handleEdit.bind(this,customer.Customer_Id)}   ></MDBIcon>&nbsp;&nbsp;/&nbsp;&nbsp;
                      <MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }} className='cyan-text'  onClick={this.handleEntry.bind(this,customer.Customer_Id)}   ></MDBIcon></td> 
              </tr> )
                      
                      )}
              </MDBTableBody>
            </MDBTable>
            </div> :<div className='load'><div className="sweet-loading">
                 <PuffLoader
                   size={125}
                   color={"#123abc"}
                  /></div></div>}
    </>
  )
}
}
