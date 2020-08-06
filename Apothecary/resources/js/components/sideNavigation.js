import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import logo from "../assets/artboard_3.png";

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed" style={{backgroundColor:"lightgrey"}}>
            <a className="logo-wrapper waves-effect">
                <img alt="Apothecary logo" style={{width:"100"}} className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush" color="cyan">
                <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/stocks" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                    <MDBIcon icon="warehouse"  className="mr-3"/>
                        Stock
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/sales" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="money-check-alt" className="mr-3"/>
                        Sales/POS History
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/orders" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="tasks" className="mr-3"/>
                        Orders
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/employees" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="user" className="mr-3"/>
                        Employees
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/distributors" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                    <MDBIcon icon="truck" className="mr-3"/>
                        Distributors
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/customers" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon far icon="address-book" className="mr-3"/>
                        Customers
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/reports" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="table" className="mr-3"/>
                        Reports
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/contact" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="envelope" className="mr-3"/>
                        Contact Us
                    </MDBListGroupItem>
                </NavLink>
                
            </MDBListGroup>
            

        
            
        </div>
    );
}

export default TopNavigation;