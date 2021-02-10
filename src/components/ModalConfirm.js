import React from 'react';
import { Modal, Button } from 'react-bootstrap';


/** Crea un modal di confirm usando bootstrap
 * 
 * @param {object}  props property del component
 *                  - show (boolean) Indica se il modal deve essere mostrato o no
 *                  - title (string) Il titolo del modal
 *                  - children (Component) Cosa mostrare nel corpo del confirm
 *                  - handleConfirm (function) Cosa eseguire nel caso sia clickata la conferma
 *                  - handleClose (function) Indica cosa fare se il modal verrà chiuso 
 */
function ModalConfirm(props){

    return (
        <Modal 
            show={props.show}
            onHide={props.handleClose}
            centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={props.handleConfirm}>
                    Conferma
                </Button>
            </Modal.Footer>
        </Modal> 
    )   
}

export default ModalConfirm;
