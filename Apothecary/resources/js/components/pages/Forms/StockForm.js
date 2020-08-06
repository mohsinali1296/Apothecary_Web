import React, { Component } from 'react'
import axios from 'axios'
import { Button, Label, CustomInput,Col,Row } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';




export default class StockForm extends Component {

 
toggle = nr =>  () => {
  let modalName = 'modal' + nr;
  this.setState({
      [modalName]: !this.state[modalName]
  })
}
    constructor (props) {
        const pharm_id= JSON.parse(localStorage["appState"]).user.id
        super(props)
        this.state = {
          modal8: false,
          modal9: false,
          Pharm_Id: pharm_id,
          Name: '',
          Item_Description: '',
          Item_Detailed_Description: '',
          Formula: '',
          Category_Id:'',
          sub_category: '',
          unit_Qty:'',
          qty_per_leaf: '',
          qty_per_box: '',
          unit_price:'',
          leaf_price: '',
          box_price:'',
          DOE:'',
          Brand:'',
          prescription_required:'0',
          formulae:[],
          brands:[],
          subs:[],
          categories:[],
          errors:[]
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)

      }

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

     componentDidMount () {
       
       axios.get(`/api/getFormulae`).then(response => {
         this.setState({
           formulae: response.data
         });
       }).catch(errors => {
       console.log(errors)
     })

     axios.get(`/api/getlistdata/1`).then(response => {
        this.setState({
          categories: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })

    axios.get(`/api/getlistdata/2`).then(response => {
        this.setState({
          subs: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })

    axios.get(`/api/getlistdata/3`).then(response => {
        this.setState({
          brands: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })
     } 
       

      handleCreateNewProject (event) {
        event.persist()

        const { history } = this.props

        const stock = {
          Pharm_Id: this.state.Pharm_Id,
          Name: this.state.Name,
          Item_Description: this.state.Item_Description,
          Item_Detailed_Description: this.state.Item_Detailed_Description,
          Formula: this.state.Formula,
          Category_Id: this.state.Category_Id,
          sub_category: this.state.sub_category,
          unit_Qty: this.state.unit_Qty,
          qty_per_leaf: this.state.qty_per_leaf,
          qty_per_box: this.state.qty_per_box,
          unit_price: this.state.unit_price,
          leaf_price: this.state.leaf_price,
          box_price: this.state.box_price,
          DOE: this.state.DOE,
          Brand: this.state.Brand,
          prescription_required: this.state.prescription_required,
        }
        console.log(stock)

        axios.post('/api/StockEntry', stock)
          .then(response => {
           
        
            if( response.status ===201) {
              this.setState({
                modal8:true
              })
              console.log(response.data)
            } 

            else{
              this.setState({
                modal9:true
              })
            }
             
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

  render() {
     const { formulae } = this.state 
     const { brands } = this.state
     const { subs } = this.state
     const { categories } = this.state
    return (

     
          <div id='container1'>
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>The data was submitted successfully.</p>
                                <Link to="/stocks">
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Close</MDBBtn></Link>
                                </MDBModalBody>
                              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Data submission was unsucessfull, please try again.</p>
                                
                                <MDBBtn color="secondary" onClick={this.toggle(9)}>Close</MDBBtn>
                                </MDBModalBody>
                              </MDBModal>                  
            <div className='container py-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-8'>
                    <div className='card'>
                      <div className='card-header' id='col' ><Link to="/stocks"><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }}/></Link><h4 id='tp'>Stock Entry</h4></div>
                          <div className='card-body'>

                <AvForm onValidSubmit={this.handleCreateNewProject}>
                    
                    
                     <AvGroup>
                        
                        <AvInput
                          id='Pharm_Id'
                          type='text'
                          name='Pharm_Id'
                          value={this.state.Pharm_Id}
                          hidden
                          readOnly
                        />
                        
                    </AvGroup> 
                    
                    
                    <AvGroup>
                    
                        <Label for="Name">Product Name<span id='red'>*</span></Label>
                        <AvInput
                          id='Name'
                          type='text'
                          name='Name'
                          value={this.state.Name}
                          onChange={this.handleFieldChange}
                          required
                        />
                        <AvFeedback>Product Name is required to register.</AvFeedback>
                    </AvGroup>
                    <Row><Col><AvGroup>
                        <Label for="Item_Description">Item Description<span id='red'>*</span></Label>
                        <AvInput
                          id='Item_Description'
                          type='textarea'
                          name='Item_Description'
                          value={this.state.Item_Description}
                          onChange={this.handleFieldChange}
                          required
                        />
                        <AvFeedback>Item Description is required to register.</AvFeedback>
                    </AvGroup></Col><Col>
                   
                    <AvGroup>
                        <Label for="Formula">Formula<span id='red'>*</span></Label>
                        <CustomInput type="select" id="Formula" name="Formula" value={this.state.Formula} onChange={this.handleFieldChange} >
                        {formulae.map(formula => (
                            
                            <option value={formula.Id} key={formula.Id}>{formula.Formula}</option>
                             
                         ))}
                    
                        </CustomInput>
                    </AvGroup></Col></Row>
                    <AvGroup>
                        <Label for="Brand">Brand<span id='red'>*</span></Label>
                        <CustomInput type="select" id="Brand" name="Brand" value={this.state.Brand} onChange={this.handleFieldChange} >
                        {brands.map(listdata => (
                            
                            <option value={listdata.Id} key={listdata.Id}>{listdata.DataName}</option>
                             
                         ))}
                    
                        </CustomInput>
                    </AvGroup>
                    <Row><Col><AvGroup>
                        <Label for="Category">Category<span id='red'>*</span></Label>
                        <CustomInput type="select" id="Category_Id" name="Category_Id" value={this.state.Category_Id} onChange={this.handleFieldChange} >
                        {categories.map(listdata => (
                            
                            <option value={listdata.Id} key={listdata.Id}>{listdata.DataName}</option>
                             
                         ))}
                        </CustomInput>
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label for="Sub-category">Sub Category<span id='red'>*</span></Label>
                        <CustomInput type="select" id="sub_category" name="sub_category" value={this.state.sub_category} onChange={this.handleFieldChange} >
                        {subs.map(listdata => (
                            
                            <option value={listdata.Id} key={listdata.Id}>{listdata.DataName}</option>
                             
                         ))}
                    
                        </CustomInput>
                    </AvGroup></Col></Row>
                    <Row><Col><AvGroup>
                        <Label>Unit Quantity<span id='red'>*</span></Label>
                        <AvField
                          type="text"
                          name='unit_Qty'
                          value={this.state.unit_Qty}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Unit Quantity is required in order to register a product'},
                            number: {value: true, errorMessage: ' Quantity must be expressed only in numbers'},
                           
                          }} />
                        
                    </AvGroup> </Col><Col>
                    <AvGroup>
                        <Label>Unit Per Leaf<span id='red'>*</span></Label>
                        <AvField
                          type="text" 
                          name='qty_per_leaf'
                          value={this.state.qty_per_leaf}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Quantity per Leaf is required in order to register a product'},
                            number: {value: true, errorMessage: ' Quantity must be expressed only in numbers'},
                           
                          }} />
                       
                    </AvGroup> </Col><Col>
                    <AvGroup>
                        <Label>Unit Per Box<span id='red'>*</span></Label>
                        <AvField
                          type="text"
                          name='qty_per_box'
                          value={this.state.qty_per_box}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Quantity per Box is required in order to register a product'},
                            number: {value: true, errorMessage: ' Quantity must be expressed only in numbers'},
                           
                          }} />
                    </AvGroup></Col></Row>
                    <Row><Col><AvGroup>
                        <Label>Unit Price (Rs.)<span id='red'>*</span></Label>
                        <AvField
                          type="text"
                          name='unit_price'
                          value={this.state.unit_price}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Unit Price is required in order to register a product'},
                            number: {value: true, errorMessage: ' Price must be expressed only in numbers'},
                           
                          }} />
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label>Leaf Price (Rs.)<span id='red'>*</span></Label>
                        <AvField
                          type="text"
                          name='leaf_price'
                          value={this.state.leaf_price}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Leaf Price is required in order to register a product'},
                            number: {value: true, errorMessage: ' Price must be expressed only in numbers'},
                           
                          }} />
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label>Box Price (Rs.)<span id='red'>*</span></Label>
                        <AvField
                          type="text"
                          name='box_price'
                          value={this.state.box_price}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Box Price is required in order to register a product'},
                            number: {value: true, errorMessage: ' Price must be expressed only in numbers'},
                           
                          }} />
                        
                    </AvGroup></Col></Row>
                    <Row><Col><AvGroup>
                        <Label><h4>Prescription Requirement<span id='red'>*</span></h4></Label>
                        <AvRadioGroup inline name="prescription_required"  onChange={this.handleFieldChange} required>
                        <AvRadio customInput label="Yes" value="1" />
                        <AvRadio customInput label="No" value="0" />
                        <AvFeedback>Please select an option.</AvFeedback>
                        </AvRadioGroup>
                        
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <AvField name="DOE" id='DOE' placeholder='DD/MM/YY' label="Date Of Expiry" type="text" validate={{dateRange: {format: 'DD/MM/YYYY', start: {value: '31/1/2020'}, end: {value: '31/12/2028'}}}} title="Use DD/MM/YYYY" />
                    </AvGroup></Col></Row>
                   
                  
                  <Button id='sbmt'>Submit Data</Button>
                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
            
       
    )
}
}