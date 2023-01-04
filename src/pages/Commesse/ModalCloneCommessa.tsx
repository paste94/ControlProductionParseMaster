import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Modal, FormControl, Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { FaCopy } from 'react-icons/fa'
import { cloneCommessa } from '../../DAO/Commesse.service';
import Commessa from '../../classes/Commessa';

type Props = {
    originalCommessa: Commessa;
    setSuccess: Function;
    setError: Function;
}

/**
 * Modal specifico per l'aggiunta della commessa
 * @param {Object}  props properties
 *                  - handleConfirm (function) handler che gestisce la creazione
 *                      della commessa
 * @return {Component} il componente
 */
function ModalCloneCommessa({originalCommessa, setSuccess, setError}: PropsWithChildren<Props>): React.ReactNode {
    const [show, setShow] = useState(false)
    const [newCommessa, setNewCommessa] = useState({
        nome: originalCommessa.nome,
        numero: originalCommessa.numero,
        data_offerta: new Date().toISOString().split('T')[0],
        data_consegna: new Date().toISOString().split('T')[0],
    })

    const toggle = () => setShow(!show)

    const handleChangeNome = (event: any) =>
        setNewCommessa({...newCommessa, nome: event.target.value})
    const handleChangeNumero = (event: any) =>
        setNewCommessa({...newCommessa, numero: event.target.value})
    const handleChangeDataOfferta = (event: any) =>
        setNewCommessa({...newCommessa, data_offerta: event.target.value})
    const handleChangeDataConsegna = (event: any) =>
        setNewCommessa({...newCommessa, data_consegna: event.target.value})

    const handleSubmit = (e:any) => {
        e.preventDefault();
        cloneCommessa(
            originalCommessa.id, 
            new Commessa(newCommessa.nome, newCommessa.numero, new Date(newCommessa.data_offerta), new Date(newCommessa.data_consegna)),
            setSuccess, 
            setError
        )
        toggle()
    }

    useEffect(() => {
        if (!show) {
            setNewCommessa({
                nome: '',
                numero: '',
                data_offerta: new Date().toISOString().split('T')[0],
                data_consegna: new Date().toISOString().split('T')[0],
            })
        } else if (show && originalCommessa !== undefined) {
            setNewCommessa({
                nome: originalCommessa.nome,
                numero: originalCommessa.numero,
                data_offerta: new Date().toISOString().split('T')[0],
                data_consegna: new Date().toISOString().split('T')[0],
            })
        }
    }, [show])

    return (
        <div>
            <Button
                variant='link'
                title='Copia commessa'
                size='sm'
                onClick={toggle}>
                    <FaCopy style={{color: 'black'}}/>
            </Button>
            <Modal
                show={show}
                onHide={toggle}>
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
                        <Button variant="secondary" onClick={toggle}>
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

ModalCloneCommessa.propTypes = {
    originalCommessa: PropTypes.object.isRequired,
    setSuccess: PropTypes.func,
    setError: PropTypes.func,
}


export default ModalCloneCommessa;
