import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import DPage from './pages/DistributorPage';

export default class DashDistributor extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <DPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
