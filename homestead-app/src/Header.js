import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavDropdown, Nav, NavLink, Button} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {Link } from 'react-router-dom';
import homestead_png from './images/homestead.png';


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            userIsActive:false,
            adminIsActive:false,   
        };
    }


  render() {
    return  (
    <div>
    <Navbar className = "navbar-expand-sm navbar-dark" style = {{backgroundColor: "#2a7036"}}>
    <NavbarBrand id="nav-custom" href="/">
    <h1> <img
            src = {homestead_png}
            alt=""
            width="80"
            height="50"
            className="d-inline-block align-top"
            style = {{marginRight: "20px"}}
        />
          {''} Plan Your Homestead </h1>
    </NavbarBrand>
    </Navbar>
    </div>
    )}
};
export default Header;
