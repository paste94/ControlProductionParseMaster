import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import DeleteButton from '../../components/DeleteButton'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Row, Col, Button } from 'react-bootstrap'
import { FaCheck, FaEye, FaArrowDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { archiveCommessa, deleteCommessa } from '../../DAO/Commesse.service';
import ModalCloneCommessa from './ModalCloneCommessa';

/**
 * Definisce la tabella degli impiegati
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - data (array) elenco degli elementi
 *                  - handleDelete (function) Gestisce l'eliminazione
 *                      dell'elemento
 *                  - handleEdit (function) Gestisce la modifica dell'elemento
 * @return {Component} il component creato
 */
function CommesseTable({data, handleEdit, setSuccess, setError}) {
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
                        title='Apri/chiudi commessa'
                        size='sm'
                        onClick={ () => {
                            'chiusa' in row ?
                                thisHandleEdit(row.id, {chiusa: !row.chiusa}) :
                                thisHandleEdit(row.id, {chiusa: true})
                        }} >
                            <FaCheck style={{color: 'black'}}/>
                    </Button>
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <Button
                        variant='link'
                        title='Archivia commessa'
                        size='sm'
                        onClick={ () => archiveCommessa(row.id) } >
                            <FaArrowDown style={{color: 'black'}}/>
                    </Button>
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <ModalCloneCommessa
                        originalCommessa={row}
                        setError={setError}
                        setSuccess={setSuccess} />
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <DeleteButton
                        title={'Elimina commessa'}
                        handleConfirm={() => deleteCommessa(row.id, setSuccess, setError)} >
                            <p>Eliminare definitivamente la commessa?</p>
                    </DeleteButton>
                </Col>
            </Row>
        );
    };

    const thisHandleEdit = (id, newValue) => {
        if ('data_offerta' in newValue) {
            newValue.data_offerta = new Date(newValue.data_offerta)
        } else if ('data_consegna' in newValue) {
            newValue.data_consegna = new Date(newValue.data_consegna)
        }
        handleEdit(id, newValue)
    }

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
        dataField: 'chiusa',
        text: 'Chiusa',
        hidden: true,
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        headerStyle: (colum, colIndex) => {
            return { width: '200px', textAlign: 'center' };
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

CommesseTable.propTypes = {
    data: PropTypes.array,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    setSuccess: PropTypes.func,
    setError: PropTypes.func,
}

export default CommesseTable
