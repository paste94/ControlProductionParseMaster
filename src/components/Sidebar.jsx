import React from 'react';
import { Container, ListGroup, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import '../css/simple-sidebar.css';
import { Link, NavLink } from 'react-router-dom';
import ModalCredits from './ModalCredits';
import PropTypes from 'prop-types'

/**
 * Definisce la sidebar
 * @param {object}  props Properties
 *                  - data (array) elenco di elementi che formano la sidebar
 * @return {Component} il componente creato
 */
const Sidebar = ({data}) => {
    const listItems = data.map((r) =>
        <NavItem key={r.id} href={r.path} >
            <Nav.Link as={Link} to={r.path}>
                {r.text}
            </Nav.Link>
        </NavItem>,
    )

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Control Production</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {listItems}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

    /*
    

    return (
        <div className="bg-light border-right" id='sidebar-wrapper'>
            <div className="sidebar-heading"> Operazioni </div>
            <ListGroup>
                {listItems}
                <ModalCredits></ModalCredits>
            </ListGroup>
        </div>
    )
    */
}

Sidebar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Sidebar;
