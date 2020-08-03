import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import StocksPage from './pages/StocksPage';

export default class DashStock extends Component {
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
