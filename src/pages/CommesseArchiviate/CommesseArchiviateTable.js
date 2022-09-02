import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import DeleteButton from '../../components/DeleteButton'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Row, Col, Button } from 'react-bootstrap'
import { FaArrowUp, FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteCommessaArchiviata, unarchiveCommessa } from '../../DAO/CommesseArchiviate.service';
import ModalCloneCommessa from '../Commesse/ModalCloneCommessa';
import { dateFormatter, timeFormatter } from '../../utils/dateTimeFormatter';
import { subscribeCommesseArchiviate, unsubscribeCommesseArchiviate } from '../../DAO/CommesseArchiviate.service';

/**
 * Definisce la tabella degli impiegati
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - data (array) elenco degli elementi
 * @return {Component} il component creato
 */
function CommesseArchiviateTable({setSuccess, setError}) {
    const [data, setData] = useState([])

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => {
        subscribeCommesseArchiviate(setData, setError);
        return unsubscribeCommesseArchiviate;
    }, []);


    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell, row, rowIndex, formatExtraData) => {
        const commessa = data[rowIndex]
        return (
            <Row>
                <Col lg='2' md='2' sm='2'>
                    <NavLink
                        to={{
                            pathname: '/commessasingola',
                            state: {commessa: commessa},
                        }}>
                        <Button
                            variant='link'
                            title='Visualizza dettagli'
                            size='sm' >
                                <FaEye style={{ color: 'black' }}/>
                        </Button>
                    </NavLink>
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <Button
                        variant='link'
                        title="Rimuovi dall'archivio"
                        size='sm'
                        onClick={ () => unarchiveCommessa(row.id, setSuccess, setError) } >
                            <FaArrowUp style={{color: 'black'}}/>
                    </Button>
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <ModalCloneCommessa
                        originalCommessa={row} />
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <DeleteButton
                        title={'Elimina commessa'}
                        handleConfirm={() => deleteCommessaArchiviata(row.id, setSuccess, setError)} >
                            <p>Eliminare definitivamente la commessa?</p>
                    </DeleteButton>
                </Col>
            </Row>
        );
    };

    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true,
    }, {
        dataField: 'nome',
        text: 'Nome',
        editable: false,
    }, {
        dataField: 'numero',
        text: 'Numero',
        editable: false,
    }, {
        dataField: 'data_offerta',
        text: 'Data Offerta',
        formatter: dateFormatter,
        editable: false,
    }, {
        dataField: 'data_consegna',
        text: 'Data Consegna',
        formatter: dateFormatter,
        editable: false,
    }, {
        dataField: 'chiusa',
        text: 'Chiusa',
        hidden: true,
    }, {
        dataField: 'totOre',
        text: 'Ore preventivate',
        editable: false,
    }, {
        dataField: 'minutiReali',
        text: 'Ore reali',
        formatter: timeFormatter,
        editable: false,
    }, {
        dataField: 'totPreventivo',
        text: 'Ordine (€)',
        editable: false,
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        headerStyle: (colum, colIndex) => {
            return { width: '250px', textAlign: 'center' };
        },
        editable: false,
    }];

    // TODO Snellisci questa funzione
    const rowStyle = (row, index) => {
        const style = {}
        if (row.chiusa) style.backgroundColor='#00e676'
        return style
    }

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                rowStyle={ rowStyle }
                noDataIndication="Tabella vuota"
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => {
                        const newVal = {}
                        newVal[column.dataField] = newValue
                        handleEdit(row.id, newVal)
                    },
                })}
                />
        </div>
    )
}

CommesseArchiviateTable.propTypes = {
    setSuccess: PropTypes.func,
    setError: PropTypes.func,
}

export default CommesseArchiviateTable
