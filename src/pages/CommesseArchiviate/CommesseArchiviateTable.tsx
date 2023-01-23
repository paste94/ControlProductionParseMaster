import React, { useState, useEffect, PropsWithChildren, ReactElement } from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
// @ts-ignore
import cellEditFactory from 'react-bootstrap-table2-editor'
import DeleteButton from '../../components/DeleteButton'
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Row, Col, Button } from 'react-bootstrap'
import { FaArrowUp, FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteCommessaArchiviata, unarchiveCommessa } from '../../DAO/CommesseArchiviate.service';
import ModalCloneCommessa from '../Commesse/ModalCloneCommessa';
import { dateFormatter, timeFormatter } from '../../utils/dateTimeFormatter';
import { subscribeCommesseArchiviate, unsubscribeCommesseArchiviate } from '../../DAO/CommesseArchiviate.service';
import Commessa from '../../classes/Commessa';

/**
 * Tabella che contiene le commesse e i bottoni azioni per esse.
 *
 * @param {Function} setSuccess - Callback per il successo del component
 * @param {Function} setError - Callback per il fallimento del component
 * 
 * @return {ReactElement} Il component tabella 
 */
function CommesseArchiviateTable({setSuccess, setError}: PropsWithChildren<{
    setSuccess: (msg: string) => void,
    setError: (msg: string) => void,
}>): ReactElement {
    const [data, setData] = useState<Commessa[]>([])

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => {
        subscribeCommesseArchiviate(setData, setError);
        return () => {
            unsubscribeCommesseArchiviate()
        };
    }, []);


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
    const columns:Array<ColumnDescription> = [{
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
        dataField: 'data_offerta_string',
        text: 'Data Offerta',
        formatter: dateFormatter,
        editable: false,
    }, {
        dataField: 'data_consegna_string',
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
        editable: false,
    }, {
        dataField: 'totPreventivo',
        text: 'Ordine (€)',
        editable: false,
    }, {
        dataField: 'actions',
        text: 'Azioni',
        formatter: defineButtons,
        headerStyle: { width: '250px', textAlign: 'center' },
        editable: false,
    }];

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                rowStyle={ (row:Commessa, index:number) => row.chiusa ? { backgroundColor: '#00e676' } : {} }
                noDataIndication="Tabella vuota"
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
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
