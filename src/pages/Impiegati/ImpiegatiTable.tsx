import React, { PropsWithChildren, ReactElement, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import ModalChip from './ModalChip';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from 'prop-types'
import DeleteButton from '../../components/DeleteButton';
import { deleteImpiegato, updateImpiegato } from '../../DAO/Impiegati.service';
import Impiegato from '../../classes/Impiegato';

type Props = {
    data:Array<Impiegato>, 
    setSuccess: Function,
    setError: Function,
}

/** Definisce la tabella degli impiegati
 *
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - data: I dati da mostrare
 *                  - handleDelete: Handler dell'eliminazione della riga
 *                  - handleEdit (function) Cosa eseguire quando viene
 *                                          impostato il chip
 * @return {Component} Il componente creato
 */
function ImpiegatiTable({data, setSuccess, setError}: PropsWithChildren<Props>): ReactElement {
    const [editRowId, setEditRowId] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setEditRowId('')
    }
    const handleSetChip = (event:any) => {
        if (event.charCode === 13) {
            const id = editRowId
            if(id == ''){
                setError('Errore, ID del record non trovato!')
            } else {
                const newVal = event.target.value
                updateImpiegato(id, {chip: newVal}, setSuccess, setError)
            }
            handleClose();
        }
    }

    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell:any, row:Impiegato, rowIndex:number, formatExtraData:any) => {
        return (
            <div className='row align-items-center'>
                <div className='col'>
                    <DeleteButton
                        handleConfirm={() => deleteImpiegato(row.id, setSuccess, setError)}
                        title={'Elimina impiegato'} >
                            <p>Eliminare definitivamente impiegato?</p>
                    </DeleteButton>
                </div>
            </div>
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
        editable: true,
    }, {
        dataField: 'chip',
        text: 'Chip',
        editable: false,
        events: {
            onClick: (e: any, column: any, columnIndex: number, row: Impiegato, rowIndex: number) => {
                setEditRowId(row.id)
                handleShow()
            },
        },
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        editable: false,
        headerStyle: { width: 20 },
    }];

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                noDataIndication='Tabella vuota. Fai click su "Aggiungi
                                    impiegato" per iniziare'
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue:string, newValue:string, row: Impiegato, column:any) => {
                        updateImpiegato(row.id, {nome: newValue}, setSuccess, setError)
                    },
                })} />

            <ModalChip
                show={show}
                handleClose={handleClose}
                handleSetChip={handleSetChip} />

        </div>
    )
}

export default ImpiegatiTable
