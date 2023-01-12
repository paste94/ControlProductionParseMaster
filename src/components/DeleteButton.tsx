import React, { PropsWithChildren, useState } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FaTrash } from 'react-icons/fa'
import ModalConfirm from './ModalConfirm'

type Props = {
    title:string, 
    handleConfirm: Function,
    children: JSX.Element,
}

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
function DeleteButton({title, handleConfirm, children}: PropsWithChildren<Props>): JSX.Element {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <div>

            <Button
                variant='link'
                onClick={handleShow}
                title={title}
                size='sm' >
                <FaTrash style={{color: '#b71c1c'}}/>
            </Button>

            <ModalConfirm
                show={show}
                title={title}
                handleConfirm={ () => {
                    handleConfirm(), 
                    handleClose()
                } }
                handleClose={ handleClose } > {children} </ModalConfirm>
        </div>

    )
}

DeleteButton.propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object,
}

export default DeleteButton
