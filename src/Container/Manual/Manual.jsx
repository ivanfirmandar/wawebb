import { io } from "socket.io-client"
import Button from 'react-bootstrap/Button'
import { Card, Table } from 'react-bootstrap'
import QRCode from 'react-qr-code'
import textParser from "./utils/textParser"
import React from 'react';
import LoadingImage from '../../Images/loading.gif'
import "./Manual.css"
import ModalBox from '../../Components/ModalBox'
import EditForm from '../../Components/EditForm'
import ImageForm from "../../Components/ImageForm"
import LoadingScreen from "../../Components/LoadingScreen"
import Config from './config.json'
import checkListLogo from "../../Images/checklist.png"
import socketHandler from "./utils/socket"
import crud from "./utils/crud"

const socket = io(Config.server_domain)

class Insert extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
         <textarea class="form-control" aria-label="With textarea" id="template-text" value={this.props.template}></textarea>
        <Button className="mt-2" onClick={this.props.editTemplate} id="edit-template-button">Edit</Button>
      </div>
    )
  }
}

class Manual extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      qrcode: "",
      pdfFile : null,
      serverpdf : null,
      datas : [],
      template : null,
      refresh : false,
      imageurl : {
        filename : null
      }
    }
    this.state.refresh = false
    socketHandler(socket,this)
  }
  connectDevice(){
    socket.emit('getQR', Date.now());
    document.getElementById('qrcodeload').style.display = "block"
 }
  sendWA = ()=>{
    let isAlreadyScan = document.getElementsByClassName('client-data-sub-info')[0].innerHTML
    if(isAlreadyScan != "undefined"){
      socket.emit('sendWA',textParser.compileData(this));
    }else{
      document.getElementById('modal-send').style.display = "block"
    }
  }
  readPdf = ()=>{
    socket.emit("readData",this.state.serverpdf.filename)
  }
  openImage = ()=>{
    document.getElementById('ImageForm-master').style.display = "block"
  }
  editTemplate = ()=>{
    document.getElementById('edit-template').value = this.state.template
    document.getElementById('editForm-master').style.display = "inline-block"
  }
  saveTemplate = ()=>{
    socket.emit('save-template',{
      text : document.getElementById('edit-template').value
    })
    document.getElementById('modal-template').style.display = "block"
    this.setState({
      template :document.getElementById('edit-template').value
    })
  }
  
  render(){
    let qrCodePicture;
    console.log("RENDERING COMPONENTS")
    if(this.state.qrcode==""){
        qrCodePicture = <p id="qrhere">QR Code berada di sini</p>
    }else{
        qrCodePicture = <QRCode value={this.state.qrcode} id="Manual-qr" size={512}/>
    }
    return(
      <div id="master-container">
        <LoadingScreen />
        <ImageForm url={this.state.imageurl} parent={this} />
        <ModalBox header="Pengumuman" text="Nyalakan dulu servernya, wahai Manusia! " ids="turn-server" default="block" buttonDisplay="none" linkName="Download Server" link={Config.downloadlink}/>
        <ModalBox header="Pengumuman" text="Scan dulu ya" ids="modal-send"/>
        <ModalBox header="Pengumuman" text="Berhasil mengubah!" ids="modal-template"/>
        <ModalBox header="Pengumuman" text="Telepon genggam berhasil terhubung!" ids="connect-template"/>
        <ModalBox header="Pengumuman" text="Pengiriman selesai" ids="send-done"/>
        <EditForm save = {this.saveTemplate}/>
      <div id="Manual-container">
        <Card id="Manual-card">
            <Card id="Manual-qr-card">
                <Button id="say-hi" onClick={()=>{
                  window.open("http://wa.me/6285171735484",'_blank')
                }}><a>© UPT PPD Nganjuk | Ivan Firmanda  2021. All right reserved</a></Button>
                <img src={LoadingImage} className="loadingImage" id="qrcodeload"></img>
                {qrCodePicture}
                <Button onClick={this.connectDevice} variant="warning" id="Manual-button-connect">Connect</Button>
                <small class="text-muted">Scan QR Code yang akan ditampilkan diatas untuk menyambungkan aplikasi dengan device</small>
                <Card id="client-data">
                  <div className="client-data-sub">
                    <p>User : </p><b className="client-data-sub-info">undefined</b>
                  </div>
                  <div className="client-data-sub">
                    <p>Platform : </p><b className="client-data-sub-info">undefined</b>
                  </div>
                  <div className="client-data-sub">
                    <p>Pushname : </p><b className="client-data-sub-info">undefined</b>
                  </div>
                </Card>
                <div className="mt-2">
                  <div className="nopol-detail color-detail" style={{backgroundColor:"green"}}><p className="color-desc color-detail">Berhasil Mengirim</p>
                  </div>
                  <div className="nopol-detail color-detail" style={{backgroundColor:"orange"}}><p className="color-desc color-detail">Nomor Tidak terdaftar</p>
                  </div>
                  <div className="nopol-detail color-detail" style={{backgroundColor:"red"}}>
                  <p className="color-desc color-detail">Nomor Tidak Valid</p>
                  </div>
                  <div className="nopol-detail color-detail" style={{backgroundColor:"gray"}}>
                  <p className="color-desc color-detail">Tidak ada nomor</p>
                  </div>
                </div>
                
            </Card>
        <div id="read-file">
        <div class="mb-3">
          <label for="formFile" className="form-label" id="file-label">Unggah Berkas</label>
          <img src={checkListLogo} className="icon" id="checkListLogo"></img>
          <input class="form-control" type="file" id="formFile" name="thepdf" required onChange={(e)=>crud.uploadPDF(e,this)}></input>
        </div>
        <Button variant="danger" id="Manual-button" className="theButtons" onClick={this.readPdf}>Read</Button>
        <Button variant="warning" id="Manual-button-image" onClick={this.openImage} className="theButtons">Image</Button>
        <Button variant="info" id="Manual-button-send" onClick={this.sendWA} className="theButtons">Send</Button>
        <div>
          <Card className="mt-3" id="table-container">
            {this.state.datas.map((data)=>{
              if(this.state.datas.length >0){
                return(
                  <div className="nopol-detail" onMouseOver={()=>textParser.nopolDetail(data.no_urut,this)} id={data.no_surat}>
                    <b>{data.no_urut}</b>
                  </div>
                )
              }else{
                return;
              }
            })}
          </Card>
        </div>
        <Card id="data-preview">
          <div>
            <p>#01# Nomor Surat</p>
            <p>#02# Plat Nomor</p>
            <p>#03# Nama</p>
            <p>#04# Alamat</p>
            <p>#05# RT/RW</p>
            <p>#06# Desa</p>
            <p>#07# Kecamatan</p>
            <p>#08# Kendaraan</p>
            <p>#09# Merk</p>
            <p>#10# Tahun</p>
            <p>#11# Warna Plat</p>
            <p>#12# Warna Kendaraan</p>
          </div>
          <div>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
          </div>
          <div>
            <p>#13# Masa Pajak</p>
            <p>#14# Masa STNK</p>
            <p>#15# Nomor HP</p>
            <p>#16# PKB</p>
            <p>#17# Jasa Raharja</p>
            <p>#18# Parkir</p>
            <p>#19# Biaya Total</p>
            <p>#20# Nomor Entri</p>
          </div>
          <div>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
            <p className="detail-data-preview">undefined</p>
          </div>
        </Card>
        <Insert  template={this.state.template} editTemplate={this.editTemplate}/>
        </div>
        </Card>
      </div>
      </div>
    )
    
  }
}
export default Manual;
