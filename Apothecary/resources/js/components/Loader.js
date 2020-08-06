
import Home from './Home';
import React, { Component } from 'react'
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

 const override = css`
  display: block;
  margin: 2 auto;
`;
 

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
         <>   
            {this.state.loading ? <Home/>:<div className='load'><div className="sweet-loading">
            <CircleLoader
              css={override}
              size={125}
              color={"#123abc"}
            /></div></div>}
          
          </>
        );
      }

} 
          
      