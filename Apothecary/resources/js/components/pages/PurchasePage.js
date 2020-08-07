import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import { Table } from 'reactstrap';

export default class PurchasePage extends Component {
  constructor () {
    super()
    this.state = {
      salesList: [],
      modal1:false,
      items:[],
      pharm_id:JSON.parse(localStorage["appState"]).user.id,
    }
    this.saleItems = this.saleItems.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    
    this.setState({
        modal1: !this.state.modal1
    })
  }

  componentDidMount () {
    
     
    
    axios.get(`/api/getSalesList/${this.state.pharm_id}`).then(response => {
      this.setState({
        salesList: response.data.data
        
      });
    }).catch(errors => {
    console.log(errors)
  })
  }
  
  saleItems = (sales) => { 

    axios.get(`/api/getSalesDetails/${this.state.pharm_id}/${sales.Id}`).then(response => {
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
   
    const { salesList } = this.state
    const { items } = this.state

  return (
   <>
            <MDBModal toggle={this.toggle} isOpen={this.state.modal1} centered>
                                <MDBModalHeader>Sales Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hove responsive dark id='card-table'>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Product Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {items.map(items => (
                                  <tr  key={items.Id}>
                                    <td>{items.Id}</td>
                                    <td>{items.Product}</td>
                                    <td>{items.Description}</td>
                                    <td>{items.Sold_Quantity}</td>
                                    <td>{items.Product_Type}</td>
                                    
                                    
                                    </tr> ))}   
                                  
                                   
                                </tbody>
                                </Table>
                                </Card>
                                <MDBBtn color="default" onClick={this.toggle}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 


            <h3>Sales History</h3>
            <MDBTable responsive hover>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Sale ID</th>   
                  <th>Total Bill</th>
                  <th>Amount Paid</th>
                  <th>Customer Name</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
               {salesList.map(sales => (
                <tr key={sales.Id} style={{ cursor: 'pointer' }} onClick={() => this.saleItems(sales)}>
                  <td>{sales.Id}</td>
                  <td>{sales.Total_Amount}</td>
                  <td>{sales.payed}</td>
                  <td>{sales.Customer_Name}</td>
                  <td>{sales.Employee_Name}</td>
                  <td>{sales.Date}</td>
                  <td>{sales.Time}</td>
                  
              </tr> )
                        
                      )} 
              </MDBTableBody>
            </MDBTable>
    </>
  )
}
}
