import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import CommessaSingolaTable from './CommessaSingolaTable'
import ModalCommessaSingola from '../../components/ModalCommessaSingola'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import {
    addPreventivo,
    getAllPreventivi,
    deletePreventivo,
    editPreventivo,
} from '../../DAO/Preventivo.service'
import PropTypes from 'prop-types'


/**
 * @param {object}  props properties
 *                  - commessa (object)
 *                      la commessa da visualizzare, direttamente dal DB
 * @return {Component} il component
 */
function CommessaSingola({commessa}) {
    /**
     * Componenti usate per la gestione del bottone indietro nella navigazione
     */
    const history = useHistory()

    const [data, setData] = useState([])

    const refresh = () => getAllPreventivi(commessa.id, (data) => setData(data))
    const handleClickBack = () => history.goBack()
    const handleAdd = (newPreventivo) =>
        addPreventivo(newPreventivo, commessa.id, refresh)
    const handleDelete = (id) => deletePreventivo(id, refresh)
    const handleEdit = (prevId, newPreventivo) =>
        editPreventivo(prevId, newPreventivo, refresh)

    useEffect(() => {
        getAllPreventivi(commessa.id, (data) => setData(data))
    }, [commessa.id])

    return (
        <div>
            <Row className='align-items-center'>
                <Col lg='1'>
                    <Button
                        variant='transparent'
                        onClick={handleClickBack}
                        title='Indietro' >
                            <FaArrowLeft/>
                    </Button>
                </Col>
                <Col lg='8'>
                    <h1>
                        Commessa
                        {commessa.nome}
                        {commessa.chiusa && '(chiusa)'}
                    </h1>
                </Col>
                <Col>
                    <ModalCommessaSingola
                        modalFrom ='addCommessa'
                        handleConfirm={ handleAdd }
                        confirmButtonText={'Aggiungi'} />
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
