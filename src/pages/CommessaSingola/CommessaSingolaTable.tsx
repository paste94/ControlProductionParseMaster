import React, { PropsWithChildren, ReactElement } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import DeleteButton from '../../components/DeleteButton';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Row, Col } from 'react-bootstrap';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import PropTypes from 'prop-types'
import ModalModificaCommessaSingola from '../../components/modal_articoli/ModalModificaCommessaSingola';
import DettaglioRiga from '../../components/DettaglioRiga';
import { deletePreventivo } from '../../DAO/Preventivo.service';
import Articolo from '../../classes/Articolo';

/** Definisce la tabella degli impiegati
 *
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - id (string) id della commessa da mostrare
 * @return {Component} il component creato
 */
function CommessaSingolaTable({data,archiviata}: PropsWithChildren<{
        data: Articolo[],
        archiviata: boolean
    }>): ReactElement {
    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella
     *
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     * @return {Component} i componenti creati
     */
    const defineButtons = (cell: any, articolo: Articolo, rowIndex: Number, formatExtraData: any) => (
        <Row>
            { !archiviata &&
                <Col lg='6' md='6' sm='6'>
                    <ModalModificaCommessaSingola commessaSingola={articolo} />
                </Col>
            }
            <Col lg='6' md='6' sm='6'>
                <DeleteButton
                    title='Elimina'
                    handleConfirm={ () => deletePreventivo(articolo.id, () => {}) } >
                        <p>Eliminare definitivamente la commessa?</p>
                </DeleteButton>
            </Col>
        </Row>
    )

    // Definizione delle colonne
    const columns = [{
        dataField: 'numDisegno',
        text: 'Numero Disegno',
    }, {
        dataField: 'totOre',
        text: 'Tot Ore',
    }, {
        dataField: 'totPreventivo',
        text: 'Ordine (€)',
    }, {
        dataField: 'numPezzi',
        text: 'Numero Pezzi',
    }, {
        dataField: 'azioni',
        text: 'Azioni',
        formatter: defineButtons,
    }];

    // Definisce cosa mostrare quando la riga nella tabella viene espansa
    const expandRow = {
        renderer: (articolo: Articolo) => {
            let macchineValue = ''

            if (articolo.oreMacchina != undefined && articolo.oreMacchina) {
                Object.entries(articolo.oreMacchina.map((e: any) => {
                    macchineValue = macchineValue + e.nome + ': ' + e.ore + 'h\n'
                }))
            } else {
                macchineValue = 'Non ci sono tempi macchina impostati per questo articolo'
            }

            return (
                <div>
                    <DettaglioRiga
                        k='Costo Materiale: '
                        v={'€ ' + articolo['costMat']}
                    />
                    <DettaglioRiga
                        k='Costo Orario: '
                        v={'€ ' + articolo['costoOrario']}
                    />
                    <DettaglioRiga
                        k='Macchine: '
                        v={macchineValue}
                    />
                </div>
            )
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }: any) => {
            if (isAnyExpands) return <FaCaretDown/>;
            else return <FaCaretRight/>;
          },
          expandColumnRenderer: ({ expanded }: any) => {
            if (expanded) return <FaCaretDown color='grey'/>;
            else return <FaCaretRight color='grey'/>;
          },
    };

    const onPageChange = (page: Number, sizePerPage: Number) => 
        sessionStorage.setItem('CommessaSingolaTablePage', String(page));

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory({
                    page: sessionStorage.getItem('CommessaSingolaTablePage') != undefined ? Number(sessionStorage.getItem('CommessaSingolaTablePage')) : 1,
                    onPageChange: onPageChange,
                }) }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

CommessaSingolaTable.propTypes = {
    data: PropTypes.array.isRequired,
    archiviata: PropTypes.bool,
}

export default CommessaSingolaTable
