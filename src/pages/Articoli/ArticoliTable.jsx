import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Row, Col } from 'react-bootstrap'
import paginationFactory from 'react-bootstrap-table2-paginator'
import DeleteButton from '../../components/DeleteButton'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'
import PropTypes from 'prop-types'
import ModalModificaArticolo from '../../components/modal_articoli/ModalModificaArticolo'
import DettaglioRiga from '../../components/DettaglioRiga'

/**
 * Definisce la tabella per visualizzare e gestire gli articoli
 * @param {*} props le properties del component
 * @return {Component} il component creato
 */
function ArticoliTable({data, handleEditArticolo, handleDeleteArticolo}) {
    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     * @return {Component} il component creato
     */
    const defineButtons = (cell, row, rowIndex, formatExtraData) => (
        <Row>
            <Col lg='6' md='6' sm='6'>
                <ModalModificaArticolo
                    articolo={row} />
            </Col>
            <Col lg='6' md='6' sm='6'>
                <DeleteButton
                    title='Elimina'
                    handleConfirm={() => handleDeleteArticolo(row.id)} >
                        <p>Eliminare definitivamente l`&apos;`articolo?</p>
                </DeleteButton>
            </Col>
        </Row>
    )

    // Definizione delle colonne
    const columns = [
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
            headerStyle: (colum, colIndex) => {
                return { width: '120px'};
            },
        },
    ];

    // Definisce cosa mostrare quando la riga nella tabella viene espansa
    const expandRow = {
        renderer: row => {
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
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) return <FaCaretDown/>;
            else return <FaCaretRight/>;
        },
            expandColumnRenderer: ({ expanded }) => {
            if (expanded) return <FaCaretDown color='grey'/>;
            else return <FaCaretRight color='grey'/>;
        },
    }

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

ArticoliTable.propTypes = {
    data: PropTypes.array.isRequired,
    handleEditArticolo: PropTypes.func.isRequired,
    handleDeleteArticolo: PropTypes.func.isRequired,
}

export default ArticoliTable
