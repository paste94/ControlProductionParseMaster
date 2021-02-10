import React, { useState } from 'react';
import { Modal, FormControl, InputGroup, Button, Form } from 'react-bootstrap';
import { addMacchina } from '../../DAO/Macchine.service';

/**
 * Modal specifico per l'aggiunta della macchina
 * 
 * @param {Object}  props properties
 *                  - handleRefresh (function) handler che gestisce il refresh della tabella
 *                  - handleShowAlert (function) handler che mostra l'alert
 */
function ModalNewMacchina(props){
    const [show, setShow] = useState(false)
    const [newMacchina, setNewMacchina] = useState({});

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleAddForm = (e) => {
        addMacchina(newMacchina, 
            (error) => props.handleShowAlert(error)
        )
        props.handleRefresh();
        handleClose()
        e.preventDefault();
    }

    const handleChangeNome = (event) => setNewMacchina({...newMacchina, nome: event.target.value});

    // AGGIUNGI NUOVA MACCHINA
    const handleAddMacchina = () => {
        
    };
    
    return (
        <div>
            <Button 
                className='float-right vertical-center'
                onClick={handleShow} >
                    Aggiungi macchina
            </Button>
            <Modal
                show={show}
                onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Crea Macchina
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='formAddMacchina' onSubmit={handleAddForm}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <FormControl
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    aria-describedby="basic-addon1"
                                    onChange={handleChangeNome}
                                    />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" type='submit' form='formAddMacchina'>
                            Crea
                        </Button>
                    </Modal.Footer>
            </Modal>    
        </div>
    )
}

export default ModalNewMacchina;
