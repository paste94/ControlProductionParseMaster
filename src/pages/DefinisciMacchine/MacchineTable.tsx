import React, { PropsWithChildren, ReactElement } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types'
import DeleteButton from '../../components/DeleteButton';
import { deleteMacchina } from '../../DAO/Macchine.service';
import Macchina from '../../classes/Macchina';

type Props = {
    data:Array<Macchina>, 
    setSuccess: Function,
    setError: Function,
}

/**
 *
 * @param {Object}  props property composte da
 *                  - data (List) i dati da visualizzare
 *                  - handleDelete (function) cosa eseguire quando voglio eliminare un dato
 * @return {Component} il component creato
 */
function MacchineTable({data, setSuccess, setError}: PropsWithChildren<Props>): ReactElement {
    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell:any, row:Macchina, rowIndex: number, formatExtraData: any) => {
        return (
            <div className='row align-items-center'>
                <div className='col'>
                    <DeleteButton
                        title={'Elimina macchina'}
                        handleConfirm={() => deleteMacchina(row.id, setSuccess, setError)} >
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

export default MacchineTable;
