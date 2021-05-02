import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Utils from "../../Utils.const";

const Client = () => {

    const [clients, setClient] = useState([]);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const result = await axios.get(Utils.URL + Utils.CLIENTS);
        console.log(result);
        setClient(result.data.reverse());
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
                        clients.map((client, index) => (
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
            </div>
        </div>
    );
}


export default Client;
