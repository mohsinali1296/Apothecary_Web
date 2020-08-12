import React,{ Component } from 'react'
import axios from 'axios'
import {MDBTable, MDBTableHead, MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader } from 'mdbreact';
import {Link} from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";
import toaster from "toasted-notes";

export default class DistributorPage extends Component {
  constructor () {
    super()
    this.state = {
      orders:[],
      distributors: [],
      distId:'',
      loading: false,
      modal8:false,
      modal9:false,
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
      },2000) 

      let edit = {
        cust_id: '',
        stock_id:'',
        emp_id: '',
        dist_id:'',
      }
      let editState = {
        data: edit
      };
      localStorage["editState"] = JSON.stringify(editState); 
  }


  handleEdit(distId){
  
    let edit = {
      cust_id: '',
      stock_id:'',
      emp_id: '',
      dist_id: distId,
    }
    let editState = {
      data: edit
    };
    localStorage["editState"] = JSON.stringify(editState); 
    this.setState({
      modal9:true,
    })
  }

  handleDelEntry() {
    
    axios.put(`/api/distDestroy/${this.state.distId }`).then(response => {
      axios.get(`/api/getDistributor/${this.state.pharm_id}`).then(response => {
        this.setState({
          distributors: response.data
        });
      }).catch(errors => {
      console.log(errors)
      }).finally(() => {
        this.setState({
          modal8:false
        })
        toaster.notify("The Distributor data was successfully removed.", {
          position: "bottom-right",
          duration: 5000
      })
      }) 
     
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
                                <MDBBtn color="danger" onClick={this.handleDelEntry.bind(this)}><MDBIcon icon="check" className="mr-3" />Delete</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
              </MDBModal>

              <MDBModal toggle={this.toggle(9)} isOpen={this.state.modal9} >
                                <MDBModalHeader>Confirmation</MDBModalHeader>
                                <MDBModalBody className="text-center">
                                <p>Are you sure you want to edit this data?</p>
                                <Link to='/distform'><MDBBtn color="danger" ><MDBIcon icon="check" className="mr-3" />Confirm</MDBBtn></Link>
                                <MDBBtn color="secondary" onClick={this.toggle(9)}><MDBIcon icon="times" className="mr-3" />Cancel</MDBBtn>
                                </MDBModalBody>
              </MDBModal>

          <div id='wrap'>
          <h3 id='slctset'>Distributors: </h3>
          <Link to="/distform">
          <MDBBtn color="primary"><MDBIcon  icon="file-import" className="mr-3" />ADD A DISTRIBUTOR</MDBBtn></Link> </div>
            
            <MDBTable responsive striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Name</th>   
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Company Name</th>
                  <th>Address</th> 
                  <th>Edit/Delete</th>
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
                  <td><MDBIcon icon="pen"  style={{ cursor: 'pointer' }} className='cyan-text'   onClick={this.handleEdit.bind(this,distributor.Distributor_Id)}   ></MDBIcon> &nbsp;&nbsp;/&nbsp;&nbsp;
                      <MDBIcon icon="trash-alt"  style={{ cursor: 'pointer' }} className='cyan-text'  onClick={this.handleEntry.bind(this,distributor.Distributor_Id)}   ></MDBIcon></td> 

                  
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