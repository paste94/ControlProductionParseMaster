import React from 'react';
import { Modal, FormControl, InputGroup, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types'

/**
 * Modal specifico per l'aggiunta dell'impiegato
 * @param {Object}  props properties
 *                  - show (boolean) Mostra o nascondi il modal
 *                  - newImp (object) Oggetto composto da {nome, chip}
 *                      che rappresenta lo stato dell'impiegato creato
 *                  - handleClose (function) handler per la chiusura del modal
 *                  - handleChangeNome (function) handler che si attiva al
 *                      change dell'input del nome
 *                  - handleChangeChip (function) handler che si attiva al
 *                      change dell'input del chip
 *                  - handleShowChip (function) handler che serve a mostrare
 *                      il modal per la selezione del chip
 *                  - handleAddImpiegato (function) handler che gestisce
 *                      l'aggiunta dell'impiegato
 * @return {Component} il component creato
 */
function ModalNewImpiegato({
    newImp,
    show,
    handleClose,
    handleAddImpiegato,
    handleChangeNome,
    handleChangeChip,
    handleShowChip,
}) {
    return (
        <Modal
            show={show}
            onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Crea Impiegato
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='formAddImpiegato' onSubmit={ handleAddImpiegato }>
                        <label>Nome</label>
                        <InputGroup className="mb-3">
                            <FormControl
                                required
                                placeholder="Nome"
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                                onChange={handleChangeNome}
                                />
                        </InputGroup>
                        <label>Numero chip</label>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Numero chip"
                                aria-label="Chip"
                                aria-describedby="basic-addon2"
                                readOnly
                                value={newImp.chip}
                                onChange={ handleChangeChip }
                                >
                            </FormControl>
                            <InputGroup.Append>
                                <Button
                                    variant="secondary"
                                    onClick={handleShowChip} >
                                        Imposta
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Annulla
                    </Button>
                    <Button
                        variant="primary"
                        type='submit'
                        form='formAddImpiegato' >
                            Crea
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

ModalNewImpiegato.propTypes = {
    newImp: PropTypes.object,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    handleAddImpiegato: PropTypes.func,
    handleChangeNome: PropTypes.func,
    handleChangeChip: PropTypes.func,
    handleShowChip: PropTypes.func,
}

export default ModalNewImpiegato;
