import React, {useState} from 'react';
import {useAlert} from "react-alert";
import axios from "axios";
import "./GetCred.css";


const GetCred = ({alias, setCredential, credential}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [university, setUniversity] = useState('');
    const [result, setResult] = useState('');
    const alert = useAlert()

    async function verify() {
        const verification_result = await axios.post(
            "https://127.0.0.1:8444/verifyVC",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    vc:credential
                }
            }
        );
        setResult(() => verification_result.data)
    }

    async function handleVCgeneration() {
        if (
            name === '' ||
            surname === '' ||
            university === ''
        ) {
            alert.show('Fill all the fields!');
        }
        else {
            const vc = await axios.post(
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
            setCredential(() => vc.data)
        }
    }

    return (
        <React.Fragment>
            {credential===''?(
                <div className= "viewStyle">
                    <h1 className='title'>Get your verifiable credential!</h1>
                    <h2 className='description'>Insert your data, they will be used to generate your credential.</h2>
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
                        onClick={handleVCgeneration}
                        className="login_button"
                    >Get VC</button>
                </div>
            )
            : (
                <div className='cred_div'>
                    <h1 className='title'>Your VC is ready!</h1>
                    <h3 className='VC'>{JSON.stringify(credential)}</h3>
                    {!(result==='') ? (
                        <h2 className='title'>{JSON.stringify(result).slice(1, -1)}</h2>
                    ):(
                        <>
                            <h2 className='description'>Click the button below to start the verification process.</h2>
                            <button onClick={verify} className="verify_button">Verify your VC</button>
                        </>
                    )}     
                </div>
            )}
                
        </React.Fragment>

    );
};

export default GetCred;
