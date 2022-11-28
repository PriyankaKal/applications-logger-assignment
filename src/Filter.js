import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";

const Filter = (props) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState();
  const [applicationType, setApplicationType] = useState();
  const [applicationId, setApplicationId] = useState();
  const [searchData, setSearch] = useState({ start: "", end: "" });

  const submitButton = () => {
    if (actionType) {
      props.filterUsers("actionType", actionType);
    }
    if (applicationType) {
      props.filterUsers("applicationType", applicationType);
    }
    if (applicationId) {
      props.filterApplication("applicationId", applicationId);
    }
    if (searchData.start !== "" && searchData.end !== "") {
      props.filterdate(searchData)
    }

    let searchData1 = actionType ? `actionType=${actionType}` : applicationType ? `applicationType=${applicationType}` : applicationId ? `applicationId=${applicationId}` : searchData.start ? `startDate =${searchData.start},${searchData.end}` : 'No data found'
    navigate({ pathname: "/", searchData: `${searchData1} ` })
  }

  var actType = props.apiData.reduce((unique, i) => {
    if(!unique.some(obj => obj.actionType === i.actionType)){
      unique.push(i);
    }

    return unique;
  },[]);

  var appliType = props.apiData.reduce((unique, i) => {
    if(!unique.some(obj => obj.applicationType === i.applicationType)){
      unique.push(i);
    }
    return unique;
  },[]);

  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Label>{"ActionType"}</Label>
          <select value={actionType} onChange={(e) => setActionType(e.target.value)}
            className="option1">
            <option value="" />
            {actType.map((val, i) => (
              <option key={i} value={val.actionType}>
                {val.actionType}
              </option>
            ))}
          </select>
        </Col>
        <Col className="mb-3 option">
          <FormGroup>
            <Label>{"ApplicationTypes"}</Label>
            <select value={applicationType} onChange={(e) => setApplicationType(e.target.value)}
              className="option1">
              <option value="" />
              {appliType.map((val, i) => {
                if (val.applicationType !== null) {
                  return (
                    <option key={i} value={val.applicationType}>
                      {val.applicationType}
                    </option>
                  )
                }
              })}
            </select>
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"ApplicationId"}</Label>
            <Input
              className="form-control"
              type="text"
              onChange={(e) => setApplicationId(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"Start Dtae"}</Label>
            <Input
              className="form-control"
              value={searchData.start}
              onChange={(e) => setSearch({ ...searchData, start: e.target.value })}
              type="date"
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"End Dtae"}</Label>
            <Input
              className="form-control"
              value={searchData.end}
              onChange={(e) => setSearch({ ...searchData, end: e.target.value })}
              type="date"
            />
          </FormGroup>
        </Col>
        <Col class="py-2">
          <button
            type="button"
            class="btn btn-primary my-4"
            onClick={() => submitButton()}
          >
            Search logger
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default Filter;