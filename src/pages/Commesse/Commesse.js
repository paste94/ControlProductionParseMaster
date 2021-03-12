import React, {useEffect, useState} from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import { deleteCommessa,
    getAllCommesse,
    updateCommessa,
    addCommessa } from '../../DAO/Commesse.service'
import { Col, Row, Button } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';
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
    const [error, setError] = useState({
        show: false,
        title: '',
        message: '',
    })
    const refresh = () => getAllCommesse( setData, setError )
    const handleDelete = id => deleteCommessa(id, refresh)
    const handleEdit = (id, newVal) => {
        updateCommessa(id, newVal, refresh)
    }
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
            refresh,
        )
    }

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => {
        getAllCommesse( result => setData(result))
    }, []);

    return (
        <div className='page'>
            <AlertError
                show={error.show}
                title={error.title}
                message={error.message} />
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse</h1>
                        <Button
                            variant="link"
                            size="lg"
                            onClick={() => refresh()}>
                                <MdRefresh color='grey' />
                            </Button>
                    </Row>
                </Col>
                <Col>
                    <ModalNewCommessa
                        handleShowAlert={handleShowAlert}
                        handleAdd={handleAdd}/>
                </Col>
            </Row>

            <CommesseTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleShowAlert={handleShowAlert} />

        </div>
    )
}

Commesse.propTypes = {
    handleShowAlert: PropTypes.func.isRequired,
}

export default Commesse;
