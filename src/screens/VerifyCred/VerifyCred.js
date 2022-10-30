import React, {useState} from 'react';
import axios from "axios";
import "./VerifyCred.css";


const VerifyCred = ({alias, setCredential, credential}) => {
    const [result, setResult] = useState('');

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

    return (
        <React.Fragment>
            <div className='main_div'>
                <h1 className='title'>Verifiable credential to verify</h1>
                <h3 className='VC'>{JSON.stringify(credential)}</h3>
                {!(result==='') ? (
                     <h2 className='verification_result'>{JSON.stringify(result).slice(1, -1)}</h2>
                ):(
                    <>
                        <h2 className='description'>Click the button below to start the verification process.</h2>
                        <button onClick={verify} className="verify_button">Verify your VC</button>
                    </>
                )}            
            </div>
        </React.Fragment>

    );
};

export default VerifyCred;
