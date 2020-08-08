import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader";

export default class ChartSection1 extends Component {

    constructor (props) {
        super(props)
        this.state = {
          ordersComplete:[],
          finalOrdersComplete:[],
          ordersCancel:[],
          finalOrdersCancel:[],
          totalOrders:[],
          finalTotalOrders:[],
          graphData:[],
          finalGraphData:[],
          weeksSale:'',
          loading: false,  
          pharm_id: JSON.parse(localStorage["appState"]).user.id,
        }
      }


    componentDidMount () {
        
        var temp=0;
        axios.get(`/api/weeksSale/${this.state.pharm_id}`).then(response => {
            
            response.data.map(sales => (
                temp = temp+parseInt(sales.Sum_Total_Amount)
                ))
            
            }).catch(errors => {
            console.log(errors)
         }).finally(() =>{

            this.setState({
                weeksSale: temp
            });
         })

        axios.get(`/api/saleGraphData/${this.state.pharm_id}`).then(response => {
            this.setState({
                graphData: response.data
            });
            }).catch(errors => {
            console.log(errors)
         }).finally(() =>{
        
            var months = []
            var sumData=[]  
            for(var i=0 ; i<this.state.graphData.length;i++){
                months[i]=this.state.graphData[i].monthname
                sumData[i]=this.state.graphData[i].Sum_Total_Amount  
                } 
            
            var intMonths = []
            for(var i=0 ; i<months.length;i++){
                
                if(months[i]==='January'){ intMonths[i]=0}
                else if(months[i]==='February'){ intMonths[i]=1}
                else if(months[i]==='March'){ intMonths[i]=2}
                else if(months[i]==='April'){ intMonths[i]=3}
                else if(months[i]==='May'){ intMonths[i]=4}
                else if(months[i]==='June'){ intMonths[i]=5}
                else if(months[i]==='July'){ intMonths[i]=6}
                else if(months[i]==='August'){ intMonths[i]=7}
                else if(months[i]==='September'){ intMonths[i]=8}
                else if(months[i]==='October'){ intMonths[i]=9}
                else if(months[i]==='November'){ intMonths[i]=10}
                else if(months[i]==='December'){ intMonths[i]=11}

                } 
            var finalData=[0,0,0,0,0,0,0,0,0,0,0,0]
            for(var i=0 ; i<intMonths.length;i++){
                finalData[parseInt(intMonths[i])] = sumData[i]
            }
            
            this.setState({
                finalGraphData : finalData
            })

          })

          axios.get(`/api/totalOrders/${this.state.pharm_id}`).then(response => {
            this.setState({
                totalOrders: response.data
            });
            }).catch(errors => {
            console.log(errors)
            }).finally(() =>{
        
            var months = []
            var sumData=[]  
            for(var i=0 ; i<this.state.totalOrders.length;i++){
                months[i]=this.state.totalOrders[i].monthname
                sumData[i]=this.state.totalOrders[i].count  
                } 
            
            var intMonths = []
            for(var i=0 ; i<months.length;i++){
                
                if(months[i]==='January'){ intMonths[i]=0}
                else if(months[i]==='February'){ intMonths[i]=1}
                else if(months[i]==='March'){ intMonths[i]=2}
                else if(months[i]==='April'){ intMonths[i]=3}
                else if(months[i]==='May'){ intMonths[i]=4}
                else if(months[i]==='June'){ intMonths[i]=5}
                else if(months[i]==='July'){ intMonths[i]=6}
                else if(months[i]==='August'){ intMonths[i]=7}
                else if(months[i]==='September'){ intMonths[i]=8}
                else if(months[i]==='October'){ intMonths[i]=9}
                else if(months[i]==='November'){ intMonths[i]=10}
                else if(months[i]==='December'){ intMonths[i]=11}

                } 
            var finalData=[0,0,0,0,0,0,0,0,0,0,0,0]
            for(var i=0 ; i<intMonths.length;i++){
                finalData[parseInt(intMonths[i])] = sumData[i]
            }
            
            this.setState({
                finalTotalOrders : finalData
            })

          })

          axios.get(`/api/completedOrders/${this.state.pharm_id}`).then(response => {
            this.setState({
                ordersComplete: response.data
            });
            }).catch(errors => {
            console.log(errors)
         }).finally(() =>{
        
            var months = []
            var sumData=[]  
            for(var i=0 ; i<this.state.ordersComplete.length;i++){
                months[i]=this.state.ordersComplete[i].monthname
                sumData[i]=this.state.ordersComplete[i].count
                } 
            
            var intMonths = []
            for(var i=0 ; i<months.length;i++){
                
                if(months[i]==='January'){ intMonths[i]=0}
                else if(months[i]==='February'){ intMonths[i]=1}
                else if(months[i]==='March'){ intMonths[i]=2}
                else if(months[i]==='April'){ intMonths[i]=3}
                else if(months[i]==='May'){ intMonths[i]=4}
                else if(months[i]==='June'){ intMonths[i]=5}
                else if(months[i]==='July'){ intMonths[i]=6}
                else if(months[i]==='August'){ intMonths[i]=7}
                else if(months[i]==='September'){ intMonths[i]=8}
                else if(months[i]==='October'){ intMonths[i]=9}
                else if(months[i]==='November'){ intMonths[i]=10}
                else if(months[i]==='December'){ intMonths[i]=11}

                } 
            var finalData=[0,0,0,0,0,0,0,0,0,0,0,0]
            for(var i=0 ; i<intMonths.length;i++){
                finalData[parseInt(intMonths[i])] = sumData[i]
            }
            
            this.setState({
                finalOrdersComplete : finalData
            })

          })

          axios.get(`/api/cancelledOrders/${this.state.pharm_id}`).then(response => {
            this.setState({
                ordersCancel: response.data
            });
            }).catch(errors => {
            console.log(errors)
         }).finally(() =>{
        
            var months = []
            var sumData=[]  
            for(var i=0 ; i<this.state.ordersCancel.length;i++){
                months[i]=this.state.ordersCancel[i].monthname
                sumData[i]=this.state.ordersCancel[i].count 
                } 
            
            var intMonths = []
            for(var i=0 ; i<months.length;i++){
                
                if(months[i]==='January'){ intMonths[i]=0}
                else if(months[i]==='February'){ intMonths[i]=1}
                else if(months[i]==='March'){ intMonths[i]=2}
                else if(months[i]==='April'){ intMonths[i]=3}
                else if(months[i]==='May'){ intMonths[i]=4}
                else if(months[i]==='June'){ intMonths[i]=5}
                else if(months[i]==='July'){ intMonths[i]=6}
                else if(months[i]==='August'){ intMonths[i]=7}
                else if(months[i]==='September'){ intMonths[i]=8}
                else if(months[i]==='October'){ intMonths[i]=9}
                else if(months[i]==='November'){ intMonths[i]=10}
                else if(months[i]==='December'){ intMonths[i]=11}

                } 
            var finalData=[0,0,0,0,0,0,0,0,0,0,0,0]
            for(var i=0 ; i<intMonths.length;i++){
                finalData[parseInt(intMonths[i])] = sumData[i]
            }
            
            this.setState({
                finalOrdersCancel : finalData
            })

          })

          setTimeout(()=>{
            this.setState({
                loading:true
            })
          },3500)
      } 

    render(){

        const dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
            {
                label: 'Total Orders Received',
                data: this.state.finalTotalOrders,
                backgroundColor: 'rgba(245, 74, 85, 0.5)',
                borderWidth: 1
            }, {
                label: 'Completed Orders',
                data: this.state.finalOrdersComplete,
                backgroundColor: 'rgba(90, 173, 246, 0.5)',
                borderWidth: 1
            }, {
                label: 'Cancelled Orders',
                data: this.state.finalOrdersCancel,
                backgroundColor: 'rgba(245, 192, 50, 0.5)',
                borderWidth: 1
            }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            dataset: {
            xAxes: [{
                barPercentage: 1,
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                }
            }],
            yAxes: [{
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                beginAtZero: true
                }
            }]
            }
        }

        const dataPie = {
            
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
            {
                data: this.state.finalGraphData,
                backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad','#A52A2A','#0000FF','#006400','#FFD700','#FF1493'],
                hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db','#DEB887','#6495ED','#556B2F','#DAA520','#FF69B4']
            }
            ]
        }
        return (
            <>      {this.state.loading ? <div>
                
            <MDBRow className="mb-4">
                <MDBCol md="8"className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <Bar data={dataBar} height={500} options={barChartOptions} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Sales Comparison(in Rs.)</MDBCardHeader>
                        <MDBCardBody>
                            <Pie data={dataPie} height={300} options={{responsive: true}} />
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                        <MDBCardHeader>This Week's Data</MDBCardHeader>
                            <MDBListGroup className="list-group-flush">
                                <MDBListGroupItem>
                                    Sales
                                    <MDBBadge color="success-color" pill className="float-right">
                                        {this.state.weeksSale+'Rs.'}
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Purchases
                                    <MDBBadge color="danger-color" pill className="float-right">
                                        5%
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Orders
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        14
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Issues
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        123
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Messages
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        8
                                    </MDBBadge>
                                </MDBListGroupItem>
                            </MDBListGroup>
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


