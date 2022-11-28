import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Filter from "./Filter";
import "./filterdata.css";
import Arrow from "./images/up-arrow.png"

const Loggertable = () => {
  const [apiData, setApiData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataHolder, setDataHolder] = useState([]);
  const [tableOrder, setTableOrder] = useState(false);
  const [flag, setflag] = useState({
  user: false,
  });

  const fetchData = async () => {
    await axios
      .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => {
        setApiData(res.data.result.auditLog);
        setTotalData(res.data.result.auditLog);
        setDataHolder(res.data.result.auditLog);
        setTotalPages(
          Array.from(
            { length: Math.ceil(res.data.result.auditLog.length / 10) },
            (v, i) => i + 1
          )
        );
        getCount(1, res.data.result.auditLog);
      })
      .catch((err) => {
        //toast.error(err.response.error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCount = (id, data) => {
    const temp = Array.from(
      { length: Math.ceil(data.length / 10) },
      (v, i) => i + 1
    );
    if (id > 0 && temp[temp.length - 1] >= id) {
      const temp = data.filter((ele, i) => i < id * 10 && i >= id * 10 - 10);
      setCurrentPage(id);
      setApiData(temp);
    } else {
      setApiData(data);
    }
  };

  const sort = (id) => {
    if (id === "logId" || id === "companyId" || id === "applicationId") {
      const result = totalData.sort((x, y) => x[id] - y[id]);
      if (flag.user) {
        result.reverse();
      }
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else if (id === "creationTimestamp") {
      const result = totalData.sort(
        (x, y) =>
          new Date(x["creationTimestamp"]).getTime() -
          new Date(y["creationTimestamp"]).getTime()
      );
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else {
      const result = totalData.sort(
        (x, y) => x[id] && x[id].localeCompare(y[id])
      );
      if (flag.user) {
        result.reverse();
      }
      setApiData(result);
      setTotalPages(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    }
    if(tableOrder == 'asc'){
      setTableOrder(false);
    }else{
      setTableOrder('asc');
    }
  };

  const filterUsers = async (filterby, search) => {
    search = search.trim().toLowerCase();
   
    if (search !== "") {
      const data = dataHolder.filter((ele) => {
        if (ele[filterby] && ele[filterby].toLowerCase().includes(search)) {
         
          return ele;
        }
      });
      
      setTotalData(data);
      setTotalPages(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      setTotalPages(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };

  const filterApplication = async (filterby, search) => {
    search = search.trim();
   
    if (search !== "") {
      const data = dataHolder.filter((ele) => {
        if (ele[filterby] && ele[filterby].toString().includes(search)) {
          return ele;
        }
      });
      
      setTotalData(data);
      setTotalPages(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      setTotalPages(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };

  const filterdate = async (date) => {
   
    if (date.start !== "" && date.end !== "") {
      const start = new Date(date.start).getTime();
      const end = new Date(date.end).getTime();

      const data = dataHolder.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const temp = new Date(ele["creationTimestamp"]).getTime();
          if (temp >= start && temp <= end) {
            return ele;
          }
        }
      });
    
      setTotalData(data);
      setTotalPages(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      setTotalPages(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };


  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col>
            <div className="p-4 m-10 !important">
              <Filter
                apiData={apiData}
                filterUsers={filterUsers}
                filterdate={filterdate}
                filterApplication={filterApplication}
              />
            </div>
            <div className="p-4 m-10 !important">
              <Table bordered class="m-10">
                <thead>
                  <tr>
                    <th>
                      Log Id
                      <span onClick={() => sort('logId')}>{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      Application Type
                      <span onClick={() => sort('applicationType')}>{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      Application Id
                      <span onClick={() => sort('applicationId')}>{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    
                    <th>
                      Action Type
                      <span onClick={() => sort('actionType')}>{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>
                    </th>
                    <th>
                      Date : Time
                   <span onClick={() => sort('creationTimestamp')}>{tableOrder == 'asc' ?  <img src={Arrow} alt="sort" style={{transform:"rotate(0deg)",
                    height:"10px"
                }} ></img> : <img src={Arrow} alt="sort" style={{
                    transform:"rotate(180deg)",
                    height:"10px"
                }} ></img>}</span>

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.logId}</td>
                        <td>{data.applicationType || "-/-"}</td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.applicationId || "-/-"}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              <span>{data.actionType || "-/-"}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            {new Date(
                              data.creationTimestamp
                            ).toLocaleDateString("es-CL")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center">
              <Pagination aria-label="Page navigation">
                <PaginationItem>
                  <PaginationLink
                    onClick={() => getCount(currentPage - 1, totalData)}
                  >
                    <span aria-hidden="true">«</span>
                  </PaginationLink>
                </PaginationItem>
                {totalPages.map((ele) => (
                  <PaginationItem>
                    <PaginationLink onClick={() => getCount(ele, totalData)}>
                      {ele}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => getCount(currentPage + 1, totalData)}
                  >
                    <span aria-hidden="true">»</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Loggertable;


