import React from "react"
import { Table, Form, Button } from "react-bootstrap";
import Client from "../../client.json"
import LoadingScreen from "../../Components/LoadingScreen";
import "./laporan.css"
import Logo from "../../Images/logo-01.png"
import { counter } from "@fortawesome/fontawesome-svg-core";

class Laporan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datas : [
                {date : "00/00/0000",city : "Nganjuk", success : 0, unregistered:0, unvalid : 0, none:0, total : 0}
            ],
            date : "",
            city : "semua",
            refresh : false
        }
        this.getData()

    }
    async getData(){
        const response = await fetch("https://backend-uppdnganjuk.vercel.app/api/whatsapush/laporan")
          let result = await response.json();
          this.setState({
            datas : result.datas
          }, ()=>{
            document.getElementById("load-screen").style.display = "none"
          })
    }
    cariData = ()=>{
        let city = document.getElementById("uptform").value
        let date = document.getElementById("datePicked").value
        this.setState({
            city : city,
            date : date
        })
    }
    componentDidMount(){
        document.getElementById("load-screen").style.display = "block"
    }
    render(){
        let counter_sent = 0
        let counter_unregistered = 0
        let counter_invalid = 0
        let counter_none = 0
        let counter_total = 0
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <img id="logo" src={Logo} alt="" style={{width:"30px",height:"30px"}}/>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="../">Pengiriman </a>
                        </div>
                    </div>
                </nav>
                <div id="laporan-container">
                <LoadingScreen />
                <div id="input-container">
                    <Form.Group controlId="datePicked">
                        <Form.Control type="date" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group controlId="uptform">
                    <Form.Control as="select" size="md">
                        <option value="semua">- - Semua - -</option>
                        {Client.city.map(a=>{
                            return(
                                <option value={a}>{a}</option>
                            )
                        })}
                            </Form.Control>
                    </Form.Group>
                    <Button variant="warning" id="filterdata-button" onClick={this.cariData}>Cari</Button>
                </div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Tanggal</th>
                    <th>Nama UPT</th>
                    <th>Terkirim</th>
                    <th>Tidak Terdaftar</th>
                    <th>Tidak Valid</th>
                    <th>Tidak Ada</th>
                    <th>Total</th>
                    <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.datas.map(data=>{
                        let date_input = this.state.date.split("-")
                        let date_datas = data.date.split("T")[0].split("-")
                        date_input = date_input[0] +"-" + date_input[1]
                        date_datas = date_datas[0] +"-" + date_datas[1]
                        if(data.city == this.state.city | this.state.city == "semua"){
                            if(date_input == date_datas|| this.state.date == ""){
                                counter_sent += data.success
                                counter_unregistered += data.unregistered
                                counter_invalid += data.unvalid
                                counter_none += data.none
                                counter_total += data.total
                                return(
                                    <tr>
                                    <td>{data.date.split("T")[0]}</td>
                                    <td>{data.city}</td>
                                    <td>{data.success}</td>
                                    <td>{data.unregistered}</td>
                                    <td>{data.unvalid}</td>
                                    <td>{data.none}</td>
                                    <td>{data.total}</td>
                                    <td>{Math.ceil(data.success/data.total*100) + "%"}</td>
                            </tr>
                                )
                            }
                           
                        }
                    })}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>{counter_sent}</td>
                        <td>{counter_unregistered}</td>
                        <td>{counter_invalid}</td>
                        <td>{counter_none}</td>
                        <td>{counter_total}</td>
                        <td>{Math.ceil(counter_sent/counter_total*100) + "%"}</td>
                    </tr>
                </tbody>
                </Table>
            </div>
            </div>
           
            
        )
    }
}


export default Laporan;