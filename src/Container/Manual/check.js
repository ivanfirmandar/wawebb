handlePDf = (e)=>{
    console.log("HEHEHE")
    let fileType=['application/pdf']
    let selectedFile = e.target.files[0]
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e)=>{
          this.setState({pdfFile: e.target.result})
        }
      }
      }
    }
   readPdf = async ()=>{
      let format = {}
      let doc = await pdfjsLib.getDocument(this.state.pdfFile).promise;
      let datas = []
      for (let i = 1; i < doc.numPages+1; i++) {
          let page1 = await doc.getPage(i);
          let content = await page1.getTextContent();
          let strings = content.items.map(function(item) {
              return item.str;
          }
      )
      console.log(strings)
      datas.push({
          no_urut : i,
          no_surat : strings[0],
          plat : strings[2],
          nama : strings[4],
          alamat : strings[6],
          rt_rw : strings[8],
          desa : strings[10],
          kec : strings[12],
          kend : strings[14],
          merk : strings[16],
          tahun : strings[18],
          telp : strings[20]
  
      });
      
      }
      console.log(datas)
   }
 