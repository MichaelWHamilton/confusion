import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse ,NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, Form } from 'reactstrap';
import {NavLink} from 'react-router-dom';



class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // Toglgle nav state
    toggleNav() {
        this.setState({
             isNavOpen: !this.state.isNavOpen
        });
    }

    // Toggle modal state
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
       });
    }

    // Method fo rhandliong the login
    handleLogin(event){
        this.toggleModal();
        alert("Username: "+this.username.value+"Password: "+this.password.value+"Remember: "+this.remember.checked)
        event.preventDefault();
    }

    // Header and Nav for different pages
    render(){
        return(
           <div>
                <Navbar dark expand='md' >
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Restorante con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span>Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span>About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span>Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span>Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span class="fa fa-sign-in fa-lg"></span>Log in
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Log in</ModalHeader>
                    <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor='username'>Username</Label>
                                    <Input type='text' id='username' name='username' innerRef={(input) => this.username = input}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input type='password' id='password' name='password' innerRef={(input) => this.password = input}></Input>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' name='remember' innerRef={(input) => this.remember = input}/> Remember Me
                                    </Label>
                                </FormGroup>
                                <Button type='submit' value='submit' color='primary'>Login</Button>
                            </Form>
                    </ModalBody>
                </Modal>
           </div>
        );
    }
}
export default Header;