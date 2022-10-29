import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {useAlert} from "react-alert";
import axios from "axios";
import "./VerifyCred.css";


const VerifyCred = ({alias, setCredential, credential}) => {
    const [result, setResult] = useState('');
    const alert = useAlert()
    const navigate = useNavigate();

    async function verify() {
        const verification_result = await axios.post(
            "http://127.0.0.1:5001/verifyVC",
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

    return (
        <React.Fragment>
            <div className='main_div'>
                <h1>Verifiable credential to verify</h1>
                <h3>{JSON.stringify(credential)}</h3>
                {!(result==='') ? (
                     <h2>{JSON.stringify(result).slice(1, -1)}</h2>
                ):(
                    <>
                        <h2>Click the bottom below to start the verification process.</h2>
                        <button onClick={verify} className="verify_button">Verify your VC</button>
                    </>
                )}            
            </div>
        </React.Fragment>

    );
};

export default VerifyCred;
