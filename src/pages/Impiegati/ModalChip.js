import React from 'react';
import { Modal, FormControl, InputGroup, Button } from 'react-bootstrap';

/** Definisce il modal che permette di impostare il chip
 *  
 * @param {Object}  props le property passate al modal 
 *                  - show (boolean) indica se il modal deve essere mostrato o no
 *                  - handleClose (function) Cosa eseguire quando chiudo il modal si chiude
 *                  - handleSetChip (function) Cosa eseguire quando viene impostato il chip
 */
function ModalChip(props){

    return (
        <Modal 
            show={props.show}
            onHide={props.handleClose}
            centered
            size="sm"
            animation={false}
            style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
            }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Imposta chip
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label style={{color:'red'}}>Scorri il badge sul lettore per impostare il codice</label>
                <InputGroup className="mb-3">
                    <FormControl
                        autoFocus
                        placeholder="Chip"
                        aria-label="Chip"
                        aria-describedby="basic-addon1"
                        onKeyPress={props.handleSetChip}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Annulla
                </Button>
            </Modal.Footer>
        </Modal> 
    )   
}

export default ModalChip;
