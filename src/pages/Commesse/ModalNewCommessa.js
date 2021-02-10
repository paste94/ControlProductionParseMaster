import React, { useState } from 'react';
import { Modal, FormControl, Button, Form, Col } from 'react-bootstrap';


/**
 * Modal specifico per l'aggiunta della commessa
 * 
 * @param {Object}  props properties
 *                  - handleRefresh DEPRECATED (function) Cosa fare quando è necessario un refresh
 * 
 *                  - handleChangeNome (function) handler per la modifica del nome, utile a mantenere lo stato sempre aggiornato
 *                  - handleChangeNumero (function) handler per la modifica del nome, utile a mantenere lo stato sempre aggiornato
 *                  - handleChangeData_offerta (function) handler per la modifica del nome, utile a mantenere lo stato sempre aggiornato
 *                  - handleChangeData_consegna (function) handler per la modifica del nome, utile a mantenere lo stato sempre aggiornato
 *                  - handleAdd (function) handler che gestisce la creazione della commessa
 */
function ModalNewCommessa(props){
    const [show, setShow] = useState(false)
    const [newCommessa, setNewCommessa] = useState({
        nome: '',
        numero: '',
        data_offerta: new Date().toISOString().split('T')[0],
        data_consegna: new Date().toISOString().split('T')[0]
    })

    const handleShow = () => setShow(true)
    const handleClose = () => {
        setNewCommessa({
            nome: '',
            numero: '',
            data_offerta: new Date().toISOString().split('T')[0],
            data_consegna: new Date().toISOString().split('T')[0]
        })
        setShow(false)
    }

    const handleChangeNome = (event) => setNewCommessa({...newCommessa, nome: event.target.value})
    const handleChangeNumero = (event) => setNewCommessa({...newCommessa, numero: event.target.value})
    const handleChangeData_offerta = (event) => setNewCommessa({...newCommessa, data_offerta: event.target.value})
    const handleChangeData_consegna = (event) => setNewCommessa({...newCommessa, data_consegna: event.target.value})

    const handleAddForm = (e) => {
        e.preventDefault();
        props.handleAdd(newCommessa) 
        handleClose()
    }
    
    return (
        <div>
            <Button 
                className='float-right vertical-center' 
                onClick={handleShow}>
                    Aggiungi Commessa
            </Button>
            <Modal
                show={show}
                onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Crea Commessa
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='formAddCommessa' onSubmit={handleAddForm}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Nome Cliente</Form.Label>
                                    <FormControl
                                        placeholder="Nome"
                                        aria-describedby="basic-addon1"
                                        value={newCommessa.nome}
                                        onChange={handleChangeNome}
                                        />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Numero Commessa</Form.Label>
                                    <FormControl
                                        placeholder="Numero"
                                        value={newCommessa.numero}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChangeNumero}
                                        />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Data Offerta</Form.Label>
                                    <Form.Control
                                        placeholder="Data Offerta"
                                        type='date'
                                        value={newCommessa.data_offerta}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChangeData_offerta}
                                        />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Data Consegna</Form.Label>
                                    <FormControl
                                        placeholder="Data Consegna"
                                        type='date'
                                        value={newCommessa.data_consegna}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChangeData_consegna}
                                        />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <p>new: {newCommessa.nome}</p> 
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" type='submit' form='formAddCommessa'>
                            Crea
                        </Button>
                    </Modal.Footer>
            </Modal>   
        </div>
        
    )
}

export default ModalNewCommessa;
