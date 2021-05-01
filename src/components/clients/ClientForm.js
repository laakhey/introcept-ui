import React, {useEffect, useState} from "react";
import axios from 'axios'
import {Link, useHistory, useParams} from "react-router-dom";

const initialClientState = {
    name: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    nationality: "",
    dateOfBirth: "",
    educationalBackground: "",
    preferredModeOfContact: "",

}

const ClientForm = () => {
    let history = useHistory();
    const {id} = useParams();
    const [client, setClient] = useState(initialClientState);
    const [error, setError] = useState(initialClientState);

    const {
        name,
        gender,
        phone,
        email,
        address,
        nationality,
        dateOfBirth,
        educationalBackground,
        preferredModeOfContact
    } = client;

    let formType = id ? "Update" : "Add";

    const onInputChange = e => {
        setClient({...client, [e.target.name]: e.target.value.trim()});
        if (e.target.value.trim().length === 0) {
            setError({...error, [e.target.name]: "Enter valid " + e.target.name});
        } else {
            setError({...error, [e.target.name]: ""});
        }
    };

    const onAdd = async e => {
        await axios.post("http://localhost:9999/clients", client);
        history.push("/");
    };

    useEffect(() => {
        if (id) {
            loadClient();
        }
    }, []);

    const loadClient = async () => {
        const result = await axios.get(`http://localhost:9999/clients/${id}`);
        setClient(result.data);
    };

    const onUpdate = async e => {
        await axios.patch(`http://localhost:9999/clients/${id}`, client);
        history.push("/");
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (validateFields()) {
            if (id) {
                onUpdate(e);
            } else {
                onAdd(e);
            }
        }

    };
    // TODO use redux-form for better validations and reusability
    const validateFields = () => {
        console.log(client);
        console.log(client.name.trim().length);
        if (client.name.trim().length === 0) {
            setError({...error, ["name"]: "Enter valid Name"});
            return false;
        }
        if (client.gender.trim().length === 0) {
            setError({...error, ["gender"]: "Enter valid Gender"});
            return false;
        }
        if (client.phone.trim().length === 0) {
            setError({...error, ["phone"]: "Enter valid Phone"});
            return false;
        }
        if (client.email.trim().length === 0) {
            setError({...error, ["email"]: "Enter valid Email"});
            return false;
        }
        if (client.address.trim().length === 0) {
            setError({...error, ["address"]: "Enter valid Address"});
            return false;
        }
        if (client.nationality.trim().length === 0) {
            setError({...error, ["nationality"]: "Enter valid Nationality"});
            return false;
        }
        if (client.dateOfBirth.trim().length === 0) {
            setError({...error, ["dateOfBirth"]: "Enter valid DOB"});
            return false;
        }
        if (client.educationalBackground.trim().length === 0) {
            setError({...error, ["educationalBackground"]: "Enter valid Educational Background"});
            return false;
        }
        if (client.preferredModeOfContact.trim().length === 0) {
            setError({...error, ["preferredModeOfContact"]: "Enter valid Preferred mode of contact."});
            return false;
        }
        return true;
    }


    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">
                back to Home
            </Link>
            <div className="w-75 mx-auto shadow p-5">

                <h2 className="text-center mb-4">{formType} A Client</h2>
                <form className="needs-validation" onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <div className="form-group col-8">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.name}
                            </small>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="gender" className="form-label">Gender:</label>
                            <select
                                id="gender"
                                className="form-control"
                                name="gender"
                                value={gender}
                                onChange={e => onInputChange(e)}
                                required={true}
                            >
                                <option></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>

                            {/*<input*/}
                            {/*    id="gender"*/}
                            {/*    type="text"*/}
                            {/*    className="form-control"*/}
                            {/*    placeholder="Gender"*/}
                            {/*    name="gender"*/}
                            {/*    value={gender}*/}
                            {/*    onChange={e => onInputChange(e)}*/}
                            {/*    required={true}*/}
                            {/*/>*/}
                            <small className="text-danger">
                                {error.gender}
                            </small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-5">
                            <label htmlFor="phone" className="form-label">Phone:</label>
                            <input
                                id="phone"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Phone"
                                name="phone"
                                value={phone}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.phone}
                            </small>
                        </div>
                        <div className="form-group col-7">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter Your Email"
                                name="email"
                                value={email}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.email}
                            </small>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input
                            id="address"
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Address"
                            name="address"
                            value={address}
                            onChange={e => onInputChange(e)}
                            required={true}
                        />
                        <small className="text-danger">
                            {error.address}
                        </small>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="nationality" className="form-label">Nationality:</label>
                            <input
                                id="nationality"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Nationality"
                                name="nationality"
                                value={nationality}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.nationality}
                            </small>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="dob" className="form-label">DOB:</label>
                            <input
                                id="dob"
                                type="date"
                                className="form-control"
                                placeholder="Enter Your DOB"
                                name="dateOfBirth"
                                value={dateOfBirth}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.dateOfBirth}
                            </small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="educationalBackground" className="form-label">Educational
                                Background:</label>
                            <input
                                id="educationalBackground"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Educational Background"
                                name="educationalBackground"
                                value={educationalBackground}
                                onChange={e => onInputChange(e)}
                                required={true}
                            />
                            <small className="text-danger">
                                {error.educationalBackground}
                            </small>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="prefMode" className="form-label">Pref. Mode of Contact:</label>
                            <select
                                id="prefMode"
                                className="form-control"
                                name="preferredModeOfContact"
                                value={preferredModeOfContact}
                                onChange={e => onInputChange(e)}
                                required={true}
                            >
                                <option></option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                                <option value="none">None</option>
                            </select>
                            <small className="text-danger">
                                {error.preferredModeOfContact}
                            </small>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-block">{formType} Client</button>
                </form>
            </div>
        </div>
    )
}

export default ClientForm;
