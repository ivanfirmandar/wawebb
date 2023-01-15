import React from "react";
import { Card, Button } from "react-bootstrap";
import './ModalBox.css'


class ModalBox extends React.Component{
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
    closeTemplate = ()=>{
        document.getElementById(this.props.ids).style.display = "none"
    }
    render(){
        return(
            <div id={this.props.ids} style={{display:this.state.default}}>
                <Card id="ModalBox-container">
                <Card.Header>{this.props.header}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                    {this.props.text}
                    <a href={this.props.link}>{this.props.linkName}</a>
                    </Card.Text>
                    <Button variant="warning" style={{display:this.state.buttonDisplay}} className="button-modal" onClick={this.closeTemplate}>Tutup</Button>
                </Card.Body>
                </Card>
                <div id="modal-background">
                </div>
            </div>
           
        )
    }
}

export default ModalBox