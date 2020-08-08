import React, { Component } from 'react';
import {MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import toaster from "toasted-notes";
import {FormText,Label,Input,Form } from 'reactstrap';
import Select from 'react-select';
import HashLoader from "react-spinners/HashLoader";

export default class PurchaseEntry extends Component {
    constructor () {
        super()
        this.state = {
          products: [],
          date:'',
          loading: false,
          unit_qty:'',
          updt_unit_qty:'',
          Customer_Id: '1',
          prod_detail:[],
          product_id: null,
          total:'0',
          tempPurchases:[],
          cust_id: '1',
          emp_id: JSON.parse(localStorage["empState"]).user.id,
          purchase_id:'',
          modal1: false,
          discount:'0',
          finalTotal:'',
          status_id:'0',
          selectedOption: null,
          paid:'0',
          due:'0',
          buy_price:'',
          updt_buy_price:'',
          distributors:[],
          distributor:'',
          pharm_id:JSON.parse(localStorage["appState"]).user.id,
   
        }
        this.handleFieldChange=this.handleFieldChange.bind(this)
        this.onSbmt = this.onSbmt.bind(this)
        this.qtyUpdate = this.qtyUpdate.bind(this)
        this.clear = this.clear.bind(this)
        this.calBal = this.calBal.bind(this)
        this.calBal1 = this.calBal1.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.orderInterval = this.orderInterval.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.delEntry = this.delEntry.bind(this)
        this.Update = this.Update.bind(this)
      }


    componentDidMount () {

            axios.get(`/api/getProducts/${this.state.pharm_id}`).then(response => {
                    this.setState({
                      products: response.data
                    });
                  }).catch(errors => {
                  console.log(errors)
                })
            
            axios.get(`/api/getDistributor/${this.state.pharm_id}`).then(response => {
                  this.setState({
                    distributors: response.data
                  });
                }).catch(errors => {
                console.log(errors)
                })
                  

          var totalCal =0;
          axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempPurchases: response.data
            });
            }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              if(this.state.tempPurchases!=''){
                {this.state.tempPurchases.map(purchases => (
                  totalCal = totalCal+parseInt(purchases.Total_Price)
                  ))}
                  this.setState({
                    total: totalCal,
                    finalTotal: totalCal
                  }); 
                }
          });

                setTimeout(()=>{
                  this.setState({
                      loading:true
                  })
                },3000)

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
      if(this.state.unit_qty >= 1 && this.state.unit_qty <=99999 && (this.state.unit_qty%1)===0 && this.state.buy_price >= 1 && this.state.buy_price <=999999){
      var totalCal=0
      axios.get(`/api/getProductDetails/${this.state.pharm_id}/${this.state.product_id}`).then(response => {
        this.setState({
          prod_detail: response.data
        });
        if(this.state.prod_detail.Product_Id!=''){
          
          const prod_details = {
            Pharm_Id: this.state.pharm_id,
            Emp_Id : this.state.emp_id,
            unit_qty : this.state.unit_qty,
            Stock_Id : this.state.prod_detail[0].Product_Id,
            buy_price : this.state.buy_price}
             
          axios.post('/api/tempPurchase',prod_details).then(response => {
            if( response.status ===201) {
           
              axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                this.setState({
                  tempPurchases: response.data
                });
                  }).catch(errors => {
                  console.log(errors)
                }).finally(() => {
                  if(this.state.tempPurchases!=''){
                    {this.state.tempPurchases.map(purchases => (
                      totalCal = totalCal+parseInt(purchases.Total_Price)
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
            buy_price:'',
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
        
        else if(this.state.buy_price===''){
          toaster.notify("Please enter a numeric value in Buy Price", {
            position: "bottom-right",
            duration: 5000
        })}  

        else{
          toaster.notify("Please enter correct values in Product Details", {
            position: "bottom-right",
            duration: 5000
          })}}
         
    }

    Update = (purchases)=> {
      
      var totalCal = 0
      var qty = parseInt(this.state.updt_unit_qty)
      console.log(qty)
      if(qty===''){
        console.log(purchases.Quantity)
          qty: {purchases.Quantity} ////////////////start work from here tomorrow
        console.log(this.state.updt_unit_qty)
      } 

      if(this.state.updt_buy_price===''){
        this.setState({
          updt_buy_price: purchases.Buy_Price
        })
      }


      const prod_details1 = {
        Pharm_Id: this.state.pharm_id,
        Emp_Id : this.state.emp_id,
        unit_qty : qty,
        Stock_Id : purchases.Stock_Id,
        Temp_Id: purchases.Temp_Id,
        buy_price: this.state.updt_buy_price}
        console.log(prod_details1)
        axios.put('/api/tempPurchasesUpdate',prod_details1).then(response => {
          if( response.status ===201) {
            this.setState({
              total:'0'
            });
            axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
              this.setState({
                tempPurchases: response.data
              });
                }).catch(errors => {
                console.log(errors)
              }).finally(() => {
                if(this.state.tempPurchases!=''){
                  {this.state.tempPurchases.map(purchases => (
                    totalCal = totalCal+parseInt(purchases.Total_Price)
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

    qtyUpdate = (purchases,temporary) => { 
    
      var qty = parseInt(purchases.Quantity)
      var totalCal=0

      if(temporary==1){
      qty= qty+1
      const prod_details1 = {
        Pharm_Id: this.state.pharm_id,
        Emp_Id : this.state.emp_id,
        unit_qty : qty,
        Stock_Id : purchases.Stock_Id,
        Temp_Id: purchases.Temp_Id,
        buy_price: purchases.Buy_Price}
      
        axios.put('/api/tempPurchasesUpdate',prod_details1).then(response => {
          if( response.status ===201) {
            this.setState({
              total:'0'
            });
            axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
              this.setState({
                tempPurchases: response.data
              });
                }).catch(errors => {
                console.log(errors)
              }).finally(() => {
                if(this.state.tempPurchases!=''){
                  {this.state.tempPurchases.map(purchases => (
                    totalCal = totalCal+parseInt(purchases.Total_Price)
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
        unit_qty : qty,
        Stock_Id : purchases.Stock_Id,
        buy_price : purchases.Buy_Price,
        Temp_Id: purchases.Temp_Id}
        
        axios.put('/api/tempPurchasesUpdate',prod_details1).then(response => {
          if( response.status ===201) {
            this.setState({
              total:'0'
            });
            axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
              this.setState({
                tempPurchases: response.data
              });
                }).catch(errors => {
                console.log(errors)
              }).finally(() => {
                if(this.state.tempPurchases!=''){
                  {this.state.tempPurchases.map(purchases => (
                    totalCal = totalCal+parseInt(purchases.Total_Price)
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

    delEntry(purchase){
      var tempTotal=0;
      axios.delete(`/api/delTempPurchase/${purchase.Temp_Id}`).then(response => {
        if( response.status ===201){
          axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempPurchases: response.data
            });
              }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              if(this.state.tempPurchases!=''){
                {this.state.tempPurchases.map(purchase => (
                  tempTotal = tempTotal+parseInt(purchase.Total_Price)
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

    clear() {
      axios.delete(`/api/delTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
        if( response.status ===204){
          axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
            this.setState({
              tempPurchases: response.data
            });
              }).catch(errors => {
              console.log(errors)
            }).finally(() => {
              this.setState({
                total:'0',
                discount:'0',
                finalTotal: '0',
                selectedOption: null,
                unit_qty: '',
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
  
    handleChange(selectedOption) {
      this.setState({
        product_id : selectedOption.value,
        selectedOption
      }); 
    }

    handleChange1(selectedOption) {
      this.setState({
        distributor : selectedOption.value,
        selectedOption
      }); 
    }

    handleConfirm () {

      var purchase_details = {}

      const confirm_details = {
        Pharm_Id: this.state.pharm_id,
        Employee_Id : this.state.emp_id,
        Actual_Amount : this.state.total,
        Discount : this.state.discount,
        Total_Amount : this.state.finalTotal,
        payed : this.state.paid,
        Due : this.state.due,
        Purchase_Date : this.state.date,
        Distributor_Id : this.state.distributor
        }
        
        console.log(confirm_details)
        axios.post('/api/purchaseInsert',confirm_details).then(response => {
          if( response.status ===201) {
            this.setState({
              purchase_id: response.data.Id
            })
            for(var i=0 ; i<this.state.tempPurchases.length;i++){
            purchase_details = {
                Pharm_Id: this.state.pharm_id,
                Stock_Id : this.state.tempPurchases[i].Stock_Id,
                unit_BuyPrice : this.state.tempPurchases[i].Buy_Price,
                unit_Qty : this.state.tempPurchases[i].Quantity,
                Purchase_Id : this.state.purchase_id,
                }  
              
              
              axios.post('/api/purchaseDetailsInsert',purchase_details).then(response => {
                if( response.status ===201) {
                  axios.delete(`/api/delTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                    if( response.status ===204){
                      axios.get(`/api/getTempPurchases/${this.state.pharm_id}/${this.state.emp_id}`).then(response => {
                        this.setState({
                          tempPurchases: response.data
                        }); 
                          }).catch(errors => {
                          console.log(errors)
                        }).finally(() => {
                          this.setState({
                            total:'0',
                            due:'0',
                            paid: '0',
                            date:'',
                            discount:'0',
                            finalTotal: '0',
                            selectedOption: null,
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
          
            toaster.notify("The Purchase entry was made successfully.", {
              position: "bottom-right",
              duration: 5000
            });
        }); 

    
    }

    calBal(){

      var disc = parseInt(this.state.discount)
      var totalBill = parseInt(this.state.total)
      this.setState({
        finalTotal : totalBill - disc 
      })
    }

    calBal1(){

      var paid = parseInt(this.state.paid)
      var totalBill = parseInt(this.state.finalTotal)
      this.setState({
        due : totalBill - paid 
      })
    }
  
  render() {
    const {products} = this.state
    const {tempPurchases} = this.state
    var temp=0
    var temp1=1
    
    let options = products.map(function (stocks) {
      return { value: stocks.Product_Id, label: stocks.Product };
    })

    let options1 = this.state.distributors.map(function (distributor) {
      return { value: distributor.Distributor_Id, label: distributor.Name };
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
                                <label id='Lfont1'><b>Grand Total:&nbsp;</b></label>
                                <input type='text' disabled id='total' name='total' value={this.state.total}/><b>Rs.</b>
                                <br></br><br></br>
                                <label id='Lfont1'><b>Discount:&nbsp;</b></label>
                                <input type='text' id='total' name='discount' value={this.state.discount} onChange={this.handleFieldChange} /><b>Rs.</b>
                                <br></br>
                                <label id='Lfont1'><b>Discounted Total:&nbsp;</b></label>
                                <input type='text' disabled id='total' name='finalTotal' value={this.state.finalTotal}/><b>Rs.</b>.&ensp;
                                <MDBIcon icon="calculator" onClick={this.calBal} style={{ cursor: 'pointer' }}/><br></br><br></br>                  
                                <label id='Lfont1'><b>Amount Paid:&nbsp;</b></label>
                                <input type='text' id='total' name='paid' value={this.state.paid} onChange={this.handleFieldChange} /><b>Rs.</b>
                                <br></br>
                                <label id='Lfont1'><b>Due Amount:&nbsp;</b></label>
                                <input type='text' disabled id='total' name='due' value={this.state.due}/><b>Rs.</b>.&ensp;
                                <MDBIcon icon="calculator" onClick={this.calBal1} style={{ cursor: 'pointer' }}/><br></br><br></br>
                                <label id='Lfont1'><b>Distributor:&nbsp;</b></label>
                                <Select
                                    name="distributor"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange1}
                                    clearable={true}
                                    searchable={true}
                                    autoFocus={true}
                                    placeholder='Please select a distributor.'
                                    options={options1}                
                                />
                                <br></br>
                                <label id='Lfont1'><b>Date:&nbsp;</b></label>
                                <input type="date" name="date" value={this.state.date} onChange={this.handleFieldChange}/><br></br><br></br>
                                <FormText color="muted">
                                 Please press the calculate button, to get the Corresponding Amounts.
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
                    <div className='card-header' id='col'><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h5 id='tp'>PurchaseEntry - Apothecary</h5></div>
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
                                    placeholder='Please select the product, you want to enter.'
                                    options={options}
                                    id='datalst'                 
                                />
                               &ensp;<MDBIcon icon="plus" onClick={this.onSbmt} id='addProd' className='cyan-text'/>
                             </form></Card> 
                             
                             <Card border='light'><Form id='prodDeets'>
                                &ensp;<h3 id='prodDeet2'>Product Details :</h3>
                                <Label style={{width:'14%'}}>Product Quantity:</Label>
                                <Input type='text' id='prodDeet1' placeholder='Please enter a numberic value >0' name='unit_qty' value={this.state.unit_qty} onChange={this.handleFieldChange} />
                                &ensp;&ensp;&ensp;&ensp;<Label style={{width:'10%'}}>Buy Price: </Label>
                                <Input type='text' id='prodDeet1' placeholder='Please enter a numberic value >0' name='buy_price' value={this.state.buy_price} onChange={this.handleFieldChange} />
                             </Form></Card> <br></br>

                            <Card border='info' style={{ width: '100%' }}>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>Product</th>
                                    <th>Description</th>                                    
                                    <th>Quantity</th>
                                    <th>Buy Price</th>
                                    <th>Subtotal</th>
                                    <th>Update/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tempPurchases.map(purchases => (
                                  <tr  key={purchases.Stock_Id}>
                                    <td>{purchases.Product}</td>
                                    <td>{purchases.Description}</td>
                                    <td contentEditable='true' onInput={e => this.setState({ updt_unit_qty:e.currentTarget.textContent})} suppressContentEditableWarning={true}>
                                    <MDBIcon icon='minus' className='cyan-text' style={{ cursor: 'pointer' }} onClick={() => this.qtyUpdate(purchases,temp)}/>&nbsp;{purchases.Quantity}&nbsp;<MDBIcon icon='plus' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.qtyUpdate(purchases,temp1)} /></td>
                                    <td contentEditable='true' onInput={e => this.setState({ updt_buy_price:e.currentTarget.textContent.slice(0, -3)})} suppressContentEditableWarning={true}>
                                      {purchases.Buy_Price}Rs.</td>
                                    <td>{purchases.Total_Price}Rs.</td>
                                    <td><MDBIcon icon='edit' className='cyan-text' style={{ cursor: 'pointer' }} id='updDel' onClick={() => this.Update(purchases)}/>&ensp;/&ensp;<MDBIcon icon='trash-alt' className='cyan-text' style={{ cursor: 'pointer' }}  onClick={() => this.delEntry(purchases)} /></td>

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
                            <Button variant="danger" id='clr' onClick={this.clear}>Empty App</Button>
                            <Link to="/purchases"><Button variant="light" id='sbmt1'>Purchase History</Button></Link>
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