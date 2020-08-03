import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import OrderPage from './pages/OrderPage';

export default class DashOrder extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <OrderPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
