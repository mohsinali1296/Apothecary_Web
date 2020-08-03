import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import DashboardPage from './pages/DashboardPage';
import {Link} from 'react-router-dom';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';



export default class Dashboard extends Component {

    constructor (props) {
        super(props)
        this.state = {
          pOrder: false,
          pharm_Id: JSON.parse(localStorage["appState"]).user.id,
          modal1: false,
        }  
         this.toggle = this.toggle.bind(this)
         this.orderInterval = this.orderInterval.bind(this)
    }

    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });

        this.interval = setInterval(() => 
            this.orderInterval(), 36000);
        this.orderInterval();    
        
    } 

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    orderInterval(){
        
            axios.get(`/api/getOrderList/${this.state.pharm_id}/0`).then(response => {
                if(response.status==200){
                this.setState({
                    pOrder: true,
                    modal1: true
                });} console.log(this.state.pOrder)
              }).catch(errors => {
              console.log(errors)
            })  
         

    }

    toggle() {
    
        this.setState({
            modal1: !this.state.modal1
        })
      }


    render() {
        return (
            <>
           {/*  <MDBModal toggle={this.toggle} isOpen={this.state.modal1} frame position="bottom" >
                                
                    <MDBModalBody className="text-center">
                     There are orders pending that need to be reviewed.
                    <Link to="/orders">
                    <MDBBtn color="primary" >Review Orders</MDBBtn></Link>
                    <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalBody>
            </MDBModal> */}

         
            
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
