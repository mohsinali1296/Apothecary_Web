import React, { Component } from 'react';
import {MDBModal,MDBIcon, MDBModalBody, MDBModalHeader,MDBBtn} from 'mdbreact';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import toaster from "toasted-notes";
import {FormText,Form,Input,Label } from 'reactstrap';
import Select from 'react-select';
import HashLoader from "react-spinners/HashLoader";

export default class POS extends Component {
    constructor () {
        super()
        this.state = {
          unit_qty:'',
          updt_unit_qty:'',
          products: [],
          Customer_Id: '1',
          prod_detail:[],
          product_id: null,
          total:'0',
          tempSales:[],
          cust_id: '1',
          emp_id: JSON.parse(localStorage["empState"]).user.id,
          emp_desig: JSON.parse(localStorage["empState"]).user.desig,
          sales_id:'',
          modal1: false,
          custTotal:'0',
          balance:'0',
          status_id:'0',
          loading: false,
          selectedOption: null,
          pharm_id:JSON.parse(localStorage["appState"]).user.id,
   
        }
        this.handleFieldChange=this.handleFieldChange.bind(this)
        this.onSbmt = this.onSbmt.bind(this)
        this.qtyUpdate = this.qtyUpdate.bind(this)
        this.Update = this.Update.bind(this)
        this.clear = this.clear.bind(this)
        this.calBal = this.calBal.bind(this)
        this.delEntry = this.delEntry.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.orderInterval = this.orderInterval.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }


      componentDidMount () {
       axios.get(`/api/getProducts/${this.state.pharm_id}`).then(response => {
            this.setState({
              products: response.data
            });
          }).catch(errors => {
          console.log(errors)
        })


        var totalCal =0;
        axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
          this.setState({
            tempSales: response.data
          });
          }).catch(errors => {
            console.log(errors)
          }).finally(() => {
            if(this.state.tempSales!=''){
              {this.state.tempSales.map(sales => (
                totalCal = totalCal+parseInt(sales.Total_Price)
                ))}
                this.setState({
                  total: totalCal
                }); 
              }
        });
              setTimeout(()=>{
                this.setState({
                    loading:true
                })
              },3000)

              this.interval = setInterval(() => 
              this.orderInterval(),60000);
               

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
     
     toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }

     onSbmt () {

      if(this.state.unit_qty >= 1 && this.state.unit_qty <=99999 && (this.state.unit_qty%1)===0){
      
      var totalCal=0
      axios.get(`/api/getProductDetails/${this.state.pharm_id}/${this.state.product_id}`).then(response => {
        this.setState({
          prod_detail: response.data
        });
        if(this.state.prod_detail.Product_Id!=''){
          
          const prod_details = {
            Pharm_Id: this.state.pharm_id,
            Emp_Id : this.state.emp_id,
            stock_type :'0',
            unit_qty : this.state.unit_qty,
            Stock_Id : this.state.prod_detail[0].Product_Id}
             
          axios.post('/api/tempSales',prod_details).then(response => {
            if( response.status ===201) {
           
              axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                this.setState({
                  tempSales: response.data
                });
                  }).catch(errors => {
                  console.log(errors)
                }).finally(() => {
                  if(this.state.tempSales!=''){
                    {this.state.tempSales.map(sales => (
                      totalCal = totalCal+parseInt(sales.Total_Price)
                      ))}
                      this.setState({
                        total: totalCal
                      }); 
                    }
              });
              
            } 
     
            else{
              console.log(response.data)
            }
              }).catch(errors => {
              console.log(errors)
            }) 

        }}).catch(errors => {
          console.log(errors)
        }).finally(() => {
          this.setState({
            product_id:'',
            selectedOption: null,
            unit_qty:'',
          })
      }); }
      
      else{
        if(this.state.unit_qty===''){
          toaster.notify("Please enter an integer value in Product Quantity", {
            position: "bottom-right",
            duration: 5000
        })}

        else if(this.state.unit_qty>99999){
          toaster.notify("Please enter a value less than 99999 in Product Quantity", {
            position: "bottom-right",
            duration: 5000
          })}  

        else{
          toaster.notify("Please enter a correct integer value in Product Quantity", {
            position: "bottom-right",
            duration: 5000
          })}}
         
    }
  
  Update = (sales) => {

    var totalCal=0
    const prod_details1 = {
      Pharm_Id: this.state.pharm_id,
      Emp_Id : this.state.emp_id,
      stock_type :'0',
      unit_qty : parseInt(this.state.updt_unit_qty),
      Stock_Id : sales.Stock_Id,
      tempId: sales.Temp_Id}
      
      axios.put('/api/tempSalesUpdate',prod_details1).then(response => {
        if( response.status ===201) {
          this.setState({
            total:'0'
          });
          axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempSales: response.data
            });
              }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              if(this.state.tempSales!=''){
                {this.state.tempSales.map(sales => (
                  totalCal = totalCal+parseInt(sales.Total_Price)
                  ))}
                  this.setState({
                    total: totalCal
                  }); 
                }
          });
        } 
 
        else{
          console.log(response.data)
        }
          }).catch(errors => {
          console.log(errors)
        })
        
  }  

  qtyUpdate = (sales,temporary) => { 
    
    var qty = parseInt(sales.Quantity)
    var totalCal=0

    if(temporary==1){
    qty= qty+1
    const prod_details1 = {
      Pharm_Id: this.state.pharm_id,
      Emp_Id : this.state.emp_id,
      stock_type :'0',
      unit_qty : qty,
      Stock_Id : sales.Stock_Id,
      tempId: sales.Temp_Id}
      
      axios.put('/api/tempSalesUpdate',prod_details1).then(response => {
        if( response.status ===201) {
          this.setState({
            total:'0'
          });
          axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempSales: response.data
            });
              }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              if(this.state.tempSales!=''){
                {this.state.tempSales.map(sales => (
                  totalCal = totalCal+parseInt(sales.Total_Price)
                  ))}
                  this.setState({
                    total: totalCal
                  }); 
                }
          });
          
        } 
 
        else{
          console.log(response.data)
        }
          }).catch(errors => {
          console.log(errors)
        })
    }

    else if(temporary==0){
      qty= qty-1
       if(qty==0){

        toaster.notify("Quantity can not be decreased any further, please press the delete button if you wish to get rid of this data.", {
          position: "bottom-right",
          duration: 5000
        });

      }
    
     else{
     const prod_details1 = {
      Pharm_Id: this.state.pharm_id,
      Emp_Id : this.state.emp_id,
      stock_type :'0',
      unit_qty : qty,
      Stock_Id : sales.Stock_Id,
      tempId: sales.Temp_Id}
      
      axios.put('/api/tempSalesUpdate',prod_details1).then(response => {
        if( response.status ===201) {
          this.setState({
            total:'0'
          });
          axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempSales: response.data
            });
              }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              if(this.state.tempSales!=''){
                {this.state.tempSales.map(sales => (
                  totalCal = totalCal+parseInt(sales.Total_Price)
                  ))}
                  this.setState({
                    total: totalCal
                  }); 
                }
          });
          
        } 
 
        else{
          console.log(response.data)
        }
          }).catch(errors => {
          console.log(errors)
        }) }}
      
  }

  clear() {
    axios.delete(`/api/delTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
      if( response.status ===204){
        axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
          this.setState({
            tempSales: response.data
          });
            }).catch(errors => {
            console.log(errors)
          }).finally(() => {
            this.setState({
              total:'0',
              balance:'0',
              custTotal: '0',
              selectedOption: null,
              unit_qty: '',
            })
        });
      }
        }).catch(errors => {
        console.log(errors)
      })
    
  }
  
  delEntry(sales){
    var tempTotal=0;
    axios.delete(`/api/delTempSale/${sales.Temp_Id}`).then(response => {
      if( response.status ===201){
        axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
          this.setState({
            tempSales: response.data
          });
            }).catch(errors => {
            console.log(errors)
          }).finally(() => {
            if(this.state.tempSales!=''){
              {this.state.tempSales.map(sales => (
                tempTotal = tempTotal+parseInt(sales.Total_Price)
                ))}
                this.setState({
                  total: tempTotal
                }); 
              }
             else{
              this.setState({
                total: '0'
              }); 
             } 
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
  
  handleChange(selectedOption) {
    this.setState({
      product_id : selectedOption.value,
      selectedOption
    }); 
   }

  handleConfirm () {

    
    if(this.state.custTotal==='0'){
      toaster.notify("Please enter the amount the Customer Paid and Try Again.", {
        position: "bottom-right",
        duration: 5000
      });
    }

    else{
    var sale_details = {}
    const confirm_details = {
      Pharm_Id: this.state.pharm_id,
      Employee_Id : this.state.emp_id,
      Customer_Id : this.state.cust_id,
      Actual_Amount : this.state.total,
      Payed : this.state.custTotal,
      }
      
      axios.post('/api/salesInsert',confirm_details).then(response => {
        if( response.status ===201) {
          this.setState({
            sales_id: response.data.Id
          })
          for(var i=0 ; i<this.state.tempSales.length;i++){
           sale_details = {
              Pharm_Id: this.state.pharm_id,
              Stock_Id : this.state.tempSales[i].Stock_Id,
              stock_type : this.state.tempSales[i].stock_type,
              unit_Qty : this.state.tempSales[i].Quantity,
              Sale_Id : this.state.sales_id,
              }  
            
            axios.post('/api/salesDetailsInsert',sale_details).then(response => {
              if( response.status ===201) {
                axios.delete(`/api/delTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                  if( response.status ===204){
                    axios.get(`/api/getTempSales/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                      this.setState({
                        tempSales: response.data
                      }); 
                        }).catch(errors => {
                        console.log(errors)
                      }).finally(() => {
                        this.setState({
                          total:'0',
                          balance:'0',
                          custTotal: '0',
                          modal1 : false,
                        })
                    });
                  }
                    }).catch(errors => {
                    console.log(errors)
                  })
              }
            }).catch(errors => {
              console.log(errors)
            }) 

          }

          toaster.notify("The Sale entry was made successfully.", {
            position: "bottom-right",
            duration: 5000
          });

        }
        }).catch(errors => {
          console.log(errors)
        })}
  }

  calBal(){

    var custPaid = parseInt(this.state.custTotal)
    var totalBill = parseInt(this.state.total)
    if(this.state.custTotal >= this.state.total && this.state.custTotal <=999999){
    this.setState({
      balance : totalBill - custPaid 
    })}

    else if(this.state.custTotal===''){
        toaster.notify("Please enter the amount the customer paid, first", {
        position: "bottom-right",
        duration: 5000
      });
    }

    else if(this.state.custTotal<this.state.total){
      toaster.notify("Customer needs to pay more or equal to the Total amount", {
      position: "bottom-right",
      duration: 5000
    });
  }

    else{
      toaster.notify("Please enter a numeric value as to what Customer paid to calculate Balance.", {
      position: "bottom-right",
      duration: 5000
    });
  }
  }
  
  render() {
    const {products} = this.state
    const {tempSales} = this.state
    var temp=0
    var temp1=1
    let options = products.map(function (stocks) {
      return { value: stocks.Product_Id, label: stocks.Product };
    })
          
    return (
      <> 
        
          <div id='container1'>
                  {this.state.loading ? <div>  
             <MDBModal toggle={this.toggle(1)} isOpen={this.state.modal1} >
                                <MDBModalHeader>Checkout</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <form>
                                <br></br>
                                <label id='Lfont'><b>Grand Total:&nbsp;</b></label>
                                <input type='text'disabled id='total' name='total' value={this.state.total}/><b>Rs.</b>
                                <br></br>
                                <label id='Lfont'><b>Paid by Customer:&nbsp;</b></label>
                                <input type='number' min="0" id='total' name='custTotal' value={this.state.custTotal} onChange={this.handleFieldChange} /><b>Rs.</b>
                                <br></br><br></br>
                                <label id='Lfont'><b>Balance to be returned:&nbsp;</b></label>
                                <input type='text'disabled id='total' name='balance' value={this.state.balance}/><b>Rs.</b>.&ensp;
                                <MDBIcon icon="calculator" onClick={this.calBal} style={{ cursor: 'pointer' }}/><br></br><br></br>                  
                                <FormText color="muted">
                                 Please press the calculate button, to get the Balance amount.
                                </FormText>
                                </form>        
                                <Button color="secondary" onClick={this.handleConfirm}>Confirm</Button> 
                                <Button color="secondary" onClick={this.toggle(1)}>Close</Button>                         
                                </MDBModalBody>
                              </MDBModal>

            <div className='container py-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-11'>
                    <div className='card'>
                    <div className='card-header' id='col'><div className=' d-flex justify-content-between align-items-center'>
                      {this.state.emp_desig==='Cashier' ? (<Link to="/emplogin" > <MDBBtn><MDBIcon icon="sign-out-alt" className="mr-3"/>Logout</MDBBtn></Link>): (<MDBIcon  icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/>)}<h5 >POS System - Apothecary</h5><MDBIcon icon='cash-register' size='2x'/></div></div>
                          <div className='card-body'>
                          <br></br>
                          <Card><form>
                                
                                <Select
                                    name="product_id"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    clearable={true}
                                    searchable={true}
                                    autoFocus={true}
                                    placeholder='Please select the product, you want to enter & click the Plus icon.'
                                    options={options}
                                    id='datalst'                 
                                />
                               &ensp;<MDBIcon icon="plus" onClick={this.onSbmt} id='addProd' className='cyan-text'/>
                             </form></Card>

                             <Card border='light'><Form id='prodDeets'>
                                &ensp;<h4 id='prodDeet2'>Product Details :</h4>
                                <Label style={{width:'14%'}}>Product Quantity: </Label>
                                <Input type='text' id='prodDeet1' onBlur={(e) => e.target.placeholder = 'Please enter a numberic value >0'} onFocus={(e) => e.target.placeholder = ""}  placeholder='Please enter a numberic value >0' name='unit_qty' value={this.state.unit_qty} onChange={this.handleFieldChange} />
                             </Form></Card> <br></br>

                            <Card border='info' style={{ width: '100%' }}>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                    <th>Update/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tempSales.map(sales => (
                                  <tr  key={sales.Stock_Id}>
                                    <td>{sales.Product}</td>
                                    <td>{sales.Description}</td>
                                    <td contentEditable='true' onInput={e => this.setState({ updt_unit_qty:e.currentTarget.textContent})} suppressContentEditableWarning={true}>
                                    <MDBIcon icon='minus' className='cyan-text' style={{ cursor: 'pointer' }} onClick={() => this.qtyUpdate(sales,temp)}/>&nbsp;{sales.Quantity}&nbsp;<MDBIcon icon='plus' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.qtyUpdate(sales,temp1)} /></td>
                                    <td>{sales.unit_price}Rs.</td>
                                    <td>{sales.Total_Price}Rs.</td>
                                    <td><MDBIcon icon='edit' className='cyan-text' style={{ cursor: 'pointer' }} id='updDel' onClick={() => this.Update(sales)}/>&ensp;/&ensp;<MDBIcon icon='trash-alt' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.delEntry(sales)} /></td>
                                    
                                    </tr> ))}
                                  
                                   
                                </tbody>
                                </Table>
                            
                            </Card><br></br>
                            <Card border='info' style={{ width: '100%' }}>
                             
                             <form><div id="font">
                                <label >Grand Total:&nbsp;</label>
                                <input type='text'disabled id='total' name='total' value={this.state.total+'Rs'}/></div>
                             </form>   
                            </Card>
                            <Button variant="danger" id='clr' onClick={this.clear}>Empty POS</Button>
                            <Link to="/sales"><Button variant="light" id='sbmt1'>Sale History</Button></Link>
                            <Button variant="info" id='sbmt2' onClick={this.toggle(1)}>Confirm and Print</Button>
                            

                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div> :<div className='load'><div className="sweet-loading">
                 <HashLoader
                   size={125}
                   color={"#4B0082"}
                  /></div></div>}
   
        </div>          
        </>
    )
}
}