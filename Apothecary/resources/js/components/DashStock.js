import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import StocksPage from './pages/StocksPage';
import toaster from "toasted-notes";


export default class DashStock extends Component {
    
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
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <StocksPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
