import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const ViewClient = () => {
    const [client, setClient] = useState({
        name: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        nationality: "",
        dateOfBirth: "",
        educationalBackground: "",
        preferredModeOfContact: ""
    });
    const {id} = useParams();
    useEffect(() => {
        loadClient();
    }, []);

    const loadClient = async () => {
        const res = await axios.get(`http://localhost:9999/clients/${id}`);
        setClient(res.data);
    };
    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">
                back to Home
            </Link>
            <h2 className="display-5">Client Id: {id}</h2>
            <hr/>
            <ul className="list-group w-50">
                <li className="list-group-item"><b>Name:</b> {client.name}</li>
                <li className="list-group-item"><b>Gender:</b> {client.gender}</li>
                <li className="list-group-item"><b>Phone:</b> {client.phone}</li>
                <li className="list-group-item"><b>Email:</b> {client.email}</li>
                <li className="list-group-item"><b>Address:</b> {client.address}</li>
                <li className="list-group-item"><b>Nationality:</b> {client.nationality}</li>
                <li className="list-group-item"><b>DOB:</b> {client.dateOfBirth}</li>
                <li className="list-group-item"><b>Educational Background:</b> {client.educationalBackground}</li>
                <li className="list-group-item"><b>Preferred Mode Of Contact:</b> {client.preferredModeOfContact}</li>
            </ul>
        </div>
    );
}
export default ViewClient;
