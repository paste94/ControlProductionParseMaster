import React, { CSSProperties, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
// @ts-ignore
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import DeleteButton from '../../components/DeleteButton'
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Row, Col, Button } from 'react-bootstrap'
import { FaCheck, FaEye, FaArrowDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { archiveCommessa, deleteCommessa, subscribeCommesse, unsubscribeCommesse, updateCommessa } from '../../DAO/Commesse.service';
import ModalCloneCommessa from './ModalCloneCommessa';
import {dateFormatter, timeFormatter} from '../../utils/dateTimeFormatter';
import Commessa from '../../classes/Commessa';

/**
 * Tabella che contiene le commesse e i bottoni azioni per esse.
 *
 * @prop data - I dati da visualizzare nella tabella
 * @prop setSuccess - Callback per il successo del component
 * @prop setError - Callback per il fallimento del component
 */
function CommesseTable({setSuccess, setError}: PropsWithChildren<{
        setSuccess?: (msg: string) => void,
        setError?: (msg: string) => void,
    }>): ReactElement {
    
    const [data, setData] = useState<Commessa[]>([])

    // Definizione dei bottoni nell'ultima colonna
    const defineButtons = (cell: any, row: Commessa, rowIndex: number, formatExtraData: any) => {
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
                            handleEdit(row.id, {chiusa: !row.chiusa})
                        }} >
                            <FaCheck style={{color: 'black'}}/>
                    </Button>
                </Col>
                <Col lg='2' md='2' sm='2'>
                    <Button
                        variant='link'
                        title='Archivia commessa'
                        size='sm'
                        onClick={ () => archiveCommessa(row.id, setSuccess, setError) } >
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

    /**
     * Eseguito quando viene fatta richiesta di modifica di un elemento. 
     * @param id ID della commessa da modificare
     * @param newValue Nuovo valore da assegnare alla commessa. Questo deve essere un oggeto 
     * _{k,v}_ dove _k_ è il nome della chiave da modificare e _v_ è il nuovo valore
     */
    const handleEdit = (id:string, newValue:any) => {
        if ('data_offerta_string' in newValue) {
            updateCommessa(id, {'data_offerta': newValue.data_offerta_string})
        } else if ('data_consegna_string' in newValue) {
            updateCommessa(id, {'data_consegna': newValue.data_consegna_string})
        } else {
            updateCommessa(id, newValue)
        }
    }

    /**
     * Definisce le colonne che vengono poi mostrate nella tabella 
     */
    const columns:Array<ColumnDescription> = [{
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
        dataField: 'data_offerta_string',
        text: 'Data Offerta',
        formatter: dateFormatter,
        editor: {type: Type.DATE},
    }, {
        dataField: 'data_consegna_string',
        text: 'Data Consegna',
        formatter: dateFormatter,
        editor: {type: Type.DATE},
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
        dataField: 'chiusa',
        text: 'Chiusa',
        hidden: true,
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        headerStyle: { width: '250px', textAlign: 'center' } ,
        editable: false,
    }];

    
    useEffect(() => {
        subscribeCommesse(setData, setError);
        return () => {
            unsubscribeCommesse()
        };
    }, []);

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                rowStyle={ (row:Commessa, index:number) => row.chiusa ? {backgroundColor:'#00e676'} : {} }
                noDataIndication="Tabella vuota"
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue:any, newValue:any, row:Commessa, column: ColumnDescription) => {
                        let newVal:any = {}
                        newVal[column.dataField] = newValue
                        handleEdit(row.id, newVal)
                    },
                })}
                />
        </div>
    )
}

export default CommesseTable
