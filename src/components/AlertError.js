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
function AlertError({show, title, message}) {
    return (
        <AlertContainer position="top-right">
            { show ? (
                <Alert
                    type="danger"
                    headline={title}
                    onDismiss={handleCloseAlert}
                    showIcon={true}
                    timeout={5000} >
                        { message }
                </Alert>
            ) : null }
        </AlertContainer>
    )
}

AlertError.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
}

export default AlertError
