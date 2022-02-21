import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'

// TODO: Cerca di capire come fare un confirm con il tasto enter

/**
 * Crea un modal di confirm usando bootstrap
 * @param {object}  props property del component
 *                  - show (boolean) Indica se il modal deve essere mostrato o no
 *                  - title (string) Il titolo del modal
 *                  - children (Component) Cosa mostrare nel corpo del confirm
 *                  - handleConfirm (function) Cosa eseguire nel caso sia clickata la conferma
 *                  - handleClose (function) Indica cosa fare se il modal verrà chiuso
 * @return {Component} il componente
 */
function ModalConfirm({title, show, handleClose, handleConfirm, children}) {
    const handleSumit = (e) => {
        e.preventDefault();
        handleConfirm();
    }

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
                <Form
                    id='formConfirm'
                    onSubmit={handleSumit}
                >
                    <Button
                        autoFocus
                        variant="primary"
                        type='submit'
                        form='formConfirm' >
                        Conferma
                    </Button>
                </Form>
            </Modal.Footer>
        </Modal>
    )
}


ModalConfirm.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default ModalConfirm;
