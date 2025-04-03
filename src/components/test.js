import React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Button, Row, Col, Label } from 'reactstrap';

export default function DebugForm() {
  return (
    <div className="container">
      <h3>Debug Form</h3>
      <LocalForm onSubmit={(values) => {
        console.log("SUBMIT:", values);
        alert(JSON.stringify(values, null, 2));
      }}>
        <Row className="form-group">
          <Label htmlFor="author" md={12}>Name</Label>
          <Col md={12}>
            <Control.text model="author" id="author" className="form-control" />
          </Col>
        </Row>

        <Row className="form-group">
          <Label htmlFor="comment" md={12}>Comment</Label>
          <Col md={12}>
            <Control.textarea model="comment" id="comment" rows="4" className="form-control" />
          </Col>
        </Row>

        <Row className="form-group">
          <Label htmlFor="rating" md={12}>Rating</Label>
          <Col md={12}>
            <Control.select model="rating" id="rating" className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Control.select>
          </Col>
        </Row>

        <Row className="form-group">
          <Col md={12}>
            <Button type="submit" color="primary">Submit</Button>
          </Col>
        </Row>
      </LocalForm>
    </div>
  );
}
