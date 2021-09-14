import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../css/simple-sidebar.css';
import { NavLink } from 'react-router-dom';
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
        <NavLink to={r.path} key={r.id} activeClassName="active">
            <ListGroup.Item as='button' className="list-group-item list-group-item-action bg-light sidebar-btn">
                {r.text}
            </ListGroup.Item>
        </NavLink>,
    )

    return (
        <div className="bg-light border-right" id='sidebar-wrapper'>
            <div className="sidebar-heading"> Operazioni </div>
            <ListGroup>
                {listItems}
                <ModalCredits></ModalCredits>
            </ListGroup>
        </div>
    )
}

Sidebar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Sidebar;
