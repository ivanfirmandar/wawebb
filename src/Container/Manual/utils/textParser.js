module.exports = {
    nopolDetail : (e, parent)=>{
        const detail = document.getElementsByClassName('detail-data-preview')
        e = e-1
        detail[0].innerHTML = parent.state.datas[e].no_surat
        detail[1].innerHTML = parent.state.datas[e].plat
        detail[2].innerHTML = parent.state.datas[e].nama
        detail[3].innerHTML = parent.state.datas[e].alamat
        detail[4].innerHTML = parent.state.datas[e].rt_rw
        detail[5].innerHTML = parent.state.datas[e].desa
        detail[6].innerHTML = parent.state.datas[e].kec
        detail[7].innerHTML = parent.state.datas[e].kend
        detail[8].innerHTML = parent.state.datas[e].merk
        detail[9].innerHTML = parent.state.datas[e].tahun
        detail[10].innerHTML = parent.state.datas[e].warna_plat
        detail[11].innerHTML = parent.state.datas[e].warna_ken
        detail[12].innerHTML = parent.state.datas[e].masa_pajak
        detail[13].innerHTML = parent.state.datas[e].masa_stnk
        detail[14].innerHTML = parent.state.datas[e].no_hp
        detail[15].innerHTML = parent.state.datas[e].pkb
        detail[16].innerHTML = parent.state.datas[e].jr
        detail[17].innerHTML = parent.state.datas[e].parkir
        detail[18].innerHTML = parent.state.datas[e].biaya_tot
        detail[19].innerHTML = parent.state.datas[e].no_entri
      },
    compileData : (parent)=>{
        const messageDatas = []
        const datasTemplate = {
          datas : null,
          phone : null,
          message : null,
        }
        const template = parent.state.template
        const datas = parent.state.datas
        for (let index = 0; index < datas.length; index++) {
          const datasTemplate = {
            phone : null,
            message : null,
            image : null
          }
        
          let tempTemplate = template.replace("#01#",datas[index].no_surat)
          .replace("#02#",datas[index].plat)
          .replace("#03#",datas[index].nama)
          .replace("#04#",datas[index].alamat)
          .replace("#05#",datas[index].rt_rw)
          .replace("#06#",datas[index].desa)
          .replace("#07#",datas[index].kec)
          .replace("#08#",datas[index].kend)
          .replace("#09#",datas[index].merk)
          .replace("#10#",datas[index].tahun)
          .replace("#11#",datas[index].warna_plat)
          .replace("#12#",datas[index].warna_ken)
          .replace("#13#",datas[index].masa_pajak)
          .replace("#14#",datas[index].masa_stnk)
          .replace("#15#",datas[index].no_hp)
          .replace("#16#",datas[index].pkb)
          .replace("#17#",datas[index].jr)
          .replace("#18#",datas[index].parkir)
          .replace("#19#",datas[index].biaya_tot)
          .replace("#20#",datas[index].no_entri)
          
          datasTemplate.datas = datas[index]
          datasTemplate.phone = datas[index].no_hp
          datasTemplate.message = tempTemplate
          datasTemplate.image = parent.state.imageurl.filename
          messageDatas.push(datasTemplate)
        }
        return messageDatas
        
      }
}