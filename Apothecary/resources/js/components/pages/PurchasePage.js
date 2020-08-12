import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,ModalFooter,MDBContainer,MDBRow,MDBCol } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import { Table } from 'reactstrap';
import PuffLoader from "react-spinners/PuffLoader";
import toaster from "toasted-notes";

export default class PurchasePage extends Component {
  constructor () {
    super()
    this.state = {
      purchaseList: [],
      modal1:false,
      modal2:false,
      items:[],
      temp_qty:'',
      loading: false,
      emp_id: JSON.parse(localStorage["empState"]).user.id,
      pharm_id: JSON.parse(localStorage["appState"]).user.id,
      purchase_id:'',
      stock_id:'',
      unit_qty: '',
    }
    this.purchaseItems = this.purchaseItems.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.confirmReturn = this.confirmReturn.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleFieldChange=this.handleFieldChange.bind(this)

  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  componentDidMount () {
     
    setTimeout(()=>{
      this.setState({
          loading:true
      })
    },2000)
    
    axios.get(`/api/getPurchasesList/${this.state.pharm_id}`).then(response => {
      this.setState({
        purchaseList: response.data.data
        
      });
    }).catch(errors => {
    console.log(errors)
  })
  }

  confirmReturn(){ 
    if(parseInt(this.state.unit_qty)>parseInt(this.state.temp_qty)){
      toaster.notify("The value of Quantity to be returned cannot exceed Quantity of the Purchased", {
        position: "bottom-right",
        duration: 5000
    })}

    else if(this.state.unit_qty==='0'){
      toaster.notify("Please enter a value greater than 0", {
        position: "bottom-right",
        duration: 5000
    })}

    else if(this.state.unit_qty===''){
      toaster.notify("Please enter Quantity before trying to confirm the return.", {
        position: "bottom-right",
        duration: 5000
    })}

    else{
    const return_details ={
      Pharm_Id : this.state.pharm_id,
      Employee_Id : this.state.emp_id,
      Purchase_Id : this.state.purchase_id,
      Stock : this.state.stock_id,  
      unit_Qty: parseInt(this.state.unit_qty), }

      
      axios.post('/api/purchaseReturn',return_details).then(response => {
        if(response.status===201){
        toaster.notify("The purchase with the provided Quantity has been Returned Successfully, You can view in the Reports>Purchase Returns section.", {
          position: "bottom-right",
          duration: 8000
          })
        }}).catch(errors => {
          console.log(errors)
        }).finally(() => {
          this.setState({
            stock_id:'',
            purchase_id:'',
            temp_qty:'',
            unit_qty:'',
            modal2:false,
          })
        })    
    }
  }
  
  handleReturn = (purchases) => { 

    this.setState({
      stock_id : purchases.Product_Id,
      purchase_id : purchases.purchaseId,
      temp_qty: purchases.Purchase_Quantity,
      modal1: false,
      modal2: true,
      })  
      
  }
  
  purchaseItems = (purchases) => { 
    
    axios.get(`/api/getPurchaseDetails/${this.state.pharm_id}/${purchases.Purchase_Id}`).then(response => {
        this.setState({
          items: response.data
        });
        }).catch(errors => {
          console.log(errors)
        }).finally(() => {
          this.setState({
            modal1: true
          })
      });
    
  }

  render() {
   
    const { purchaseList } = this.state
    const { items } = this.state

  return (
   <>       {this.state.loading ? <div>
            <MDBModal toggle={this.toggle(1)} isOpen={this.state.modal1} centered>
                                <MDBModalHeader>Purchase Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hover responsive dark id='card-table'>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {items.map(items => (
                                  <tr  key={items.Id}>
                                    <td>{items.Id}</td>
                                    <td>{items.Product_Name}</td>
                                    <td>{items.Description}</td>
                                    <td>{items.Purchase_Quantity}</td>
                                    <td>{items.Purchase_Price}</td>
                                    <td><MDBIcon icon='undo' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.handleReturn(items)} /></td>                                    
                                    </tr> ))}   
                                  
                                   
                                </tbody>
                                </Table>
                                </Card>
                                <br></br>
                                <MDBBtn color="default" onClick={this.toggle(1)}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 

          <MDBContainer>
              <MDBModal className="modal-notify modal-info text-white" centered isOpen={this.state.modal2} toggle={this.toggle(2)}>
                <MDBModalHeader tag="p" toggle={this.toggle(2)}>
                      Confirm Return Details
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBRow>
                    <MDBCol size="3" className="d-flex justify-content-center align-items-center">
                      <MDBIcon size="3x" icon="shopping-cart" className="ml-1" />
                      <MDBIcon size="3x" icon="undo" className="ml-1" />
                    </MDBCol>
                    <MDBCol size="9">
                      <p>If you are certain about Returning this Purchase, please enter Quantity(in Integers) in the following:</p>
                      <input type='number' min="0" name='unit_qty' value={this.state.unit_qty} onChange={this.handleFieldChange} placeholder='Enter Unit Quantity'/>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <ModalFooter className="justify-content-center">
                  <MDBBtn color="primary" onClick={this.confirmReturn}>Confirm</MDBBtn>
                  <MDBBtn color="primary" outline onClick={this.toggle(2)}>Cancel</MDBBtn>
                </ModalFooter>
              </MDBModal>
        </MDBContainer>


            <h3>Purchase History</h3>
            <h6>(Click on a row to view further details)</h6>
            <MDBTable responsive hover>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Purchase ID</th>   
                  <th>Total Bill</th>
                  <th>Discount</th>
                  <th>Discounted Bill</th>
                  <th>Amount Paid</th>
                  <th>Due Amount</th>
                  <th>Employee Name</th>
                  <th>Distributor Name</th>
                  <th>Date</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
               {purchaseList.map(purchases => (
                <tr key={purchases.Purchase_Id} style={{ cursor: 'pointer' }} onClick={() => this.purchaseItems(purchases)}>
                  <td>{purchases.Purchase_Id}</td>
                  <td>{purchases.Actual_Amount+'Rs.'}</td>
                  <td>{purchases.Discount+'Rs.'}</td>
                  <td>{purchases.Total_Amount+'Rs.'}</td>
                  <td>{purchases.Payed_Amount+'Rs.'}</td>
                  <td>{purchases.Due_Amount+'Rs.'}</td>
                  <td>{purchases.Employee_Name}</td>
                  <td>{purchases.Distributor_Name}</td>
                  <td>{purchases.Date}</td>
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
