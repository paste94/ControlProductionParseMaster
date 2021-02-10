import React from 'react';
import { Modal, FormControl, InputGroup, Button } from 'react-bootstrap';

/**
 * Modal specifico per l'aggiunta dell'impiegato
 * 
 * @param {Object}  props properties
 *                  - show (boolean) Mostra o nascondi il modal
 *                  - newImp (object) Oggetto composto da {nome, chip} che rappresenta lo stato dell'impiegato creato
 *                  - handleClose (function) handler per la chiusura del modal 
 *                  - handleChangeNome (function) handler che si attiva al change dell'input del nome 
 *                  - handleChangeChip (function) handler che si attiva al change dell'input del chip 
 *                  - handleShowChip (function) handler che serve a mostrare il modal per la selezione del chip
 *                  - handleAddImpiegato (function) handler che gestisce l'aggiunta dell'impiegato
 */
function ModalNewImpiegato(props){
    return (
        <Modal 
            show={props.show} 
            onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Crea Impiegato
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Nome</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nome"
                            aria-label="Nome"
                            aria-describedby="basic-addon1"
                            onChange={props.handleChangeNome}
                            />
                    </InputGroup>
                    <label>Numero chip</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Numero chip"
                            aria-label="Chip"
                            aria-describedby="basic-addon2"
                            readOnly
                            value={props.newImp.chip}
                            onChange={props.handleChangeChip}
                            >
                        </FormControl>
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={props.handleShowChip}>Imposta</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Annulla
                    </Button>
                    <Button variant="primary" type='submit' onClick={props.handleAddImpiegato}>
                        Crea
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default ModalNewImpiegato;
