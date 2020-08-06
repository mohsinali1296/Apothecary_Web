import React, { Component } from 'react';
import {MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {FormText } from 'reactstrap';

export default class POS extends Component {
    constructor () {
        super()
        this.state = {
          products: [],
          Customer_Id: '1',
          prod_detail:[],
          product_id:'',
          total:'0',
          tempSales:[],
          cust_id: '1',
          emp_id: JSON.parse(localStorage["empState"]).user.id,
          sales_id:'',
          modal1: false,
          custTotal:'',
          balance:'',
          status_id:'0',
          pharm_id:JSON.parse(localStorage["appState"]).user.id,
   
        }
        this.handleFieldChange=this.handleFieldChange.bind(this)
        this.onSbmt = this.onSbmt.bind(this)
        this.qtyUpdate = this.qtyUpdate.bind(this)
        this.clear = this.clear.bind(this)
        this.calBal = this.calBal.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.orderInterval = this.orderInterval.bind(this)
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
     
     toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }

     onSbmt () {
      
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
            unit_qty : '1',
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
            product_id:''
          })
      }); 
         
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

        axios.delete(`/api/delTempSale/${sales.Temp_Id}`).then(response => {
          if( response.status ===204){
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
            }).catch(errors => {
            console.log(errors)
          }) 

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
              custTotal: '0'
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

  handleConfirm () {

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

        }
        }).catch(errors => {
          console.log(errors)
        }).finally(() => {
        
          toaster.notify("The Sale entry was made successfully.", {
            position: "bottom-right",
            duration: 5000
          });
      });

    
  }

  calBal(){

    var custPaid = parseInt(this.state.custTotal)
    var totalBill = parseInt(this.state.total)
    this.setState({
      balance : totalBill - custPaid 
    })
  }
  
  render() {
    const {products} = this.state
    const {tempSales} = this.state
    var temp=0
    var temp1=1
    

    return (
        
        
          <div id='container1'>  
             <MDBModal toggle={this.toggle(1)} isOpen={this.state.modal1} >
                                <MDBModalHeader>Checkout</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <form>
                                <br></br>
                                <label >Grand Total:&nbsp;</label>
                                <input type='text'disabled id='total' name='total' value={this.state.total}/>Rs.
                                <br></br>
                                <label >Paid by Customer:&nbsp;</label>
                                <input type='text' id='total' name='custTotal' value={this.state.custTotal} onChange={this.handleFieldChange} />Rs.
                                <br></br><br></br>
                                <label >Balance to be returned:&nbsp;</label>
                                <input type='text'disabled id='total' name='balance' value={this.state.balance}/>Rs.&ensp;
                                <MDBIcon icon="calculator" onClick={this.calBal} style={{ cursor: 'pointer' }}/><br></br><br></br>                  
                                <FormText color="muted">
                                 Please press the calculate button, to get the amount.
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
                    <div className='card-header' id='col'><Link to="/dashboard"><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }}/></Link><h5 id='tp'>POS System - Apothecary</h5></div>
                          <div className='card-body'>
                          <br></br>
                          <Card border='info' id='datalistCard'><form onSubmit={this.handleCreateNewProject}>
                                
                                <input list="prdcts" name="product_id" value={this.state.product_id} onChange={this.handleFieldChange} id='datalst'/>  
                                <datalist id="prdcts">
                                 {products.map(stocks => (
                            
                                    <option value={stocks.Product_Name} key={stocks.Product_Id}>{stocks.Product}</option>
                                    
                                ))}    
                                </datalist>
                                &ensp;<MDBIcon icon="plus" onClick={this.onSbmt} id='addProd' className='cyan-text'/>
                            </form></Card> <br></br>
                            <Card border='info' style={{ width: '100%' }}>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tempSales.map(sales => (
                                  <tr  key={sales.Product}>
                                    <td>{sales.Product}</td>
                                    <td>{sales.Description}</td>
                                    <td><MDBIcon icon='minus' className='cyan-text' style={{ cursor: 'pointer' }} onClick={() => this.qtyUpdate(sales,temp)}/>&ensp;{sales.Quantity}&ensp;<MDBIcon icon='plus' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.qtyUpdate(sales,temp1)} /></td>
                                    <td>{sales.unit_price}Rs.</td>
                                    <td>{sales.Total_Price}Rs.</td>
                                    
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
        </div>          
       
    )
}
}