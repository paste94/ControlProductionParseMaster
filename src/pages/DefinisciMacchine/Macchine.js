import React, { useEffect, useState } from 'react';
import { addMacchina, getAllMacchine, deleteMacchina } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import ModalNewMacchina from './ModalNewMacchina';
import AlertError from '../../components/AlertError'

/**
 * @return {Component} il componente
 */
function Macchine() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const refresh = () => getAllMacchine( setData, setError )
    const handleDelete = id => deleteMacchina(id, refresh, setError)
    const handleAddMacchina = (macchina, successCallback) => {
        addMacchina(
            macchina,
            () => {
                refresh()
                successCallback()
            },
            setError,
        )
    }

    useEffect(() => getAllMacchine(setData, setError), []);

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />
            <div className='container' style={{ marginBottom: 10 }}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <h1>Macchine</h1>
                    </div>
                    <div className='col'>
                        <ModalNewMacchina
                            handleAdd={handleAddMacchina}/>
                    </div>
                </div>
            </div>

            <MacchineTable
                data={data}
                handleDelete={handleDelete} />
        </div>
    )
}

export default Macchine;
