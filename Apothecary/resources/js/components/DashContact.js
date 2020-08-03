import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import ContactPage from './pages/ContactUs';

export default class DashContact extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <ContactPage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
