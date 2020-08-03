import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import CustomerPage from './pages/CustomerPage';

export default class DashCustomer extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <CustomerPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
