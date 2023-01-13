import React from "react";
import { Card, Button } from "react-bootstrap";
import './LoadingScreen.css'
import loadingLogo from "../Images/loading2.gif"


class LoadingScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="load-screen" style={{display:"none"}}>
                <img src={loadingLogo} id="load-img"></img>
                <div id="load-screen-overlay">
                </div>
            </div>
           
        )
    }
}

export default LoadingScreen