import React, { Component } from 'react'
import axios from 'axios'
import { MDBCol, MDBCard, MDBCardBody, MDBRow, MDBIcon } from 'mdbreact';
import logo from "../../../assets/scale.png";
import {FormText } from 'reactstrap';



export default class ProfitLossReport extends Component {

    constructor (props) {
        super(props)
        this.state = {
          purchaseTotal:'0 Rs.',
          salesReturn:'0 Rs.',
          salesTotal:'0 Rs.',
          salesDiscount:'0 Rs.',
          purchaseReturn:'0 Rs.',
          grossProfit:'0 Rs.',
          netProfit:'0 Rs.',
          orderSum:'0 Rs.',
          year:'',
          status_id:'0',
          Pharm_Id: JSON.parse(localStorage["appState"]).user.id,
        }
        this.orderInterval = this.orderInterval.bind(this)
      }

      
      componentDidMount () {
       
        axios.get(`/api/profitLoss/${this.state.Pharm_Id}`).then(response => {
          this.setState({
            salesTotal: response.data.PharmacySalesSum +' Rs.',
            salesReturn: response.data.SaleReturnSum +' Rs.',
            salesDiscount: response.data.SalesDiscountSum +' Rs.',
            purchaseTotal: response.data.PharmacyPurchaseSum +' Rs.',
            purchaseReturn: response.data.PurchaseReturnSum +' Rs.',
            orderSum: response.data.OnlineOrderSum + ' Rs.',
            year: response.data.year
          });
          }).catch(errors => {
            console.log(errors)
            }).finally(() => {
              

              this.setState({
                grossProfit: parseInt(this.state.salesTotal.slice(0,-4))-parseInt(this.state.purchaseTotal.slice(0,-4)) + ' Rs.',
                netProfit: (parseInt(this.state.salesTotal.slice(0,-4))+parseInt(this.state.purchaseReturn.slice(0,-4)) + parseInt(this.state.orderSum.slice(0,-4)))-(parseInt(this.state.purchaseTotal.slice(0,-4))+parseInt(this.state.salesReturn.slice(0,-4))+parseInt(this.state.salesDiscount.slice(0,-4))) + ' Rs.'
              })

            })

        this.interval = setInterval(() => 
        this.orderInterval(),36000);
        this.orderInterval();
    }    

    componentWillUnmount(){
      clearInterval(this.interval);
    }

    orderInterval(){
        
      axios.get(`/api/getOrderList/${this.state.pharm_id}/${this.state.status_id}`).then(response => {
        if(response.data.length>0){
          toaster.notify("There are orders pending that need to be reviewed, Please visit the Orders tab ASAP.", {
              position: "bottom-right",
              duration: 9000
            });
            }}).catch(errors => {
              console.log(errors)
            })
              
      }

  render() {

    return (

          
          <div id='container1'>
            <div className='container py-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-9'>
                    <div className='card'>
                       <div className='card-header' id='col' ><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h4 id='tp'>PROFIT/LOSS REPORT</h4></div>
                          <div className='card-body'>
                          <h3 id='tp'>Accounting Period</h3>
                          <h4 id='tp'>({this.state.year})</h4><br></br>
                          <MDBRow className="mb-4">
                            <MDBCol md="4" className="mb-4">
                              
                                  <form>
                                    <label><b>Total Purchase Amount:</b></label>
                                    <input className='profitloss' type='text' disabled value={this.state.purchaseTotal}/>
                                    <label><b>Total Sales Returned:</b></label>&nbsp;
                                    <input className='profitloss' type='text' disabled value={this.state.salesReturn}/>
                                    <label><b>Total Sales Discount:</b></label>
                                    <input className='profitloss' type='text' disabled value={this.state.salesDiscount}/>       
                                  </form>
                                  
                              </MDBCol>

                              <MDBCol md="4" className="mb-4">
                                                                
                                <img alt="Scale" style={{width:"100"}} className="img-fluid" src={logo}/>

                              </MDBCol>


                              <MDBCol md="4" className="mb-4">
                              
                                  <form>
                                    <label><b>Total Sales Amount:</b></label>
                                    <input className='profitloss' type='text' disabled value={this.state.salesTotal}/>
                                    <label><b>Total Purchase Returns:</b></label>
                                    <input className='profitloss' type='text' disabled value={this.state.purchaseReturn}/>
                                    <label><b>Online Order Sales:</b></label>
                                    <input className='profitloss' type='text' disabled value={this.state.orderSum}/>       
                                  </form>
                                    
                            </MDBCol>
                          </MDBRow>   
                          
                          <MDBRow className="mb-4">
                            <MDBCol md="12" className="mb-4">
                              <MDBCard className="mb-4">
                                <MDBCardBody>
                                  <MDBRow>
                                    <MDBCol md='6'>
                                    <label><b style={{color:'red'}}>Gross Profit: &nbsp;</b></label>
                                    <input type='text' disabled value={this.state.grossProfit}/>
                                    <FormText color="muted" id='redd'>
                                      (Total Sales Amount - Total Purchase Amount)
                                    </FormText>
                                    </MDBCol>
                                    <MDBCol md='6'>
                                    <label><b style={{color:'red'}}>Net Profit: &nbsp;</b></label>
                                    <input type='text' disabled value={this.state.netProfit}/>
                                    <FormText color="muted" id='redd'>
                                      (Total Sales Amount + Total Purchase Returns) - (Total Purchase Amount + Total Sales Returned + Total Sales Discount)
                                    </FormText>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
            
       
    )
}
}