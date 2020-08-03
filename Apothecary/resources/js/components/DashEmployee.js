import React, { Component } from 'react'
import Header from './topNavigation';
import Sidebar from './sideNavigation';
import Footer from './Footer';
import '../index.css';
import EmployeePage from './pages/EmployeePage';

export default class DashEmployee extends Component {
    render() {
        return (
            
            <div className="flexible-content">
         
                <Header/>
                <Sidebar/>
                <main id="content" className="p-5">
                <EmployeePage />
                 </main>
                <Footer />
         
            </div>
        
        )
    }
}
