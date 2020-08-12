import React, { Component } from 'react'
import axios from 'axios'
import { MDBIcon, MDBTableHead, MDBTable,TableBody} from 'mdbreact';
import PropagateLoader from "react-spinners/PropagateLoader";


export default class SaleReturns extends Component {

    constructor (props) {
        super(props)
        this.state = {
          loading: false,
          saleReturns:[],  
          Pharm_Id: JSON.parse(localStorage["appState"]).user.id,
        }
        this.orderInterval = this.orderInterval.bind(this)
      }

      
      componentDidMount () {
       
        axios.get(`/api/getSalesReturns/${this.state.Pharm_Id}`).then(response => {
          this.setState({
            saleReturns: response.data      
          });
          }).catch(errors => {
            console.log(errors)
            })

            setTimeout(()=>{
              this.setState({
                  loading:true
              })
            },2800)    

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

  render() {

    return (

      <>    
          <div id='container1'>
              {this.state.loading ? <div>  
            <div className='container py-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-9'>
                    <div className='card'>
                       <div className='card-header' id='col' ><MDBIcon id='back' icon='arrow-left' size='2x' style={{ cursor: 'pointer' }} onClick={() => this.props.history.goBack()}/><h4 id='tp'>REPORTS</h4></div>
                          <div className='card-body'>
                          <h3 id='tp'>RETURN REPORT</h3>
                          <h4 id='tp'>Sale Returns</h4><br></br>
                          <MDBTable striped responsive>
                            <MDBTableHead>
                            <tr>
                                <th>Purchase ID</th>   
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Product Type</th>
                                <th>Returned Quantity</th>
                                <th>Amount Returned</th>
                                <th>Date</th>
                                <th>Time</th>
                                </tr>
                            </MDBTableHead>
                            <TableBody>
                             {this.state.saleReturns.map(returns => (
                                <tr key={returns.Id}>
                                <td>{returns.Sale_Id}</td>
                                <td>{returns.Product}</td>
                                <td>{returns.Description}</td>
                                <td>{returns.Product_Type}</td>
                                <td>{returns.Return_Quantity}</td>
                                <td>{returns.TotalPrice}</td>  
                                <td>{returns.Date}</td>
                                <td>{returns.Time}</td>
                                </tr> ))}        
                            </TableBody>
                            </MDBTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div> :<div className='load'><div className="sweet-loading">
                 <PropagateLoader
                   size={20}
                   color={"#4B0082"}
                  /></div></div>}
   
        </div>          
        </>
    )
}
}