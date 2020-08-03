import React,{ Component } from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios'

export default class AdminCardSection2 extends Component {
  
  constructor () {
    super()
    this.state = {
      expired:'',
      noStock:'',
      pharm_id : JSON.parse(localStorage["appState"]).user.id,
    }}

  componentDidMount () {
    
    axios.get(`/api/getExpired/${this.state.pharm_id}`).then(response => {
        this.setState({
          expired: response.data
        }); console.log(this.state.expired)
      }).catch(errors => {
      console.log(errors)
    })

   axios.get(`/api/getOutofStock/${this.state.pharm_id}`).then(response => {
        this.setState({
          noStock: response.data
        }); console.log(this.state.expired)
      }).catch(errors => {
      console.log(errors)
    })
  }

  render() {
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon far icon="money-bill-alt"/>
              </div>
              <p className="white-text">SALES</p>
              <h4><strong>$2000</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
            </div>
            <MDBCardBody>
              <p>Better than last week (25%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="warning-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-line"/>
              </div>
              <p className="white-text">SUBSCRIPTIONS</p>
              <h4><strong>200</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
            </div>
            <MDBCardBody>
              <p>Worse than last week (25%)</p>
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
              <h4><strong>{this.state.expired}</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow={this.state.expired} className="progress-bar bg grey darken-3" role="progressbar"></div>
            </div>
            <MDBCardBody>
              <p>Better than last week (75%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-bar"/>
              </div>
              <p className="white-text">ORGANIC TRAFFIC</p>
              <h4><strong>2000</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
            </div>
            <MDBCardBody>
              <p>Better than last week (75%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

}