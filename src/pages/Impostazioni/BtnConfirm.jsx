import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FaTrash } from 'react-icons/fa'
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
}) {
    const [show, setShow] = useState(false)

    return (
        <div>

            <Button
                onClick={ () => setShow(true)}
                title={title}>
                    {children}
            </Button>

            <ModalConfirm
                show={show}
                title={title}
                handleConfirm={ () => handleConfirm(setShow(false)) }
                handleClose={ () => setShow(false) } >
                    <p style={{color: 'red'}}>
                        <b>Attenzione!</b> Questa operazione non può essere annullata, se non si è certi delle conseguenze NON confermare!
                    </p>
                </ModalConfirm>
        </div>

    )
}

BtnConfirm.propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object,
}

export default BtnConfirm
