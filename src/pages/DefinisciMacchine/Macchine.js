import React, { useEffect, useState } from 'react';
import { addMacchina, deleteMacchina, subscribeMacchine, unsubscribeMacchine } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import ModalNewMacchina from './ModalNewMacchina';
import AlertError from '../../components/AlertError'

/**
 * @return {Component} il componentes
 */
function Macchine() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        subscribeMacchine(setData, setError);
        return unsubscribeMacchine;
    }, []);

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
                            handleAdd={addMacchina}/>
                    </div>
                </div>
            </div>

            <MacchineTable
                data={data}
                handleDelete={deleteMacchina} />
        </div>
    )
}

export default Macchine;
