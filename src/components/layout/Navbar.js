import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Utils from "../../Utils.const";

const downloadClientCSV = async (e) => {
    e.preventDefault();
    console.log('downloading client csv file');
    window.open(Utils.URL + Utils.DOWNLOAD);
}
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Introcept Client UI</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clients">Clients</NavLink>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-outline-light" onClick={(e) => downloadClientCSV(e)}>Download Client CSV</a>
            </div>
        </nav>
    );
}


export default NavBar;
