import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ModalConfirm from '../../components/ModalConfirm'

/**
 * Definisce il bottone dell'eliminazione di un elemento
 * dalla tabella, con modal di conferma
 * @param {Object}  props properties
 *                  - title (string) il titolo del bottone
*                   - children (Component) Cosa mostrare nel corpo del confirm
 *                  - handleConfirm (function) Cosa eseguire nel caso sia
 *                      clickata la conferma
 * @return {Component} il component
 */
function BtnConfirm({
    title,
    children,
    handleConfirm,
    variant,
    text,
}) {
    const [show, setShow] = useState(false)

    return (
        <div>

            <Button
                onClick={ () => setShow(true)}
                title={title}
                variant={variant}>
                    {children}
            </Button>

            <ModalConfirm
                show={show}
                title={title}
                handleConfirm={ () => handleConfirm(setShow(false)) }
                handleClose={ () => setShow(false) } >
                    <p style={{color: 'red'}}>
                        <b>Attenzione!</b> {text}
                    </p>
                </ModalConfirm>
        </div>

    )
}

BtnConfirm.propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object,
    variant: PropTypes.string,
    text: PropTypes.string,
}

export default BtnConfirm
