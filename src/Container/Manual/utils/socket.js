import crudData from "./crud";

const socketStart = (socket,parent)=>{
    socket.emit('get-template',(response)=>{
      document.getElementById('template-text').value = response.text
    })
    socket.on("connect", () => {
      console.log("Connected : " + socket.connected);
      document.getElementById('turn-server').style.display = "none"
    });
    socket.on("disconnect", () => {
      console.log("Connected : " + socket.connected);
      document.getElementById('turn-server').style.display = "block"
    });
    socket.on('sendQR',(msg)=>{
      parent.setState({
        qrcode : msg.qr
      })
    document.getElementById('qrcodeload').style.display = "none"
    })
    socket.on('send-template',(response)=>{
      if(parent.state.template==null){
        console.log(response)
        parent.setState({
          template : response.text.text,
          imageurl : response.image
        }) 
      }
    })
    socket.on("readData",(datas)=>{
      parent.setState({
        datas :datas.datas
      })
    })
    socket.on('ClientAuthenticated',(datas)=>{
      let clientInfo = document.getElementsByClassName('client-data-sub-info')
      clientInfo[0].innerHTML = datas.client.me.user
      clientInfo[1].innerHTML = datas.client.platform
      clientInfo[2].innerHTML = datas.client.pushname
      document.getElementById('connect-template').style.display = "block"
    })
    socket.on('sent_status',(status)=>{
      console.log(status.id.datas.no_surat)
      let the_id = document.getElementById(status.id.datas.no_surat)
      switch (status.status) {
        case 0:
          the_id.style.backgroundColor = "green"
          break;
        case 1:
          the_id.style.backgroundColor = "orange"
          break;
        case 2:
          the_id.style.backgroundColor = "red"
          break;
        default:
          the_id.style.backgroundColor = "gray"
          break;
      }
    })
    socket.on('send-error',(msg)=>{
      alert(msg.clue)
    })
    socket.on("send-done",async (msg)=>{
      document.getElementById('send-done').style.display = "block"
      console.log(msg)
      document.getElementById('send-done').getElementsByClassName("card-text")[0].innerHTML = `
      Sukses terkirim: ${msg.total.success_count} \n 
      Tidak terdaftar: ${msg.total.unregistered_count} \n
      Tidak valid: ${msg.total.notvalid_count}\n
      Tidak ada: ${msg.total.nophone_count}`
      if(parent.state.city != null){
        await crudData.sendRecap(msg.total.success_count, msg.total.unregistered_count, msg.total.notvalid_count,msg.total.nophone_count, parent.state.city)
      }
    })
  }

  export default socketStart