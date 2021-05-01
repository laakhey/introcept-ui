import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <h2>Page Not Found!</h2>
            <Link exact to="/clients"> Go to Client Page</Link>
        </div>
    );
}


export default NotFound;
