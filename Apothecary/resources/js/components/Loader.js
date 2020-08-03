import { RotateScale } from 'styled-loaders-react'
import Home from './Home';
import React, { Component } from 'react'


export default class Loader extends Component {
    
    state = {
        loading:false
    }

    componentDidMount = () =>{
        setTimeout(()=>{
            this.setState({
                loading:true
            })
        },3000)
    }
    render() {
        return (
            <div>
                {this.state.loading ? <Home/>:<div className="load"><RotateScale color="cyan" size="100px"/></div> }
            </div>
        )
    }
}

           
            
      