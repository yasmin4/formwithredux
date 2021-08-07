import React from "react";
import { Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'


const Dropdowninput = (props) => {

  return (
    <>
    <Col className="col-sm-6">
      <Form.Group controlId={`validation${props.name}`}>
        <Form.Control
          as="select"
          name={props.name}
          value={props.value} placeholder={props.name}
          onChange={(props.onChange)} required>

          <option value="" disabled selected hidden>{props.label}</option>

          {props?.optionValue?.map((option, index) =>
            <option value={index} key={index}>{option.name}</option>
          )}
        </Form.Control>

      </Form.Group>

    </Col>
   
    </>
  );
}
export default Dropdowninput;