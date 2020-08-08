import React,{ Component } from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios'
import { Progress } from 'reactstrap';
import ScaleLoader from "react-spinners/ScaleLoader";

export default class AdminCardSection2 extends Component {
  
  constructor () {
    super()
    this.state = {
      expired:'',
      noStock:'',
      totalProducts:'',
      distributors:'',
      employees:'',
      loading: false,
      pharm_id : JSON.parse(localStorage["appState"]).user.id,
    }}

  componentDidMount () {
    
    axios.get(`/api/getExpired/${this.state.pharm_id}`).then(response => {
        this.setState({
          expired: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })

    axios.get(`/api/totalEmployees/${this.state.pharm_id}`).then(response => {
      this.setState({
        employees: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })

    axios.get(`/api/totalDistributors/${this.state.pharm_id}`).then(response => {
      this.setState({
        distributors: response.data
      });
    }).catch(errors => {
    console.log(errors)
  })

    axios.get(`/api/totalProducts/${this.state.pharm_id}`).then(response => {
      this.setState({
        totalProducts: response.data
      });
    }).catch(errors => {
    console.log(errors)
    })

    axios.get(`/api/getOutofStock/${this.state.pharm_id}`).then(response => {
        this.setState({
          noStock: response.data
        }); 
      }).catch(errors => {
      console.log(errors)
    })

    setTimeout(()=>{
      this.setState({
          loading:true
      })
    },4000)

  }

  render() {
  return (
    <>      {this.state.loading ? <div>
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon far icon="money-bill-alt"/>
              </div>
              <p className="white-text">Registered Employees</p>
              <h4><strong>{this.state.employees}</strong></h4>
            </MDBCardBody>
            <Progress color="warning" value={this.state.employees} />
            <MDBCardBody>
             {/*  <p>Better than last week (25%)</p> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-line"/>
              </div>
              <p className="white-text">Registered Distributors</p>
              <h4><strong>{this.state.distributors}</strong></h4>
            </MDBCardBody>
            <Progress color="warning" value={this.state.distributors} />
            <MDBCardBody>
               <p></p> 
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-pie"/>
              </div>
              <p className="white-text">No. Of Expired Products</p>
              <h4><strong>{parseInt((this.state.expired/this.state.totalProducts)*100)+"%"}</strong></h4>
            </MDBCardBody>
            <Progress color="warning" value={this.state.expired} />
            <MDBCardBody>
              <p>Total number of Expired Products: {this.state.expired}</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-bar"/>
              </div>
              <p className="white-text">Products out of Stock</p>
              <h4><strong>{parseInt((this.state.noStock/this.state.totalProducts)*100)+"%"}</strong></h4>
            </MDBCardBody>
            <Progress color="info" value={this.state.noStock} />
            <MDBCardBody>
              <p>Total number of Products Out of Stock: {this.state.noStock}</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </div> :<div className='load'><div className="sweet-loading">
      <ScaleLoader
        size={125}
        color={"#123abc"}
       /></div></div>}
    </>  
    )
  }

}