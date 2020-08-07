import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem,MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon,MDBBtn,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem} from 'mdbreact';
import {Link,NavLink } from 'react-router-dom';
import BellIcon from 'react-bell-icon';
import { AwesomeButton } from "react-awesome-button";


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
                <NavLink to="/purchases" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="shopping-cart" className="mr-3"/>
                        Purchases
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
                    <MDBNavbarNav left>
                        <MDBListGroup id='rpts'>
                        <NavLink to="/reports" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="table" className="mr-3"/>
                        Reports
                    </MDBListGroupItem>
                </NavLink>
                        </MDBListGroup>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                    <MDBNavItem>                          
                             <BellIcon width='32' active={false} animate={false} id='bell' /> &nbsp;&nbsp;&nbsp;
                    </MDBNavItem>     
                    <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret color="primary">
                        <MDBIcon icon="user-circle" size='2x' />&nbsp;&nbsp;&nbsp;&nbsp;
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                        <Link to="/profile" id='logout'>
                            <MDBDropdownItem >Profile</MDBDropdownItem></Link>
                         <Link to="/" id='logout1'> <MDBDropdownItem>Logout</MDBDropdownItem></Link> 
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>   

                        <MDBNavItem>
                        <Link to="/purchaseEntry">
                        <MDBBtn>
                        <MDBIcon icon="cart-plus" className="mr-1" />Purchase Entry</MDBBtn></Link>
                        </MDBNavItem>

                        <MDBNavItem>
                        <Link to="/pos">
                        <MDBBtn>
                        <MDBIcon icon="cash-register" className="mr-1" />POS</MDBBtn></Link>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;