import Config from '../config.json'
import axios from "axios";

const crud = {
    uploadPDF : async (e,parent)=>{
        const pdfFile = e.target.files[0]
        const formData = new FormData()
        formData.append('thepdf',pdfFile);
        formData.append('fileName',pdfFile.name)
        const url = Config.server_domain +'upload/pdfdata';
        const config = {
          headers:{
            'content-type': 'multipart/form-data'
          }
        }
        const response = await axios.post(url,formData,config)
        if(response.data.status == true){
          document.getElementById('checkListLogo').style.display = 'inline-block'
          parent.state.serverpdf = response.data.data
        }
      },
      uploadImage : async(e, parent)=>{
        const imageFile = e.target.files[0]
        const formData = new FormData()
        formData.append('theimage',imageFile)
        formData.append('fileName',imageFile.name)
        const url = Config.server_domain + 'upload/image'
        const config = {
          headers:{
            'content-type': 'multipart/form-data'
          }
        }
        const response = await axios.post(url,formData,config)
        if(response.data.status == true){
          console.log(response.data.data)
          document.getElementById('ImageForm-check').style.display = 'inline-block'
          parent.setState({
            imageurl : response.data.data
          })
        }
      },
      sendRecap : async (success, unregistered, unvalid, none, city)=>{
        let json = {
          success : success,
          unregistered : unregistered,
          unvalid : unvalid,
          none : none,
          total : success + unregistered + unvalid + none,
          city : city
        }
        const response = await fetch("https://backend-uppdnganjuk.vercel.app/api/whatsapush/sentrecap",{
          method : "POST",
          headers:{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(json)
        })
        let result = await response.json();
        
      }
}

export default crud


//<input class="form-control" type="file" id="formFile" name="thepdf" required onChange={(e)=>crud.uploadPDF(e,this)}></input>