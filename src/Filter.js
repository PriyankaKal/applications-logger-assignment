import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";


const Filter = ({data, props, sort, order,setSearchResults}) => {
  const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

  const [startdate, setstartdate] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  const [searchInput, setSearchInput] = useState('');

  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null
  })
  
    //called when a user selects filter start-date 
    const handleStartDate = (date) => {
      setStartDate(date);
  }

  //called when a user selects filter end-date 
  const handleEndDate = (date) => {
      setEndDate(date);
  }

  const handleFilterByDate = () => {
    if (startdate && enddate) {
      
      const filtereddatedata = data.filter([startdate, enddate]);
      console.log(filtereddatedata,"filtereddatedata");
    }
}


  const applyFilter = () => {
  
    if (startdate && enddate ) {
     
        handleFilterByDate();
        
    }
 
   
    if (!startdate && enddate || startdate && !enddate) {
        window.alert("Please Make sure you select start-date and end-date");
    }
}
  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        console.log(filteredData,"filterdata");
        setSearchResults(filteredData)
    }
    else{
      console.log(data,"data");
        setSearchResults(data)
    }
}

    return(
<div>

<div class="container-fluid">
  
      <div class="row" style={{textAlign:"center"}}>
       
        <h3>
    Logger search
  </h3>

          </div>
        <hr></hr>  
          </div>
  
<form>
    <div class="container-fluid">
      <div class="row">
      
        <div class="col-sm-2">
        <label>
           <p>Action Type</p>
           <input name="action_type" onChange={(e) => searchItems(e.target.value)}
                        />
           {/* <select name="action_type" style={{
                    paddingTop:"9px"}}>
  
                    <option></option>
                    {data.map(info => {
                        return <option key={info.actionType == null ? "-/-"  : info.actionType.replace( /_/g, " " )} >
                            {info.actionType == null ? "-/-"  : info.actionType.replace( /_/g, " " )}
                        </option>
                    })}
                   
                </select> */}
         </label>
       
        </div>
        <div class="col-sm-2">
        <label>
           <p>Application Type</p>
           <input name="application_type" onChange={(e) => searchItems(e.target.value)}
                        />
           {/* <select name="application type" style={{
                    paddingTop:"9px"}}>
  
                    <option></option>
                    {data.map(info => {
                        return <option key={info.applicationType == null ?  "----": info.applicationType.replace( /_/g, " " )} >
                            {info.applicationType == null ?  "----": info.applicationType.replace( /_/g, " " )}
                        </option>
                    })}
                   
                </select> */}
         </label>
       
        </div>
        <div class="col-sm-2">
        <label>
           
           <p className="startDate">From: </p> <div className="datePickerLabel">{startDate ? startDate.toLocaleDateString("fr-CA") : null}</div>
           <DatePicker selected={startdate} onChange={(date) => setstartdate(date)} handleDateChange={handleStartDate} date={startDate} />
           
   
         </label>
       
        </div>
        <div class="col-sm-2">
        <label>
           
           <p className="todate" >To:</p> <div className="datePickerLabel">{endDate ? endDate.toLocaleDateString("fr-CA") : null}</div>
           <DatePicker selected={enddate} onChange={(date) => setenddate(date)} handleDateChange={handleEndDate} date={endDate} />
    
         </label>
       
        </div>
        <div class="col-sm-2">
        <label>
           <p>Application ID</p>
           <input name="application_id" onChange={(e) => searchItems(e.target.value)}
                        />
         </label>
       
        </div>
        <div class="col-sm-2">
        <label>
          
           <button type="button" class="btn btn-primary" onClick={applyFilter} style={{
                    marginTop:"38px"}}>Submit Logger</button>
         </label>
       
        </div>
       
      </div>
      <br></br>
      
      <br></br>
    </div>
   
  
  
 
</form>
</div>
    );

    
}
export default Filter;