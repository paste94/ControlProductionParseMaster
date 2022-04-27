import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import DeleteButton from '../../components/DeleteButton'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Row, Col, Button } from 'react-bootstrap'
import { FaArrowUp, FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { unarchiveCommessa } from '../../DAO/CommesseArchiviate.service';
import ModalCloneCommessa from '../Commesse/ModalCloneCommessa';

/**
 * Definisce la tabella degli impiegati
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - data (array) elenco degli elementi
 *                  - handleDelete (function) Gestisce l'eliminazione
 *                      dell'elemento
 *                  - handleEdit (function) Gestisce la modifica dell'elemento
 * @return {Component} il component creato
 */
function CommesseArchiviateTable({data, handleDelete}) {
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
                        onClick={ () => unarchiveCommessa(row.id) } >
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
                        handleConfirm={() => handleDelete(row.id)} >
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
    }, {
        dataField: 'numero',
        text: 'Numero',
    }, {
        dataField: 'data_offerta',
        text: 'Data Offerta',
        formatter: (cell) => {
            if (cell == null || cell === '') {
                return '-/-/-'
            }
            const [y, m, d] = cell.split('T')[0].split('-')
            return d + '/' + m + '/' + y
        },
        editor: {type: Type.DATE},
    }, {
        dataField: 'data_consegna',
        text: 'Data Consegna',
        formatter: (cell) => {
            if (cell == null || cell === '') {
                return '-/-/-'
            }
            const [y, m, d] = cell.split('T')[0].split('-')
            return d + '/' + m + '/' + y
        },
        editor: {type: Type.DATE},
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
        formatter: cell => {
            const h = Math.floor(cell/60)
            const min = Math.floor(cell-(h*60))
            return h + 'h ' + min + 'm'
        },
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
            return { width: '150px', textAlign: 'center' };
        },
        editable: false,
    }];

    // TODO Snellisci questa funzione
    const rowStyle = (row, index) => {
        const style = {}
        if (row.chiusa) {
            style.backgroundColor='#00e676'
        }
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
    data: PropTypes.array,
    handleDelete: PropTypes.func,
}

export default CommesseArchiviateTable
