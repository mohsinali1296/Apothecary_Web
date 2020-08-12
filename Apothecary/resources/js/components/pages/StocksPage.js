import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import toaster from "toasted-notes";

export default class StocksPage extends Component {
  constructor () {
    super()
    this.state = {
      stocks: [],
      stockId:'',
      modal8:false,
      loading: false,
      pharm_id: JSON.parse(localStorage["appState"]).user.id,
    }
  }

  toggle = nr =>  () => {
    let modalName = 'modal' + nr;
    this.setState({
        [modalName]: !this.state[modalName]
    })
  }

  componentDidMount () {
    
    axios.get(`/api/getStock/${this.state.pharm_id}`).then(response => {
      this.setState({
        stocks: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })

  setTimeout(()=>{
    this.setState({
        loading:true
    })
    },2000)
  }
  
  handleEdit(stockId){
    let edit = {
      editId: stockId
    }
    console.log(stockId)
    localStorage["editState"] = JSON.stringify(edit);
  }

  handleDelEntry() {
    axios.put(`/api/stockDestroy/${this.state.stockId }`).then(response => {
      axios.get(`/api/getStock/${this.state.pharm_id}`).then(response => {
        this.setState({
          stocks: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })
      
    }).catch(errors => {
    console.log(errors)
  }).finally(() => {
    this.setState({
      modal8:false
    })
    toaster.notify("The Product Data was successfully removed.", {
      position: "bottom-right",
      duration: 5000
  })
  }) 
  }

  handleEntry(StockId){
    this.setState({
      stockId: StockId,
      modal8:true
    });
    
  }

  render() {
   
    const { stocks } = this.state
  return (
    <>       {this.state.loading ? <div>
   <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to delete this data?</p>
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)}><MDBIcon icon="check" className="mr-3" />Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
   </MDBModal>
  
   <div id='wrap'>
   <h3 id='slctset'>Inventory: </h3>
   <Link to="/stockform">
   <MDBBtn color="primary"><MDBIcon  icon="file-import" className="mr-3" />ADD STOCK</MDBBtn></Link> </div>
            
            <MDBTable responsive striped >
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Product Name</th>   
                  <th>Description</th>
                  <th>Formula</th>
                  <th>Category</th>
                  <th>Sub-Category</th>
                  <th>Brand</th>
                  <th>Stock</th> 
                  <th>Unit Per Leaf</th>
                  <th>Unit Per Box</th>
                  <th>Unit Price(Rs.)</th>
                  <th>Leaf Price(Rs.)</th>
                  <th>Box Price (Rs.)</th>
                  <th>Date of Expiry</th>
                  <th>Edit/Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {stocks.map(stocks => (
                <tr key={stocks.Product_Id}>
                  <td>{stocks.Product_Name}</td>
                  <td>{stocks.Item_Description}</td>
                  <td>{stocks.Formula_Name}</td>
                  <td>{stocks.Category_Name}</td>
                  <td>{stocks.SubCategory_Name}</td>
                  <td>{stocks.Brand_Name}</td>
                  <td>{stocks.unit_Qty}</td>
                  <td>{stocks.qty_per_leaf}</td>
                  <td>{stocks.qty_per_box}</td>
                  <td>{stocks.unit_price}</td>
                  <td>{stocks.leaf_price}</td>
                  <td>{stocks.box_price}</td>
                  <td>{stocks.DOE}</td>
                  <td><MDBIcon icon="pen"  style={{ cursor: 'pointer' }}  className='cyan-text' onClick={this.handleEdit.bind(this,stocks.Product_Id)}   ></MDBIcon>&nbsp;/&nbsp; 
                      <MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }}   className='cyan-text' onClick={this.handleEntry.bind(this,stocks.Product_Id)}   ></MDBIcon></td>

                  
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

