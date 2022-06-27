import React from 'react';
import { Spinner } from 'react-bootstrap';
import { BsPrefixComponent } from 'react-bootstrap/esm/helpers';

const Loader = ({tag, customStyle,customColor}) => {
    return (
        <div className="spinner-box">
            <Spinner as={tag} style={customStyle} variant={customColor} animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

Loader.defaultProps = {
    tag:'div',
    customStyle:{display:'block',margin:'auto', width:'100px',height:'100px'}
}

export default Loader;
