import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";


export default class DistributorPage extends Component {
  constructor () {
    super()
    this.state = {
      orders:[],
      distributors: [],
      distId:'',
      loading: false,
      modal8:false,
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
    
  axios.get(`/api/getDistributor/${this.state.pharm_id}`).then(response => {
      this.setState({
        distributors: response.data
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


  handleEdit(distId){
    let edit = {
      editId: distId
    }
    console.log(distId)
    localStorage["editState"] = JSON.stringify(edit);
  }

  handleDelEntry() {
    const DistId = this.state.distId 
    axios.put(`/api/distDestroy/${DistId}`).then(response => {
      
      console.log(this.state.DistId)
      window.location.reload(false); 
    }).catch(errors => {
    console.log(errors)
  }) 
  }

  handleEntry(DistId){
    this.setState({
      distId: DistId,
      modal8:true
    });
    
  }

  render() {
   
    const { distributors } = this.state
  return (
    <>       {this.state.loading ? <div>
   <MDBModal toggle={this.toggle(8)} isOpen={this.state.modal8} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to delete this data?</p>
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)}>Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Cancel</MDBBtn>
                                </MDBModalBody>
   </MDBModal>

   <Link to="/distform">
   <MDBBtn color="primary">ADD A DISTRIBUTOR</MDBBtn></Link>
            
            <MDBTable responsive striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Name</th>   
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Company Name</th>
                  <th>Address</th> 
                  <th></th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {distributors.map(distributor => (
                <tr key={distributor.Distributor_Id}>
                  <td>{distributor.Name}</td>
                  <td>{distributor.Email}</td>
                  <td>{distributor.Contact}</td>
                  <td>{distributor.Company_Name}</td>
                  <td>{distributor.Distributor_Address}</td>
                  <td><MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }}   onClick={this.handleEntry.bind(this,distributor.Distributor_Id)}   ></MDBIcon>
                  &ensp;&ensp;<MDBIcon icon="pen"  style={{ cursor: 'pointer' }}   onClick={this.handleEdit.bind(this,distributor.Distributor_Id)}   ></MDBIcon></td> 

                  
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