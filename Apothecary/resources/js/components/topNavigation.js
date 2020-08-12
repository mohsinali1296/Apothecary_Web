import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem,MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon,MDBBtn,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem,MDBContainer,  MDBModal, MDBModalBody, MDBTableHead, MDBModalHeader, MDBModalFooter, MDBTable,TableBody} from 'mdbreact';
import {Link,NavLink } from 'react-router-dom';
import BellIcon from 'react-bell-icon';
import axios from 'axios';
import noti from "../assets/noti.png";


class TopNavigation extends Component {
    constructor () {
        super()
        this.state = {
          collapse: false,
          bell:false,
          modal1:false,
          modal2:false,
          orders:[],
          orderCount:'',
          pharm_id: JSON.parse(localStorage["appState"]).user.id,  
        }  
         this.orderInterval = this.orderInterval.bind(this)
         this.notification = this.notification.bind(this)
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
                orders: response.data,
                orderCount: response.data.length,
                bell:true
            });}
            else{
                this.setState({bell:false})
            }}).catch(errors => {
                console.log(errors)
              })
                
    }

    notification() {

        if(this.state.bell===true){
            this.setState({modal1:true})
        }

        else if(this.state.bell===false){
            this.setState({modal2:true})
        }


    }

    toggle1 = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
        [modalNumber]: !this.state[modalNumber]
        });
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
        <>
            <MDBContainer>
                <MDBModal isOpen={this.state.modal1} toggle={this.toggle1(1)}>
                <MDBModalHeader toggle={this.toggle1(1)}>
                    You have {this.state.orderCount} Pending Order(s):
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBTable striped>
                    <MDBTableHead>
                        <tr>
                        <th>Order ID</th>   
                        <th>Customer Name</th>
                        <th>Contact</th>
                        <th>Time</th>
                        </tr>
                    </MDBTableHead>
                    <TableBody>
                    {this.state.orders.map(orders => (
                        <tr key={orders.Order_Id}>
                        <td>{orders.Order_Id}</td>
                        <td>{orders.Customer_Name}</td>
                        <td>{orders.Contact}</td>
                        <td>{orders.Time}</td>  
                        </tr> ))}       
                    </TableBody>
                    </MDBTable>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-end">
                    <MDBBtn color="primary" outline onClick={this.toggle1(1)}>Close</MDBBtn>
                    <Link to='/orders'><MDBBtn color="primary" onClick={this.toggle1(1)}>Navigate to Orders tab</MDBBtn></Link>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>

            <MDBContainer className="justify-content-center">
                <MDBModal isOpen={this.state.modal2} toggle={this.toggle1(2)} centered>
                <MDBModalBody>
                <img src={noti} alt="No Available Notifications" id='noti' /><br></br> <br></br> 
                <b><p id='tp'>No new notifications available :(</p></b>
                </MDBModalBody>   
                {/* <MDBModalFooter className="justify-content-end">
                    <MDBBtn color="primary" outline onClick={this.toggle1(2)}>Close</MDBBtn>
                </MDBModalFooter> */}
                </MDBModal>
            </MDBContainer>

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
                        <MDBIcon icon="user-tie" className="mr-3"/>
                        Employees
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/distributors" activeClassName="activeClass">
                    <MDBListGroupItem color="secondary">
                    <MDBIcon icon="truck" className="mr-2"/>
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
                             <Link to="/salereturns" id='logout'>
                                <MDBDropdownItem><MDBIcon icon="undo" className="mr-1"/><MDBIcon icon="money-check-alt" className="mr-3"/>Sale Returns</MDBDropdownItem> </Link>
                             <Link to="/purchasereturns" id='logout'>
                                <MDBDropdownItem><MDBIcon icon="undo" className="mr-1"/><MDBIcon icon="shopping-cart" className="mr-3"/>Purchase Returns</MDBDropdownItem> </Link>    
                        </MDBDropdownMenu>

                                    </MDBDropdown> 
                            </MDBNavItem>
                        
                    </MDBNavbarNav>

                    <MDBNavbarNav right>
                    <MDBNavItem>                          
                             <BellIcon width='32' active={this.state.bell} animate={this.state.bell} id='bell' onClick={this.notification}/> &nbsp;&nbsp;&nbsp;
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
                        <MDBIcon icon="cart-plus" className="mr-1" />Invoice Entry</MDBBtn></Link>
                        </MDBNavItem>

                        <MDBNavItem>
                        <Link to="/pos">
                        <MDBBtn>
                        <MDBIcon icon="cash-register" className="mr-1" />POS</MDBBtn></Link>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
         </>   
        );
    }
}

export default TopNavigation;