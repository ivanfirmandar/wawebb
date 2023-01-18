import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import Client from "../client.json"
import './Login.css'


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            default : "none",
            buttonDisplay : "inline-block"
        }
        if(this.props.default != undefined){
            this.state.default = this.props.default
        }
        if(this.props.buttonDisplay != undefined){
            this.state.buttonDisplay = this.props.buttonDisplay
        }
    }
    loginUser = ()=>{
    this.props.parent.state.city = document.getElementById("select-city").value
            document.getElementById("LoginMaster").style.display = "none"

    }
    render(){
        return(
            <div id="LoginMaster">
                <Card id="Login-container">
                <Card.Header>Masuk</Card.Header>
                <Card.Body>
                    <Form.Select aria-label="Default select example" id="select-city">
                    <option value="0">Pilih UPT</option>
                    {Client.city.map((each)=>{
                        return <option value={each}>{each}</option>
                    })}
                    </Form.Select>
                    <Button variant="warning" style={{display:this.state.buttonDisplay}} className="button-modal" onClick={this.loginUser}>Masuk</Button>
                </Card.Body>
                </Card>
                <div id="modal-background">
                </div>
            </div>
           
        )
    }
}

export default Login