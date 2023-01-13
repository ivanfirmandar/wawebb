import React from "react";
import { Card, Button } from "react-bootstrap";
import './ImageForm.css'
import crud from '../Container/Manual/utils/crud'
import ImageTemplate from "../Images/imaage.png"
import checkImage from "../Images/checklist.png"


class ImageForm extends React.Component{
    constructor(props){
        super(props)
    }
    closeTemplate = ()=>{
        document.getElementById('ImageForm-master').style.display = "none"
    }
    render(){
        return(
            <div id="ImageForm-master">
                <Card id="ImageForm-container">
                <img id="theImage" src={"http://localhost:3001/images/" + this.props.url.filename} ></img>
                <div id="ImageForm-input-container">
                <input class="form-control" type="file" id="formFile" name="theimage" required onChange={(e)=>crud.uploadImage(e,this.props.parent)}></input>
                <img src={checkImage} id="ImageForm-check"></img>
                </div>
                <Button className="mt-2 button-image-edit" onClick={this.closeTemplate} variant="warning">Close</Button>
                </Card>
                <div id="template-background">
                </div>
            </div>

           
        )
    }
}

export default ImageForm