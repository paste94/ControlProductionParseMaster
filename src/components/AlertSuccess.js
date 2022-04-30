import React from 'react'
import { Alert, AlertContainer } from 'react-bs-notifier'
import PropTypes from 'prop-types'

/**
 * Mostra un alert di errore
 * @param {Object} props Properties
 *                  - show (boolean): Indica se l'errore deve essere
 *                    mostrato o no
 *                  - title (String): Il titolo da mostare
 *                  - message (String): il messaggio di errore
 * @return {Component} ciao
  */
function AlertSuccess({show, message, handleClose}) {
    return (
        <AlertContainer position="top-right">
            { show ? (
                <Alert
                    type="success"
                    headline='OK'
                    onDismiss={ handleClose }
                    showIcon={true}
                    timeout={5000} >
                        { message }
                </Alert>
            ) : null }
        </AlertContainer>
    )
}

AlertSuccess.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string,
    handleClose: PropTypes.func,
}

export default AlertSuccess
