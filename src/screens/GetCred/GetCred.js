import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {useAlert} from "react-alert";
import axios from "axios";
import "./GetCred.css";


const GetCred = ({alias, setCredential, credential}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [university, setUniversity] = useState('');
    const alert = useAlert()
    const navigate = useNavigate();

    function handleClick() {
        navigate("/verifyCred");
    }

    async function handleRegistration() {
        if (
            name === '' ||
            surname === '' ||
            university === ''
        ) {
            alert.show('Fill all the fields!');
        }
        else {
            const userData = await axios.post(
                "https://127.0.0.1:8443/createUserVC",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        name: name,
                        surname: surname,
                        university: university,
                        userAlias: alias,
                    }
                }
            );
            setCredential(() => userData.data)
        }
    }

    return (
        <React.Fragment>
            {credential===''?(
                <div className= "viewStyle">
                <h1>Get your verifiable credential!</h1>
                <h2>Insert your data, they will be used to generate your credential.</h2>
                <div className='inputContainer'>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="inputField"
                    />
                    <input
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Surname"
                        className="inputField"
                    />
                    <input
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="University"
                        className="inputField"
                    />
                </div>
                <button
                    onClick={handleRegistration}
                    className="login_button"
                >Get VC</button>
            </div>
            )
        : (
            <div className='cred_div'>
                <h1 className='title'>Your VC is ready!</h1>
                <h3 className='VC'>{JSON.stringify(credential)}</h3>
                <button className='verify_button' onClick={handleClick}>Verify your VC</button>
            </div>
        )}
            
        </React.Fragment>

    );
};

export default GetCred;
