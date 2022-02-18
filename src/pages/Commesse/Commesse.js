import React, {useEffect, useState} from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import { deleteCommessa,
    updateCommessa,
    addCommessa,
    subscribeCommesse } from '../../DAO/Commesse.service'
import { Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError'

/**
 * Pagina delle commesse
 * @param {object}  props properties
 *                  - handleShowAlert (function) handler che mostra l'alert
 * @return {Component} Il componente creato
 */
function Commesse({handleShowAlert}) {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const handleDelete = id => deleteCommessa(id)
    const handleEdit = (id, newVal) =>
        updateCommessa(id, newVal)
    const handleAdd = (newCommessa) => {
        addCommessa(
            {
                nome: newCommessa.nome,
                numero: newCommessa.numero,
                data_offerta: new Date(newCommessa.data_offerta),
                data_consegna: new Date(newCommessa.data_consegna),
                preventivo: [],
                chiusa: false,
            },
        )
    }

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => subscribeCommesse(setData, setError), []);

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse</h1>
                    </Row>
                </Col>
                <Col>
                    <ModalNewCommessa
                        handleAdd={handleAdd}/>
                </Col>
            </Row>

            <CommesseTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit} />

        </div>
    )
}

Commesse.propTypes = {
    handleShowAlert: PropTypes.func.isRequired,
}

export default Commesse;
