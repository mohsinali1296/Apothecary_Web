import React,{ Component } from 'react'
import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';


export default class DashboardPage extends Component {
    
  render (){
    return (
    <React.Fragment> 
      <BreadcrumSection />
      <AdminCardSection1 />
      <ChartSection1 />
      <AdminCardSection2 />
    </React.Fragment>
    )
  }
}

