import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem,MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon,MDBBtn,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem} from 'mdbreact';
import {Link,NavLink } from 'react-router-dom';
import BellIcon from 'react-bell-icon';
import axios from 'axios'


class TopNavigation extends Component {
    constructor () {
        super()
        this.state = {
          collapse: false,
          bell:false,
          pharm_id: JSON.parse(localStorage["appState"]).user.id,  
        }  
         this.orderInterval = this.orderInterval.bind(this)
    }

    componentDidMount() {

        this.interval = setInterval(() => 
            this.orderInterval(),36000);
        this.orderInterval();    
        
    } 

    componentWillUnmount(){
        clearInterval(this.interval);
    }
 
    orderInterval(){
        
        axios.get(`/api/getOrderList/${this.state.pharm_id}/${this.state.status_id}`).then(response => {
          if(response.data.length>0){
            this.setState({
                bell:true
            });}
            else{
                this.setState({bell:false})
            }}).catch(errors => {
                console.log(errors)
              })
                
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
                <NavLink to="/contact" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                        <MDBIcon icon="envelope" className="mr-3"/>
                        Contact Us
                    </MDBListGroupItem>
                </NavLink>
                
            </MDBListGroup>

                    <MDBNavbarNav left>
                        
                        
                        
                            <MDBNavItem id='rpts'>
                                 <MDBDropdown>
                                    <MDBDropdownToggle nav caret color="primary"> 
                                    
                                        <MDBIcon icon="table" className="mr-3"/>
                                            Reports
                                     </MDBDropdownToggle> 
                        
                         <MDBDropdownMenu basic>
                             <Link to="/profitloss" id='logout'> 
                                <MDBDropdownItem ><MDBIcon icon="balance-scale" className="mr-3"/>Profit/Loss</MDBDropdownItem> </Link> 
                             <Link to="/" id='logout'>
                                <MDBDropdownItem>Logout</MDBDropdownItem> </Link>  
                        </MDBDropdownMenu>

                                    </MDBDropdown> 
                            </MDBNavItem>
                        
                    </MDBNavbarNav>

                    <MDBNavbarNav right>
                    <MDBNavItem>                          
                             <BellIcon width='32' active={this.state.bell} animate={this.state.bell} id='bell' /> &nbsp;&nbsp;&nbsp;
                    </MDBNavItem>     
                    <MDBNavItem>
                    <MDBDropdown>

                        <MDBDropdownToggle nav caret color="primary">
                            <MDBIcon icon="user-circle" size='2x' />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <Link to="/profile" id='logout'>
                            <MDBDropdownItem ><MDBIcon icon="user-cog" className="mr-3"/>Profile</MDBDropdownItem></Link>
                            <Link to="/" id='logout'> <MDBDropdownItem><MDBIcon icon="sign-out-alt" className="mr-3"/>Logout</MDBDropdownItem></Link> 
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