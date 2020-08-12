import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import PurchasePage from './pages/PurchasePage.js';
import toaster from "toasted-notes";

export default class DashPurchase extends Component {
    
    constructor () {
        super()
        this.state = {
          status_id:'0',
          orders: [],
          pharm_id: JSON.parse(localStorage["appState"]).user.id,
        }  
         this.orderInterval = this.orderInterval.bind(this)
    }


  
    componentDidMount() {

        this.interval = setInterval(() => 
        this.orderInterval(),36000);
            
        
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
                <div stlye={{ height : '100vh'}}>
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <PurchasePage />
                 </main>
                <Footer /></div>
                
          </>
        )
    }
}
