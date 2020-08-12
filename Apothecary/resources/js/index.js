import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'mdbreact/dist/css/mdb.css';
import "toasted-notes/src/styles.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import DashStock from './components/DashStock';
import DashO from './components/DashOrder';
import DashD from './components/DashDistributor';
import Loader from './components/Loader';
import POS from './components/POS';
import EmpLogin from './components/EmpLogin'
import DashEmployee from './components/DashEmployee';
import EmpForm from './components/pages/forms/EmployeeForm';
import PPage from './components/pages/forms/ProfilePage';
import DistForm from './components/pages/forms/DistributorForm';
import CustForm from './components/pages/forms/CustomerForm';
import StockForm from './components/pages/forms/StockForm';
import ProfitLoss from './components/pages/sections/ProfitLossReport';
import SaleReturns from './components/pages/sections/SaleReturns';
import PurchaseReturns from './components/pages/sections/PurchaseReturns';
import DashC from './components/DashContact';
import DashCustomer from './components/DashCustomer';
import DashSales from './components/DashSales';
import DashPurchase from './components/DashPurchase';
import PurchaseEntry from './components/PurchaseEntry';

export default class Index extends Component {
    render() {
        return (
            
                
               <Router>
                            <Route path='/sales' component={DashSales} />
                            <Route path='/purchases' component={DashPurchase} />
                            <Route path='/purchaseEntry' component={PurchaseEntry} />
                            <Route path='/customers' component={DashCustomer} />
                            <Route path='/custform' component={CustForm}/>
                            <Route path='/distform' component={DistForm}/>
                            <Route path='/profitloss' component={ProfitLoss}/>
                            <Route path='/salereturns' component={SaleReturns}/>
                            <Route path='/purchasereturns' component={PurchaseReturns}/>
                            <Route path='/pos' component={POS}/>
                            <Route path='/profile' component={PPage}/>
                            <Route path='/stockform' component={StockForm}/>    
                            <Route path='/empform' component={EmpForm}/>
                            <Route path='/employees' component={DashEmployee} />
                            <Route path='/orders' component={DashO} />
                            <Route path='/contact' component={DashC} />
                            <Route path='/distributors' component={DashD} />
                            <Route path='/stocks' component={DashStock} />
                            <Route path='/dashboard' component={Dashboard} />
                            <Route path='/emplogin' component={EmpLogin} />
                            <Route exact path="/" component={Loader} /> 
               </Router> 
              
            
        );
    }
}


    ReactDOM.render(<Index />, document.getElementById('example'));




