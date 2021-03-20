import React from 'react';
import '../css/simple-sidebar.css';
import PropTypes from 'prop-types'

/**
 * Crea una pagina wrapper
 * @param {Object} props properties
 * @return {Component} il componente
 */
function Page({children}) {
    return (
        <div id="page-content-wrapper" className='container-fluid mt-4'>
            { children }
        </div>
    );
}

Page.propTypes = {
    children: PropTypes.node,
}

export default Page;
