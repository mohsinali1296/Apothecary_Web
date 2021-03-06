import React, { Component } from 'react'
import axios from 'axios'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import DashboardPage from './pages/DashboardPage';
import toaster from "toasted-notes";




export default class Dashboard extends Component {

    constructor () {
        super()
        this.state = {
          status_id:'0',
          orders: [],
          pharm_id: JSON.parse(localStorage["appState"]).user.id,
          emp_id: JSON.parse(localStorage["empState"]).user.id,
        }  
         this.orderInterval = this.orderInterval.bind(this)
    }

    componentDidMount() {

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });

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

            <div className="flexible-content">
            
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <DashboardPage />
                 </main>
                <Footer />
         
            </div>
            </>
        )
    }
}
