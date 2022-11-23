import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Arrow from "./images/downArrow.png"

const InnerLogTable = ({data, sort, order,searchResults}) => {

    return (  
        <div class="continer-fluid">
<div class="row">
<Table class="table table-bordered">
            <thead>
                <tr>
                <th>Log Id <span onClick={() => sort('logId')}>{order == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                </th>
                <th>Application Type <span onClick={() => sort('appType')}>{order == 'asc' ?  <img src={Arrow} alt="sort" style={{
                    transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span></th>
                <th>Application Id<span onClick={() => sort('applicationId')}>{order == 'asc' ?  <img src={Arrow} alt="sort" style={{
                    transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span></th>
                
                <th>Action<span onClick={() => sort('action')}>{order == 'asc' ?  <img src={Arrow} alt="sort" style={{
                    transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span></th>
                <th>Action Details</th>
                <th>Date : Time<span onClick={() => sort('date')}>{order == 'asc' ?  <img src={Arrow} alt="sort" style={{
                    transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span></th>
                </tr>
            </thead>
            <tbody>
            {searchResults.length > 0 ? (
               
                searchResults.map((info => (
                        
                            <tr>
                              <td>{info.logId}</td>
                              <td>{info.applicationType == null ? "-/-"  : info.applicationType.replace( /_/g, " " )}</td>
                        <td>{info.applicationId == null ? "-/-"  : info.applicationId}</td>
                        
                        <td>{info.actionType == null ? "-/-"  : info.actionType.replace( /_/g, " " )}</td>
                        <td>-/-</td>
                        <td>{info.creationTimestamp}</td>
                            </tr>
                        )))
                ) : (
                data.map(info => (
                    <tr>
                      <td>{info.logId}</td>
                      <td>{info.applicationType == null ? "-/-"  : info.applicationType.replace( /_/g, " " )}</td>
                <td>{info.applicationId == null ? "-/-"  : info.applicationId}</td>
                
                <td>{info.actionType == null ? "-/-"  : info.actionType.replace( /_/g, " " )}</td>
                <td>-/-</td>
                <td>{info.creationTimestamp}</td>
                    </tr>
                )))
            }

            </tbody>
        </Table>
</div>

        </div>
        
      ) 

                }
          export default InnerLogTable;
























    

