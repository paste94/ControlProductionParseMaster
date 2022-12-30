import React, { PropsWithChildren, useState } from 'react';
import { Modal, FormControl, Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { addCommessa, getCommessa } from '../../DAO/Commesse.service';
import { useHistory } from 'react-router';
import Commessa from '../../classes/Commessa';

type Props = {
    setError: Function;
}

/**
 * Modal specifico per l'aggiunta della commessa
 * @param {Object}  props properties
 * @return {Component} il componente
 */
function ModalNewCommessa({setError}: PropsWithChildren<Props>): React.ReactNode {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [newCommessa, setNewCommessa] = useState({
        nome: '',
        numero: '',
        data_offerta: new Date().toISOString().split('T')[0],
        data_consegna: new Date().toISOString().split('T')[0],
    })

    const handleShow = () => setShow(true)
    const handleClose = () => {
        setNewCommessa({ // Fa reset della commessa
            nome: '',
            numero: '',
            data_offerta: new Date().toISOString().split('T')[0],
            data_consegna: new Date().toISOString().split('T')[0],
        })
        setShow(false)
    }

    const handleChangeNome = (event:any) =>
        setNewCommessa({...newCommessa, nome: event.target.value})
    const handleChangeNumero = (event:any) =>
        setNewCommessa({...newCommessa, numero: event.target.value})
    const handleChangeDataOfferta = (event:any) =>
        setNewCommessa({...newCommessa, data_offerta: event.target.value})
    const handleChangeDataConsegna = (event:any) =>
        setNewCommessa({...newCommessa, data_consegna: event.target.value})

    /**
     * Funzione che apre la funestra della commessa singola una volta che la commessa è stata creata
     * @param {String} commessaId ID dell'oggetto commessa. Questo ID è quello dell'oggetto univoco!
     */
    const openCommessaSingolaView = (commessaId :string) => {
        console.log(commessaId)
        getCommessa(
            commessaId,
            (c: Commessa) => {
                history.push({
                pathname: '/commessasingola',
                // Aggiungo all'oggetto un attributo 'id' che serve al component
                state: {commessa: {id: commessaId, c}},
            })
        },
            setError,
        )
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addCommessa(
            new Commessa(newCommessa.nome, newCommessa.numero, new Date(newCommessa.data_offerta), new Date(newCommessa.data_consegna)),
            openCommessaSingolaView,
            setError,
        )
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
                        <Form id='formAddCommessa' onSubmit={handleSubmit}>
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
                                        onChange={handleChangeDataOfferta}
                                        />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Data Consegna</Form.Label>
                                    <FormControl
                                        placeholder="Data Consegna"
                                        type='date'
                                        value={newCommessa.data_consegna}
                                        aria-describedby="basic-addon1"
                                        onChange={handleChangeDataConsegna}
                                        />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button
                            variant="primary"
                            type='submit'
                            form='formAddCommessa' >
                            Crea
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>

    )
}

ModalNewCommessa.propTypes = {
    setError: PropTypes.func,
}


export default ModalNewCommessa;
