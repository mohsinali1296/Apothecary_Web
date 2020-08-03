import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem,MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon,MDBBtn,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem} from 'mdbreact';
import {Link,NavLink } from 'react-router-dom';
import './Home.css';

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling style={{backgroundColor:"lightgrey"}}>
               
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>

                    <MDBListGroup className="list-group-flush" color="cyan" id='visi'>
                <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/stock" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                    <MDBIcon icon="warehouse"  className="mr-3"/>
                        Stock
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/invoice" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="money-check-alt" className="mr-3"/>
                        POS History
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/employee" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="user" className="mr-3"/>
                        Employees
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/distributor" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                    <MDBIcon icon="truck" className="mr-3"/>
                        Distributors
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/customer" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon far icon="address-book" className="mr-3"/>
                        Customers
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/report" activeClassName="activeClass">
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
                    <MDBNavbarNav right>
                    <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret color="primary">
                        <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                        <Link to="/profile" id='link'>
                            <MDBDropdownItem >Profile</MDBDropdownItem></Link>
                         <Link to="/" id='link'> <MDBDropdownItem>Logout</MDBDropdownItem></Link> 
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                         <MDBNavItem>
                            <a className="nav-link navbar-link" ><MDBIcon fab icon="twitter" /></a>
                        </MDBNavItem> 
                        <MDBNavItem>
                        <Link to="/POS">
                        <MDBBtn>POS</MDBBtn></Link>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;