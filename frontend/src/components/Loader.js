import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({tag, customStyle,customColor}) => {
    return (
        <Spinner as={tag} style={customStyle} variant={customColor} animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

Loader.defaultProps = {
    tag:'div',
    customStyle:{display:'block',margin:'100px auto 0', width:'100px',height:'100px'}
}

export default Loader;
