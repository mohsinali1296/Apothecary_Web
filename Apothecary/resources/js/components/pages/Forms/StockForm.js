import React, { Component } from 'react'
import axios from 'axios'
import { Button, Label, CustomInput,Col,Row,FormText } from 'reactstrap';
import {MDBBtn, MDBModal,MDBIcon, MDBModalBody, MDBModalHeader} from 'mdbreact';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation-safe';
import {Link} from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import Select from 'react-select';
import toaster from "toasted-notes";

export default class StockForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
          modal8: false,
          modal9: false,
          loading: false,
          Pharm_Id: JSON.parse(localStorage["appState"]).user.id,
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
          DOE: '',
          Brand:'',
          selectedOption: null,
          selectedOption1: null,
          selectedOption2: null,
          selectedOption3: null,
          prescription_required:'0',
          options3:[],
          options4:[],
          formulae:[],
          brands:[],
          subs:[],
          categories:[],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)
        this.handleChange4 = this.handleChange4.bind(this)
        this.setPres = this.setPres.bind(this)
      }
      
      handleChange(selectedOption) {
        this.setState({
          Formula : selectedOption.value,
          selectedOption
        });
      }

      handleChange2(selectedOption) {
        this.setState({
          Category_Id : selectedOption.value,
          selectedOption2: selectedOption
        });
        axios.get(`/api/getSubs/${selectedOption.label}`).then(response => {
          this.setState({
            subs: response.data
          });
        }).catch(errors => {
        console.log(errors)
        }).finally(()=>{

        this.setState({
          options3: this.state.subs.map(function (listdata) {
            return { value: listdata.Id, label:listdata.DataName };
          })
        })

      });
      }

      handleChange3(selectedOption) {
        this.setState({
          sub_category : selectedOption.value,
          selectedOption3 : selectedOption
        });

        axios.get(`/api/getBrands/${selectedOption.value}`).then(response => {
          this.setState({
            brands: response.data
          });
        }).catch(errors => {
        console.log(errors)
        }).finally(()=>{

        this.setState({
          options4: this.state.brands.map(function (listdata) {
            return { value: listdata.Id, label:listdata.Brand_Name };
          })
        })

      });

      }

      handleChange4(selectedOption) {
        this.setState({
          Brand : selectedOption.value,
          selectedOption4: selectedOption,
        });
      }
      
      toggle = nr =>  () => {
        let modalName = 'modal' + nr;
        this.setState({
            [modalName]: !this.state[modalName]
        })
      }

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      setPres = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({
          [name]: value
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

       this.setState({
         options3 : [],
         options4 : [],
       })

        setTimeout(()=>{
          this.setState({
              loading:true
          })
        },2000)  

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
          unit_Qty: parseInt(this.state.unit_Qty),
          qty_per_leaf: parseInt(this.state.qty_per_leaf),
          qty_per_box: parseInt(this.state.qty_per_box),
          unit_price: parseInt(this.state.unit_price),
          leaf_price: parseInt(this.state.leaf_price),
          box_price: parseInt(this.state.box_price),
          DOE: this.state.DOE,
          Brand: this.state.Brand,
          prescription_required: parseInt(this.state.prescription_required),
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
          .catch(errors => {
            console.log(errors)
          })
      }

  render() {
     const { formulae } = this.state 
     const { categories } = this.state

    let options= formulae.map(function (listdata) {
      return { value: listdata.Id, label:listdata.Formula };
    })

    let options2= categories.map(function (listdata) {
      return { value: listdata.Id, label:listdata.DataName };
    })

    return (

     <>
          <div id='container1'>
          {this.state.loading ? <div> 
            <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader><br></br>
                                <MDBModalBody className="text-center">
                                <h5 className='black-text'>The data was submitted successfully.</h5><br></br>
                                <Link to="/stocks">
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon='times' className='mr-3'/>Close</MDBBtn></Link>
                                </MDBModalBody>
                              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader><br></br>
                                <MDBModalBody className="text-center">
                                <h5 className='black-text'>Data submission was unsucessfull, please try again.</h5><br></br>                                
                                <MDBBtn color="secondary" onClick={this.toggle(9)}><MDBIcon icon='times' className='mr-3'/>Close</MDBBtn>
                                </MDBModalBody>
                              </MDBModal>                  
            <div className='container py-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-8'>
                    <div className='card'>
                      <div className='card-header' id='col' ><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h4 id='tp'>Stock Entry</h4></div>
                          <div className='card-body'>
                <h4 id='tp'>Please fill out the Details Below</h4><br></br>
                <AvForm onValidSubmit={this.handleCreateNewProject}>
                                        
                    <AvGroup>
                    
                        <Label className='black-text' for="Name">Product Name<span id='redFont'>*</span></Label>
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
                        <Label  className='black-text' for="Item_Description">Item Description<span id='redFont'>*</span></Label>
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
                        <Label className='black-text' for="Formula">Formula<span id='redFont'>*</span></Label>
                        <Select
                                    name="formula"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    clearable={true}
                                    searchable={true}                                  
                                    placeholder='Please select a Formula.'
                                    options={options}                
                                />
                    </AvGroup></Col></Row>
                    <Row><Col><AvGroup>
                        <Label className='black-text' for="Category">Category<span id='redFont'>*</span></Label>
                        <Select
                                    name="category_id"
                                    value={this.state.selectedOption2}
                                    onChange={this.handleChange2}
                                    clearable={true}
                                    searchable={true}                                  
                                    placeholder='Please select a Category.'
                                    options={options2}                
                                />
                    </AvGroup></Col><Col>
                    <AvGroup>
                        <Label for="Sub-category">Sub Category<span id='redFont'>*</span></Label>
                        <Select
                                    name="sub_category"
                                    className='black-text'
                                    value={this.state.selectedOption3}
                                    onChange={this.handleChange3}
                                    clearable={true}
                                    searchable={true}                                  
                                    placeholder='Please select a Sub Category.'
                                    options={this.state.options3}                
                                />
                    </AvGroup></Col></Row>
                    <AvGroup>
                        <Label className='black-text' for="Brand">Brand<span id='redFont'>*</span></Label>
                        <Select
                                    name="Brand"
                                    value={this.state.selectedOption4}
                                    onChange={this.handleChange4}
                                    clearable={true}
                                    searchable={true}                                  
                                    placeholder='Please select a Brand.'
                                    options={this.state.options4}                
                                />
                    
                    </AvGroup>
                    <Row><Col><AvGroup>
                        <Label className='black-text'>Unit Quantity<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'>Unit Per Leaf<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'>Unit Per Box<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'>Unit Price (Rs.)<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'>Leaf Price (Rs.)<span id='redFont'>*</span></Label>
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
                        <Label className='black-text'>Box Price (Rs.)<span id='redFont'>*</span></Label>
                        <AvField
                          type="text"
                          name='box_price'
                          value={this.state.box_price}
                          onChange={this.handleFieldChange}
                          validate={{
                            required: {value: true, errorMessage: 'Box Price is required in order to register a product'},
                            number: {value: true, errorMessage: ' Price must be expressed only in numbers'},
                           
                          }} />
                        
                    </AvGroup></Col></Row><br></br>
                    <Row><Col><AvGroup>
                        <Label className='black-text'><h4>Prescription Requirement<span id='redFont'>*</span></h4></Label>
                        <AvRadioGroup inline name="prescription_required"  onChange={event => this.setPres(event)} required>
                        <AvRadio customInput label="Yes" value="1" />
                        <AvRadio customInput label="No" value="0" />
                        <AvFeedback>Please select an option.</AvFeedback>
                        </AvRadioGroup>
                        
                    </AvGroup></Col><Col>
                    <AvGroup id='doe'>
                    <Label className='black-text'><h4>Date of Expiry<span id='redFont'>*</span></h4></Label>
                    <input type='date' name='DOE' value={this.state.DOE} onChange={this.handleFieldChange} />
                    </AvGroup></Col></Row><br></br>
                    <FormText color="muted" id='tp'>
                      All fields marked with * are neccessary to be filled.
                    </FormText>
                  <div className='d-flex justify-content-center align-items-center'>
                  <Button><MDBIcon icon="check-circle" className='mr-3'/>Submit Data</Button></div>
                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
            
            :<div className='load'><div className="sweet-loading">
            <PropagateLoader
              size={20}
              color={"#4B0082"}
             /></div></div>}

   </div>          
   </>
)
}
}