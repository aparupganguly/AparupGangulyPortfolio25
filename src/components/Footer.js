import React from 'react';

const Footer = () => {
    return (
        <>
            <footer style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                padding: '20px',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{ marginRight: '20px', cursor: 'pointer' }}>{'<'}</div>
                <div style={{ marginRight: '20px', cursor: 'pointer' }}>{'/'}
                </div>
                <div style={{ marginRight: '20px', fontWeight: 'bold' }}>
                    Aparup Ganguly
                </div>
                <div style={{ marginRight: '20px', cursor: 'pointer' }}>LinkedIn</div>
                <div style={{ marginRight: '20px', cursor: 'pointer' }}>GitHub</div>
                <div style={{ cursor: 'pointer' }}>X (Twitter)</div>
            </footer>
            
        </>
    );
};

export default Footer;



