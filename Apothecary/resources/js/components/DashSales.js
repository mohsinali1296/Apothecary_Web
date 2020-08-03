import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import SalesPage from './pages/SalesPage';

export default class DashSales extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <SalesPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
