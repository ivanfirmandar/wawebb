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
            let city = document.getElementById("select-city").value
            this.props.parent.state.city = city;
            if (city != "0") {
                document.getElementById("LoginMaster").style.display = "none"
            }else{
document.getElementById("dipilih-dulu").style.display = "block"
            }
            

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
                    <Card.Text id="dipilih-dulu" style={{"display":"none"}}>Dipilih dulu massee...</Card.Text>
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