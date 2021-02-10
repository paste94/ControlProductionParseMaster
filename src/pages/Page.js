import React from 'react';
import '../css/simple-sidebar.css';

function Page({children}) {
    return (
        <div id="page-content-wrapper" className='container-fluid mt-4'>
            {children}
        </div>
    );
}

export default Page;
