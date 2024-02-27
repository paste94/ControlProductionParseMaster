import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next'
import { Row, Col } from 'react-bootstrap'
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator'
import DeleteButton from '../../components/DeleteButton'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'
import ModalModificaArticolo from '../../components/modal_articoli/ModalModificaArticolo'
import DettaglioRiga from '../../components/DettaglioRiga'
import { deleteArticolo, subscribeArticoli, unsubscribeArticoli } from '../../DAO/Articoli.service'
import Articolo from '../../classes/Articolo'

/**
 * Definisce la tabella per visualizzare e gestire gli articoli
 * @param {*} props le properties del component
 * @return {Component} il component creato
 */
function ArticoliTable({setSuccess, setError}: PropsWithChildren<{
        setSuccess?: (msg: string) => void,
        setError?: (msg: string) => void,
    }>): ReactElement {

    const [data, setData] = useState<Articolo[]>([])

    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     * @return {Component} il component creato
     */
    const defineButtons = (cell: any, row: Articolo, rowIndex: number, formatExtraData: any) => (
        <Row>
            <Col lg='6' md='6' sm='6'>
                <ModalModificaArticolo
                    articolo={row} />
            </Col>
            <Col lg='6' md='6' sm='6'>
                <DeleteButton
                    title='Elimina'
                    handleConfirm={() => deleteArticolo(row.id)} >
                        <p>Eliminare definitivamente l`&apos;`articolo?</p>
                </DeleteButton>
            </Col>
        </Row>
    )

    // Definizione delle colonne
    const columns:Array<ColumnDescription> = [
        {
            dataField: 'numDisegno',
            text: 'Numero Disegno',
        }, {
            dataField: 'totOre',
            text: 'Tot Ore',
        }, {
            dataField: 'totPreventivo',
            text: 'Preventivo (€)',
        }, {
            dataField: 'azioni',
            text: 'Azioni',
            formatter: defineButtons,
            headerStyle: { width: '250px', textAlign: 'center' },
        },
    ];

    // Definisce cosa mostrare quando la riga nella tabella viene espansa
    const expandRow = {
        renderer: (row: Articolo) => {
            let macchineValue = ''
            if (row.oreMacchina != undefined && row.oreMacchina) {
                Object.entries(row.oreMacchina.map(e => {
                    macchineValue = macchineValue + e.nome + ': ' + e.ore + 'h\n'
                }))
            } else {
                macchineValue = 'Non ci sono tempi macchina impostati per questo articolo'
            }

            return (
                <div>
                    <DettaglioRiga
                        k='Costo Materiale: '
                        v={'€ ' + row['costMat']}
                    />
                    <DettaglioRiga
                        k='Costo Orario: '
                        v={'€ ' + row['costoOrario']}
                    />
                    <DettaglioRiga
                        k='Tempo Macchine: '
                        v={macchineValue}
                    />
                </div>
            )
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        // @ts-ignore
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) return <FaCaretDown/>;
            else return <FaCaretRight/>;
        },
        // @ts-ignore
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) return <FaCaretDown color='grey'/>;
            else return <FaCaretRight color='grey'/>;
        },
    }

    const onPageChange = (page: Number, sizePerPage: Number) => 
        sessionStorage.setItem('ArticoliTablePage', String(page));

    useEffect(() => {
        subscribeArticoli(setData, setError);
        return () => {
            unsubscribeArticoli()
        };
    }, []);

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory({
                    page: sessionStorage.getItem('ArticoliTablePage') != undefined ? Number(sessionStorage.getItem('ArticoliTablePage')) : 1,
                    onPageChange: onPageChange,
                }) }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

export default ArticoliTable
