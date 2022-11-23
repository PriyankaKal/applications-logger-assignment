import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InnerLogTable from './InnerLogTable';
import Pagination from './Pagination';
import Filter from './Filter';

const apiURL = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";


function App() {

  const [data, setData] = useState([])
    const [loadData, setLoadData] = useState(true);
   
    useEffect(() => {
      axios.get(apiURL)
          .then(res => {
                  setData(res.data.result.auditLog
                    );
                  setLoadData(false);
              })
              .catch(() => {
                  alert('Error while retrieving the data')
              })
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [newRecords, setNewRecords] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);
  
  function handleSort(e){
    console.log(e)
    if(e == "logId"){
      if(currentOrder =='asc'){
        let newRecords = [];
        let order = 'desc'
        newRecords = currentRecords.sort((a,b) =>  b.logId - a.logId)
      
       setNewRecords(newRecords);
       setCurrentOrder(order);
      }
      else{
      let newRecords = [];
      let order = 'asc'
      newRecords = currentRecords.sort((a,b) => a.logId - b.logId)
    
     setNewRecords(newRecords);
     setCurrentOrder(order);
    }
  }

  if(e == "applicationId"){
    if(currentOrder =='asc'){
      let newRecords = [];
      let order = 'desc'
      newRecords = currentRecords.sort((a,b) =>  b.applicationId - a.applicationId)
     setNewRecords(newRecords);
     setCurrentOrder(order);
    }
    else{
    let newRecords = [];
    let order = 'asc'
    newRecords = currentRecords.sort((a,b) => a.applicationId - b.applicationId)
   setNewRecords(newRecords);
   setCurrentOrder(order);
  }
}
  if(e == "appType"){
    if(currentOrder =='asc'){
      let newRecords = [];
      let order = 'desc'
      newRecords = currentRecords.sort((a,b) => b.applicationType?.localeCompare(a.applicationType))
    setNewRecords(newRecords);
     setCurrentOrder(order);
    }
    else{
    let newRecords = [];
    let order = 'asc'
    newRecords = currentRecords.sort((a,b) => a.applicationType?.localeCompare(b.applicationType))
    setNewRecords(newRecords);
   setCurrentOrder(order);
  }
  }
  if(e == "action"){
    if(currentOrder =='asc'){
      let newRecords = [];
      let order = 'desc'
      newRecords = currentRecords.sort((a,b) => b.actionType?.localeCompare(a.actionType))
    setNewRecords(newRecords);
     setCurrentOrder(order);
    }
    else{
    let newRecords = [];
    let order = 'asc'
    newRecords = currentRecords.sort((a,b) => a.actionType?.localeCompare(b.actionType))
   setNewRecords(newRecords);
   setCurrentOrder(order);
  }
  }
  if(e == "date"){
    if(currentOrder =='asc'){
      let newRecords = [];
      let order = 'desc'
      newRecords = currentRecords.sort((a,b) => b.creationTimestamp?.localeCompare(a.creationTimestamp))
    setNewRecords(newRecords);
     setCurrentOrder(order);
    }
    else{
    let newRecords = [];
    let order = 'asc'
    newRecords = currentRecords.sort((a,b) => a.creationTimestamp?.localeCompare(b.creationTimestamp))
   setNewRecords(newRecords);
   setCurrentOrder(order);
  }
  }
}

function handleorderReset(){
  setNewRecords([]);
  setCurrentOrder(false);
}
  return (
    
    <div className="App">
      
      <Filter 
      data={newRecords.length > 0 ? newRecords : currentRecords}
      setSearchResults={setSearchResults}
      />
      <InnerLogTable data={newRecords.length > 0 ? newRecords : currentRecords} sort={event => handleSort(event)} order={currentOrder}
      searchResults={searchResults}/>
      <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                orderReset={() => handleorderReset()}
            />
    </div>
  );
}

export default App;
