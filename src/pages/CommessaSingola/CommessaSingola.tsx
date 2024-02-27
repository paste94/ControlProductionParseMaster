import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import CommessaSingolaTable from './CommessaSingolaTable'
import { FaArrowLeft } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { subscribePreventivo, unsubscribePreventivo } from '../../DAO/Preventivo.service'
import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError'
import ModalNuovaCommessaSingola from '../../components/modal_articoli/ModalNuovaCommessaSingola';
import Commessa from '../../classes/Commessa';


/**
 * @param {object}  props properties
 *                  - commessa (object)
 *                      la commessa da visualizzare, direttamente dal DB
 * @return {Component} il component
 */
function CommessaSingola({commessa}: PropsWithChildren<{
        commessa: Commessa
    }>) {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [backDestination, setBackDestination] = useState('/commesse')

    useEffect(() => {
        if (commessa.archiviata) {
            setBackDestination('/commesse_archiviate')
        }
        subscribePreventivo(commessa.id, setData, (err: string) => console.error('error', err));
        return () => {
            unsubscribePreventivo();
        };
    }, [commessa.id])

    return (
        <div>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />

            <Row className='align-items-center'>
                <Col lg='1' md='1' sm='1'>
                    <NavLink to={backDestination} >
                        <Button
                            variant='transparent'
                            title='Indietro' >
                            <FaArrowLeft/>
                        </Button>
                    </NavLink>
                </Col>
                <Col lg='8' md='6' sm='6'>
                    <h1>
                        Commessa {commessa.nome} {commessa.chiusa && '(chiusa)'}
                    </h1>
                </Col>
                <Col>
                    {!commessa.archiviata && <ModalNuovaCommessaSingola commessaId={ commessa.id } />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <CommessaSingolaTable
                        data = { data }
                        archiviata={ commessa.archiviata } />
                </Col>
            </Row>
        </div>

    )
}

CommessaSingola.propTypes = {
    commessa: PropTypes.object.isRequired,
    page: PropTypes.number,
}

export default CommessaSingola
