import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { categoriesUrl, feedBackUrl, formsUrl, itemsUrl, loginUrl, ordersUrl } from '../../Redux/dataBase';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navToggle = () => {
        setIsNavOpen(!isNavOpen);
    }
    return (
        <div>
            <Navbar color="dark" dark expand="sm" style={{ textAlign: "center" }}>
                <NavbarToggler onClick={navToggle} />
                <NavbarBrand href="/">
                    React Assignments
                </NavbarBrand>

                <Collapse isOpen={isNavOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link to="/" className="nav-link">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={itemsUrl} className="nav-link">Items</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={formsUrl} className="nav-link">Forms</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={categoriesUrl} className="nav-link">Categories</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={feedBackUrl} className="nav-link">Feedback</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={ordersUrl} className="nav-link">Orders</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={loginUrl} className="nav-link">Login</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header;