import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

/** Crea un modal di confirm usando bootstrap
 * 
 * @param {object}  props property del component
 *                  - show (boolean) Indica se il modal deve essere mostrato o no
 *                  - title (string) Il titolo del modal
 *                  - children (Component) Cosa mostrare nel corpo del confirm
 *                  - handleConfirm (function) Cosa eseguire nel caso sia clickata la conferma
 *                  - handleClose (function) Indica cosa fare se il modal verrà chiuso 
 */
function ModalConfirm({title, show, handleClose, handleConfirm}) {
    return (
        <Modal 
            show={show}
            onHide={handleClose}
            centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Conferma
                </Button>
            </Modal.Footer>
        </Modal> 
    )   
}


ModalConfirm.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
}

export default ModalConfirm;
