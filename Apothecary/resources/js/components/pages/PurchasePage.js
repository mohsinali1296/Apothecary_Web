import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import { Table } from 'reactstrap';
import PuffLoader from "react-spinners/PuffLoader";


export default class PurchasePage extends Component {
  constructor () {
    super()
    this.state = {
      purchaseList: [],
      modal1:false,
      items:[],
      loading: false,
      emp_id: JSON.parse(localStorage["empState"]).user.id,
      pharm_id: JSON.parse(localStorage["appState"]).user.id,
    }
    this.purchaseItems = this.purchaseItems.bind(this)
    this.handleReturns = this.handleReturn.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
        modal1: !this.state.modal1
    })
  }

  componentDidMount () {
     
    setTimeout(()=>{
      this.setState({
          loading:true
      })
    },3000)
    
    axios.get(`/api/getPurchasesList/${this.state.pharm_id}`).then(response => {
      this.setState({
        purchaseList: response.data.data
        
      });
    }).catch(errors => {
    console.log(errors)
  })
  }

  handleReturn = (purchases) => { 

    var purchase_details = {
      Pharm_Id: this.state.pharm_id,
      Stock_Id : purchases.Product_Id,
      Purchase_Id : purchases.Id,
      /* unit_Qty : this.state.tempPurchases[i].Quantity, */
      Employee_Id : this.state.emp_id
      }  
    console.log(purchase_details)
    
    /* axios.post('/api/purchaseDetailsInsert',purchase_details).then(response => { */

    
  }
  
  purchaseItems = (purchases) => { 

    axios.get(`/api/getPurchaseDetails/${this.state.pharm_id}/${purchases.Purchase_Id}`).then(response => {
        this.setState({
          items: response.data
        });
        }).catch(errors => {
          console.log(errors)
        }).finally(() => {
          this.toggle()
      });
    
  }

  render() {
   
    const { purchaseList } = this.state
    const { items } = this.state

  return (
   <>       {this.state.loading ? <div>
            <MDBModal toggle={this.toggle} isOpen={this.state.modal1} centered>
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
                                <MDBBtn color="default" onClick={this.toggle}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 


            <h3>Purchase History</h3>
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
