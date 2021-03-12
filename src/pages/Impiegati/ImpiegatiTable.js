import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Button} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import ModalChip from './ModalChip';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from 'prop-types'

/**Definisce la tabella degli impiegati
 * 
 * @param {Object}  props Definisce le propertyes della tabella 
 *                  - data: I dati da mostrare
 *                  - handleDelete: Handler dell'eliminazione della riga
 *                  - handleEdit (function) Cosa eseguire quando viene impostato il chip
 */
function ImpiegatiTable({data, handleEdit, handleDelete}) {
    const [editRow, setEditRow] = useState(null)
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setEditRow(null)
    }
    const handleSetChip = (event) => {
        if (event.charCode === 13) {
            const id = editRow.id
            const newVal = event.target.value
            handleEdit(id, {chip: newVal})
            handleClose();
        }
    }

    const handleSetNome = (id, newNome) => handleEdit(id, {nome: newNome})

    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className='row align-items-center'>
                <div className='col'>
                    <Button
                        variant='light'
                        onClick={() => handleDelete(row.id)}
                        title={'Elimina impiegato'} >
                        <FaTrash style={{color: '#b71c1c'}}/>
                    </Button>
                </div>
            </div>
        );
    };

    // Definizione delle colonne
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden:true
    }, {
        dataField: 'nome',
        text: 'Nome'
    }, {
        dataField: 'chip',
        text: 'Chip',
        editable: false,
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => { 
                setEditRow(row)
                handleShow()
            }
        }
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        editable: false,
        headerStyle: { width: 20 }
    }];

    return (
        <div>
            <BootstrapTable 
                keyField='id' 
                data={ data } 
                columns={ columns } 
                pagination={ paginationFactory() }
                cellEdit={ cellEditFactory({ 
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => { 
                        handleSetNome(row.id, newValue)
                    }
                })} />
            
            <ModalChip
                show={show}
                handleClose={handleClose}
                handleSetChip={handleSetChip} />

        </div>
    )
}

ImpiegatiTable.propTypes = {
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default ImpiegatiTable
