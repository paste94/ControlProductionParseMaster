import React from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { FaTrash } from 'react-icons/fa';

/**
 * 
 * @param {Object}  props property composte da 
 *                  - data (List) i dati da visualizzare
 *                  - handleEdit (function) cosa eseguire quando modifico un campo
 *                  - handleDelete (function) cosa eseguire quando voglio eliminare un dato
 */
function MacchineTable(props){
    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className='row align-items-center'>
                <div className='col'>
                    <Button
                        variant='light'
                        onClick={() => props.handleDelete(row.id)} 
                        title={'Elimina macchina'}>
                        <FaTrash style={{color: '#b71c1c'}}/>
                    </Button>
                </div>
            </div>
        );
    };

    const columns = [
        {
            dataField:'id',
            text: 'ID',
            hidden:true
        },{
            dataField: 'nome',
            text: 'Nome'
        },{
            dataField: 'actions',
            text: 'Azioni',
            formatter: defineButtons,
            editable: false,
            headerStyle: { width: 20 }
        }
    ]

    const handleSetNome = (id, newNome) => props.handleEdit(id, {nome: newNome})

    return (
        <div>
            <BootstrapTable 
                keyField='id' 
                data={ props.data } 
                columns={ columns } 
                cellEdit={ cellEditFactory({ 
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => { 
                        handleSetNome(row.id, newValue)
                    }
                })} />
        </div>
    )
}

export default MacchineTable;
