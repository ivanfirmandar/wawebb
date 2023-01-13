import React from "react";
import { Card, Button } from "react-bootstrap";
import './ModalBox.css'


class ModalBox extends React.Component{
    constructor(props){
        super(props)
    }
    closeTemplate = ()=>{
        document.getElementById(this.props.ids).style.display = "none"
    }
    render(){
        return(
            <div id={this.props.ids} style={{display:"none"}}>
                <Card id="ModalBox-container">
                <Card.Header>{this.props.header}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                    {this.props.text}
                    </Card.Text>
                    <Button variant="warning" className="button-modal" onClick={this.closeTemplate}>Tutup</Button>
                </Card.Body>
                </Card>
                <div id="modal-background">
                </div>
            </div>
           
        )
    }
}

export default ModalBox