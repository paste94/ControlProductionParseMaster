import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import '../css/simple-sidebar.css';
import { Link, useLocation } from 'react-router-dom';
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
                {useLocation().pathname === r.path ? (<u>{r.text}</u>) : r.text}
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
}

Sidebar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Sidebar;
