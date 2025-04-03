import React from 'react';
import { useForm } from 'react-hook-form';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send Us Your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="form-group">
              <Label htmlFor="firstname" md={2}>First Name</Label>
              <Col md={10}>
                <input
                  className="form-control"
                  {...register("firstname", { required: true, minLength: 3, maxLength: 15 })}
                  placeholder="First Name"
                />
                {errors.firstname && <p className="text-danger">First name is required and must be 3-15 characters</p>}
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="lastname" md={2}>Last Name</Label>
              <Col md={10}>
                <input
                  className="form-control"
                  {...register("lastname", { required: true, minLength: 3, maxLength: 15 })}
                  placeholder="Last Name"
                />
                {errors.lastname && <p className="text-danger">Last name is required and must be 3-15 characters</p>}
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="telnum" md={2}>Tel. Number</Label>
              <Col md={10}>
                <input
                  className="form-control"
                  {...register("telnum", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    minLength: 8,
                    maxLength: 15
                  })}
                  placeholder="Telephone"
                />
                {errors.telnum && <p className="text-danger">Enter a valid phone number (8-15 digits)</p>}
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="email" md={2}>Email</Label>
              <Col md={10}>
                <input
                  className="form-control"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                  })}
                  placeholder="Email"
                />
                {errors.email && <p className="text-danger">Enter a valid email address</p>}
              </Col>
            </Row>

            <Row className="form-group">
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register("agree")}
                    />{' '}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <select className="form-control" {...register("contactType")}> 
                  <option>Tel.</option>
                  <option>Email</option>
                </select>
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="message" md={2}>Your Feedback</Label>
              <Col md={10}>
                <textarea
                  className="form-control"
                  rows="12"
                  {...register("message")}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">Send Feedback</Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;