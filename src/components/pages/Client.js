import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Utils from "../../Utils.const";

const Client = () => {

    const [p, setPage] = useState([]);
    const {elements, page, totalPage, totalElements} = p;
    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async (page) => {
        const pageNumber = page ? page : 0;
        const result = await axios.get(Utils.URL + Utils.CLIENTS + "?page=" + pageNumber);
        console.log(result);
        setPage(result.data);
    }

    const nextPage = (page) => {
        if (page <= totalPage) {
            loadClients(Number(page) + 1);
        }
    }

    const previousPage = (page) => {
        if (Number(page) > 0) {
            loadClients(Number(page) - 1);
        }
    }

    const deleteClient = async id => {
        const r = window.confirm("Do you really want to delete?");
        if (r === true) {
            await axios.delete(`${Utils.URL + Utils.CLIENTS}/${id}`);
            loadClients();
        }
    };

    return (
        <div className="container">
            <div className="py-4">

                <div className="row">
                    <div className="col-6"><h2>Client Page</h2></div>
                    <div className="col-6"><Link className="btn btn-primary float-right" to="/clients/add">Add
                        Client</Link></div>

                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        elements?.map((client, index) => (
                            <tr key={client.id}>
                                <th>{index + 1}</th>
                                <td>{client.name}</td>
                                <td>{client.gender}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>
                                    <Link to={`/clients/${client.id}`}><i
                                        className="fas fa-eye text-secondary mr-2"></i></Link>
                                    <Link to={`/clients/edit/${client.id}`}><i
                                        className="fas fa-edit text-primary mr-2"></i></Link>
                                    <a href="#" onClick={() => deleteClient(client.id)}> <i
                                        className="fas fa-trash text-danger"></i></a>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <nav aria-label="..." className="float-right">
                    <ul className="pagination">
                        <li className={Number(page) == 0 ? "page-item disabled" : "page-item"}>
                            <a onClick={() => previousPage(page)} className="page-link" href="#" tabIndex="-1"
                               >Previous</a>
                        </li>
                        <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">{Number(page)+1}</a>
                        </li>
                        <li className={Number(page) > totalPage-1 ? "page-item disabled" : "page-item"}>
                            <a onClick={() => nextPage(page)} className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}


export default Client;
