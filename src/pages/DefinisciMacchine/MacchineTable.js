import React from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types'
import DeleteButton from '../../components/DeleteButton';

/**
 *
 * @param {Object}  props property composte da
 *                  - data (List) i dati da visualizzare
 *                  - handleDelete (function) cosa eseguire quando voglio eliminare un dato
 * @return {Component} il component creato
 */
function MacchineTable({data, handleDelete}) {
    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className='row align-items-center'>
                <div className='col'>
                    <DeleteButton
                        title={'Elimina macchina'}
                        handleConfirm={() => handleDelete(row.id)} >
                            <p>Eliminare definitivamente la macchina?</p>
                    </DeleteButton>
                </div>
            </div>
        );
    };

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true,
        }, {
            dataField: 'nome',
            text: 'Nome',
        }, {
            dataField: 'actions',
            text: 'Azioni',
            formatter: defineButtons,
            editable: false,
            headerStyle: { width: 20 },
        },
    ]

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns } />
        </div>
    )
}

MacchineTable.propTypes = {
    data: PropTypes.array,
    handleDelete: PropTypes.func,
}

export default MacchineTable;
