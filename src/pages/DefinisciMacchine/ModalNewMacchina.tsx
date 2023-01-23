import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { Modal, FormControl, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { addMacchina } from '../../DAO/Macchine.service';
import Macchina from '../../classes/Macchina';

type Props = {
    setError: Function,
}
/**
 * Modal specifico per l'aggiunta della macchina
 *
 * @param {Object}  props properties
 * 
 * @return {ReactEelemnt} L'elemento modal creato 
 */
function ModalNewMacchina({setError}: PropsWithChildren<Props>): ReactElement {
    const [show, setShow] = useState(false)
    const [newMacchina, setNewMacchina] = useState({
        nome: '',
    })

    const handleShow = () => setShow(true)
    const handleClose = () => {
        setNewMacchina({
            nome: '',
        })
        setShow(false)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        addMacchina(new Macchina(newMacchina.nome), handleClose, setError)
    }

    const handleChangeNome = (e: any) =>
        setNewMacchina({...newMacchina, nome: e.target.value});

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
                        <Form
                            id='formAddMacchina'
                            onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <FormControl
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    aria-describedby="basic-addon1"
                                    onChange={handleChangeNome} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose} >
                            Annulla
                        </Button>
                        <Button
                            variant="primary"
                            type='submit'
                            form='formAddMacchina' >
                            Crea
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalNewMacchina;
