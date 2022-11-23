import React from 'react';
import JsonData from "./data.json";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Loggertable extends React.Component{

    state = {
        jsondata: []
      }


      componentDidMount() {
        axios.get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
          .then(res => {
            const jsondata = res.data;
            this.setState({ jsondata });
          })
      }

    

      render(){

        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                       <tr>
                        <th>Log id</th>
                        <th>Application Id</th>
                        <th>Application type</th>
                        <th>Action type</th>
                        <th>Acton Details</th>
                        <th>Date: Time</th>
                       </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.jsondata
            .map(info =>
                <tr key={info.logId}>
                <td>{info.logId}</td>
                <td>{info.applicationId}</td>
                <td>{info.applicationType}.replace(/[^a-zA-Z ]/g, "")</td>
                <td>{info.actionType}</td>
                <td>-/-</td>
                <td>{info.creationTimestamp}</td>
                
            </tr>
            )
        }
                     
          
                        
                    </tbody>
                </Table>
                 
            </div>
        )

      }

}
 

 export default Loggertable;


