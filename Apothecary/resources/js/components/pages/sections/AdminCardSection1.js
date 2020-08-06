import React,{ Component } from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol,MDBCardText } from 'mdbreact';
import axios from 'axios'
import { Progress } from 'reactstrap';


export default class AdminCardSection1 extends Component {
  
  constructor () {
    super()
    this.state = {
      numberOfSales:'',
      purchases:'',
      numberOfPurchases:'',
      sales:'',
      orders:'',
      pharm_id : JSON.parse(localStorage["appState"]).user.id,
    }}

  componentDidMount () {
    
    axios.get(`/api/numberOfSales/${this.state.pharm_id}`).then(response => {
        this.setState({
          numberOfSales: response.data
        });
      }).catch(errors => {
      console.log(errors)
    })

    axios.get(`/api/totalPurchases/${this.state.pharm_id}`).then(response => {
      response.data.map(purchase =>( 
        this.setState({
          numberOfPurchases : purchase.Count,
          purchases : purchase.Purchase_Sum_Total_Amount
        })  ))
    }).catch(errors => {
    console.log(errors)
  })

    axios.get(`/api/totalSales/${this.state.pharm_id}`).then(response => {
       response.data.map(sale =>( 
            this.setState({
              sales : sale.POS_Sum_TotalAmount
            })  ))
    }).catch(errors => {
    console.log(errors)
  })

  axios.get(`/api/totalOrders/${this.state.pharm_id}`).then(response => {
    this.setState({
      orders: response.data
    });
  }).catch(errors => {
  console.log(errors)
})

  }
  
  
  render() {
    return (
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color"/>
                <div className="data">
                  <p>Sales Entries</p>
                  <h5>
                    <strong>{this.state.numberOfSales}</strong>
                  </h5>
                </div>
              </div>
              <MDBCardBody>
              <Progress color="info" value={this.state.numberOfSales} />
                {/* <MDBCardText>Better than last week (25%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color"/>
                <div className="data">
                  <p>Annual Sales</p>
                  <h5>
                    <strong>{this.state.sales+"Rs."}</strong>
                  </h5>
                </div>
              </div>
              <MDBCardBody>
              <Progress color="info" value={this.state.sales} />
                {/* <MDBCardText>Worse than last week (25%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-pie" className="light-blue lighten-1"/>
                <div className="data">
                  <p>Purchase Entries</p>
                  <h5>
                    <strong>{this.state.purchases}</strong>
                  </h5>
                </div>
              </div>
              <MDBCardBody>
              <Progress color="info" value={this.state.purchases} />
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-bar" className="red accent-2"/>
                <div className="data">
                  <p>Annual Purchases</p>
                  <h5>
                    <strong>{this.state.numberOfPurchases}</strong>
                  </h5>
                </div>
              </div>
              <MDBCardBody>
              <Progress color="info" value={this.state.numberOfPurchases} />
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }
}


