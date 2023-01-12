import React from "react";
import { Card, Button } from "react-bootstrap";
import './editForm.css'


class EditForm extends React.Component{
    constructor(props){
        super(props)
    }
    closeTemplate = ()=>{
        document.getElementById('editForm-master').style.display = "none"
    }
    render(){
        return(
            <div id="editForm-master">
                <Card id="editForm-container">
                <textarea class="form-control" aria-label="With textarea" id="edit-template"></textarea>
                <Button className="mt-2" onClick={this.props.save} id="save-template-button">Save</Button>
                <Button className="mt-2" onClick={this.closeTemplate} id="close-template-button" variant="warning">Close</Button>
                </Card>
                <div id="template-background">
                </div>
            </div>

           
        )
    }
}

export default EditForm