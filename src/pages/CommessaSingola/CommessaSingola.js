import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import CommessaSingolaTable from './CommessaSingolaTable'
import ModalCommessaSingola from '../../components/ModalCommessaSingola'
import { FaArrowLeft } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
import {
    addPreventivo,
    getAllPreventivi,
    deletePreventivo,
    editPreventivo,
    subscribePreventivo,
    unsubscribePreventivo,
} from '../../DAO/Preventivo.service'
import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError'
import ModalNuovaCommessaSingola from './ModalNuovaCommessaSingola'


/**
 * @param {object}  props properties
 *                  - commessa (object)
 *                      la commessa da visualizzare, direttamente dal DB
 * @return {Component} il component
 */
function CommessaSingola({commessa}) {
    /**
     * Componenti usate per la gestione del bottone indietro nella navigazione
     * 
     * <ModalCommessaSingola
                        modalFrom ='addCommessa'
                        handleConfirm={ handleAdd }
                        confirmButtonText={'Aggiungi'} />
     */
    // const history = useHistory()

    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const refresh = () => getAllPreventivi(commessa.id, (data) => setData(data))
    // const handleClickBack = () => history.goBack()
    const handleAdd = (newPreventivo) =>
        addPreventivo(newPreventivo, commessa.id, refresh)
    const handleDelete = (id) => deletePreventivo(id, refresh)
    const handleEdit = (prevId, newPreventivo) =>
        editPreventivo(prevId, newPreventivo, refresh)

    useEffect(() => {
        subscribePreventivo(commessa.id, setData, setError);
        return unsubscribePreventivo;
    }, [commessa.id])

    return (
        <div>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />

            <Row className='align-items-center'>
                <Col lg='1' md='1' sm='1'>
                    <NavLink to='/commesse' key={0} activeClassName="active">
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
                    <ModalNuovaCommessaSingola/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CommessaSingolaTable
                        handleConfirm = { handleEdit }
                        handleDelete = { handleDelete }
                        data = { data }
                        id={ commessa.id }/>
                </Col>
            </Row>
        </div>

    )
}

CommessaSingola.propTypes = {
    commessa: PropTypes.object.isRequired,
}

export default CommessaSingola
