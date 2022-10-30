import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import logo from './logo.png'
import {useAlert} from "react-alert";
import "./Onboarding.css"
import axios from "axios";


const Onboarding = ({setAlias}) => {
    const [user, setUser] = useState('');
    const [did, setDid] = useState('');
    const [error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const alert = useAlert()
    const navigate = useNavigate();

    function handleClick() {
        navigate("/getCred");
    }

    async function handleRegistration() {
        setVerifying(true);
        if (user === '') {
            alert.show('Fill all the fields!');
        }
        else {
           
            const userDid = await axios.post(
                "https://127.0.0.1:8443/createIdentity",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        alias: user,
                    }
                }
            );
            
            if (userDid.data==="alias_used") {
                setError(() => true);
                setVerifying(false);
            }
            else {
               setAlias(() => user);
               setDid(() => userDid.data);
               setVerifying(false);
            }
        }
    }

    return (
        <React.Fragment>
            {did===''&&verifying===false?(
                <div className= "viewStyle">
                <h1 className='title'>Welcome!</h1>
                <img
                    className="tinyLogo"
                    src={logo}
                    alt={"Logo"}/>
                <div>
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Alias"
                        className="inputField"
                    />
                </div>
                {error===true ? (
                    <h2 className="error">Alias already exists, try again</h2>)
                    :
                    (<></>)
                }
                <button
                    onClick={handleRegistration}
                    className="login_button"
                >Register</button>
            </div>
            )
        : verifying? (
            <div className= "viewStyle">
                <h1 className='title'>The Identity Provider is creating your DID...</h1>
                <h2 className='description'>
                    Some seconds are needed to perform the PoW, after that time if your alias has not been used a DID will be assigned to you!
                </h2>
            </div>
        ):(
            <div className= "viewStyle">
                <h1 className='title'>Your DID is ready!</h1>
                <h2 className='description'>{did}</h2>
                <button className="login_button" onClick={handleClick}>Get a new VC!</button>
            </div>
        )}
            
        </React.Fragment>

    );
};

export default Onboarding;
