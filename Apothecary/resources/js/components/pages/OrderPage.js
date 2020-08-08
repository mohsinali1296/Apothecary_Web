import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import { Table } from 'reactstrap';
import toaster from "toasted-notes";
import PuffLoader from "react-spinners/PuffLoader";


export default class OrderPage extends Component {
  constructor () {
    super()
    this.state = {
      orders: [],
      orderDetails:[],
      modal1 : false,
      modal2 : false,
      modal3 : false,
      modal4 : false,
      loading: false,
      status_id:'0',
      pharm_id : JSON.parse(localStorage["appState"]).user.id,
    }
    this.handleFieldChange=this.handleFieldChange.bind(this)
    this.onSbmt=this.onSbmt.bind(this)
    this.toggle=this.toggle.bind(this)
    this.orderItems = this.orderItems.bind(this)
    this.acceptOrder = this.acceptOrder.bind(this)
  }

  toggle = nr =>  () => {
    let modalName = 'modal' + nr;
    this.setState({
        [modalName]: !this.state[modalName]
    })
  }
  
  onSbmt () {
    axios.get(`/api/getOrderList/${this.state.pharm_id}/${this.state.status_id}`).then(response => {
      this.setState({
        orders: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })
  }

  acceptOrder (id,stats,orders) {
    var id1=orders
    const orderAccpt ={
       status: stats,
       OrderDetails_Id: id
    }
    axios.put('/api/orderAccept/',orderAccpt).then(response => {
      if(response.status == 201){
      axios.get(`/api/getOrderList/${this.state.pharm_id}/${this.state.status_id}`).then(response => {
        this.setState({
          orders: response.data
        });
      }).catch(errors => {
      console.log(errors)
    }).finally(() => {  

      axios.get(`/api/getOrderDetails/${this.state.pharm_id}/${id1}/${this.state.status_id}`).then(response => {
        if(response.data.length===0){
          if(this.state.status_id =='0'){
            this.setState({
              modal1 : false
            })
          }
         
          else if(this.state.status_id =='1'){
            this.setState({
              modal2 : false
            }) }

         
          else if(this.state.status_id =='2'){
            this.setState({
              modal3 : false
            }) }

          toaster.notify("The order has been completely dealt with.", {
            position: "bottom-right",
            duration: 5000
          });
        }
        this.setState({
        orderDetails: response.data
      });
      }).catch(errors => {

        console.log(errors)
        
      })
     });
     }
    }).catch(errors => {
    console.log(errors)
  })

  }
  
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
   
  }

  componentDidMount () {
    
    axios.get(`/api/getOrderList/${this.state.pharm_id}/${this.state.status_id}`).then(response => {
      this.setState({
        orders: response.data
      }); 
    }).catch(errors => {
    console.log(errors)
  })

    setTimeout(()=>{
      this.setState({
          loading:true
      })
      },3000)
  }
 
  
  orderItems = (orders) => { 

    axios.get(`/api/getOrderDetails/${this.state.pharm_id}/${orders.Order_Id}/${this.state.status_id}`).then(response => {
        this.setState({
          orderDetails: response.data
        });
        }).catch(errors => {
          console.log(errors)
        }).finally(() => {

          if(this.state.status_id =='0'){
            this.setState({
              modal1 : true
            })
          }
         
          else if(this.state.status_id =='1'){
            this.setState({
              modal2 : true
            }) }

         
          else if(this.state.status_id =='2'){
            this.setState({
              modal3 : true
            }) }

          else {  this.setState({
            modal4 : true
          }) }
      });
    
  }

  render() {
   
    const { orders } = this.state
    const { orderDetails } = this.state
  return (
    <>       {this.state.loading ? <div>       
            <MDBModal toggle={this.toggle(1)} isOpen={this.state.modal1} centered size='lg'>
                                <MDBModalHeader>Order Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hover responsive dark id='card-table'>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Product Type</th>
                                    <th>Price</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {orderDetails.map(details => (
                                  <tr  key={details.OrderDetails_Id}>
                                    <td className='counterCell'></td>
                                    <td>{details.Product_Name}</td>
                                    <td>{details.Description}</td>
                                    <td>{details.Quantity}</td>
                                    <td>{details.Item_StockType}</td>
                                    <td>{details.Total_Price}</td>
                                    <td><div id='denyaccpt'><MDBBtn color="primary" size="sm"  title='Accept Order' onClick={() =>this.acceptOrder(details.OrderDetails_Id,1,details.UserOrder_Id)}>Accept<MDBIcon icon="check"/></MDBBtn>
                                    <MDBBtn color="primary" size="sm" title='Decline Order' onClick={() =>this.acceptOrder(details.OrderDetails_Id,4,details.UserOrder_Id)}>Deny<MDBIcon icon="times"/></MDBBtn></div></td>
                                    </tr> ))}   
                                  
                                </tbody>
                                </Table>
                                </Card>
                                <MDBBtn color="default" onClick={this.toggle(1)}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 

            <MDBModal toggle={this.toggle(2)} isOpen={this.state.modal2} centered size='lg'>
                                <MDBModalHeader>Order Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hover responsive dark id='card-table'>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Product Type</th>
                                    <th>Price</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {orderDetails.map(details => (
                                  <tr  key={details.OrderDetails_Id}>
                                    <td className='counterCell'></td>
                                    <td>{details.Product_Name}</td>
                                    <td>{details.Description}</td>
                                    <td>{details.Quantity}</td>
                                    <td>{details.Item_StockType}</td>
                                    <td>{details.Total_Price}</td>
                                    <td><div id='denyaccpt'><MDBBtn color="primary" size="sm"  onClick={() =>this.acceptOrder(details.OrderDetails_Id,2,details.UserOrder_Id)}>Dispatch<MDBIcon icon="check"/></MDBBtn></div></td>
                                    </tr> ))}   
                                  
                                </tbody>
                                </Table>
                                </Card>
                                <MDBBtn color="default" onClick={this.toggle(2)}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 

            <MDBModal toggle={this.toggle(3)} isOpen={this.state.modal3} centered size='lg'>
                                <MDBModalHeader>Order Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hover responsive dark>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Product Type</th>
                                    <th>Price</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {orderDetails.map(details => (
                                  <tr  key={details.OrderDetails_Id}>
                                    <td className='counterCell'></td>
                                    <td>{details.Product_Name}</td>
                                    <td>{details.Description}</td>
                                    <td>{details.Quantity}</td>
                                    <td>{details.Item_StockType}</td>
                                    <td>{details.Total_Price}</td>
                                    <td><div id='denyaccpt'><MDBBtn color="primary" size="sm"  onClick={() =>this.acceptOrder(details.OrderDetails_Id,3,details.UserOrder_Id)}>Deliver<MDBIcon icon="check"/></MDBBtn></div></td>
                                    </tr> ))}   
                                  
                                </tbody>
                                </Table>
                                </Card>
                                <MDBBtn color="default" onClick={this.toggle(3)}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal> 

            <MDBModal toggle={this.toggle(4)} isOpen={this.state.modal4} centered size='lg'>
                                <MDBModalHeader>Order Details</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <Card border='info'>
                                <Table bordered hover responsive dark>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Product Type</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {orderDetails.map(details => (
                                  <tr  key={details.OrderDetails_Id}>
                                    <td className='counterCell'></td>
                                    <td>{details.Product_Name}</td>
                                    <td>{details.Description}</td>
                                    <td>{details.Quantity}</td>
                                    <td>{details.Item_StockType}</td>
                                    <td>{details.Total_Price}</td>
                                    </tr> ))}   
                                  
                                </tbody>
                                </Table>
                                </Card>
                                <MDBBtn color="default" onClick={this.toggle(4)}>Close</MDBBtn>
                                </MDBModalBody>
            </MDBModal>  

            <div id='slct'><h5 id='slctset'>Select the type of Orders to list: </h5> &ensp;<h4>
              <select name="status_id" value={this.state.status_id} onChange={this.handleFieldChange}>
              <option value="0">Pending</option>
              <option value="1">Accepted</option>
              <option value="2">Dispatched</option>
              <option value="3">Completed</option>
              <option value="4">Canceled</option>
              </select>   
            </h4><Card border='info' id='slc' onClick={this.onSbmt} style={{ cursor: 'pointer' }}><MDBIcon icon="check" size='2x' className='cyan-text'/></Card></div>
            
            <MDBTable responsive hover>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Order ID</th>   
                  <th>Customer Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th> 
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {orders.map(orders => (
                <tr key={orders.Order_Id} style={{ cursor: 'pointer' }} onClick={() => this.orderItems(orders)}>
                  <td>{orders.Order_Id}</td>
                  <td>{orders.Customer_Name}</td>
                  <td>{orders.Contact}</td>
                  <td>{orders.Email}</td>
                  <td>{orders.Address}</td>
                  <td>{orders.Date}</td>
                  <td>{orders.Time}</td>
                  <td>{orders.Order_Status}</td>   
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
