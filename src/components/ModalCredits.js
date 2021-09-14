import React, {useState} from 'react';
import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap';
import packageJson from '../../package.json';
import { FaSync } from 'react-icons/fa';

/**
 * Crea un modal di confirm usando bootstrap
 * @param {object}  props property del component
 *                  - show (boolean) Indica se il modal deve essere mostrato o no
 * @return {Component} il modal creato
 */
function ModalCredits(props) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <ListGroup.Item
                as='button'
                className="list-group-item list-group-item-action bg-light sidebar-btn"
                onClick={handleShow} >
                Credits
            </ListGroup.Item>
            <Modal
                show={show}
                onHide={handleClose}
                centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        CREDITS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='text-center'>
                            <img src={'../icon.ico'} alt='lathe icon' style={{width: '50px', marginTop: '15px', marginBottom: '10px'}} ></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <b>Control Production</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <div>{packageJson.version}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <b>Sviluppatore</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <div>Riccardo Pasteris</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <a href='mailto:94paste94@gmail.com'>94paste94@gmail.com</a>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => alert('TODO')}>
                        <FaSync></FaSync> Aggiorna
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalCredits;
