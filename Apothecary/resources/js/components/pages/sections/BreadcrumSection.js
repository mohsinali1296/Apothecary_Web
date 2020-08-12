import React,{ Component } from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

export default class BreadcrumSection extends Component {
 
  constructor () {
    super()
    this.state = {
      pharm_name : JSON.parse(localStorage["appState"]).user.name,
    }}
 
  render() {
    return (
    <MDBCard className="mb-5">
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
        <h4>Welcome to your Control Panel,<b> {this.state.pharm_name}</b></h4>
            <MDBBreadcrumb>
                <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem>
            </MDBBreadcrumb>
{/*             <MDBFormInline className="md-form m-0">
                <input className="form-control form-control-sm" type="search" placeholder="Type your query" aria-label="Search"/>
                <MDBBtn size="sm" color="primary" className="my-0" type="submit"><MDBIcon icon="search" /></MDBBtn>
            </MDBFormInline> */}
        </MDBCardBody>
    </MDBCard>
    )
  }
}

