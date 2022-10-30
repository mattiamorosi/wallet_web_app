import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import logo from './logo.png'
import {useAlert} from "react-alert";
import "./Onboarding.css"
import axios from "axios";


const Onboarding = ({setPrevScreen, userInfo, setAlias}) => {
    const [user, setUser] = useState('');
    const [document, setDocument] = useState('');
    const [error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const alert = useAlert()
    const navigate = useNavigate();

    function handleClick() {
        navigate("/getCred");
    }

    async function handleRegistration() {
        setVerifying(true);
        if (user === '' || user === undefined) {
            alert.show('Fill all the fields!');
        }
        else {
           
            const userData = await axios.post(
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
            
            if (userData.data==="alias_used") {
                setError(() => true);
                setVerifying(false);
            }
            else {
               setAlias(() => user);
               setDocument(() => userData.data);
               setVerifying(false);
            }
        }
    }

    return (
        <React.Fragment>
            {document===''&&verifying===false?(
                <div className= "viewStyle">
                <h1>Welcome!</h1>
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
                {error===true ? (<h2 className="error">Alias already exists, try again</h2>):(<></>)}
                <button
                    onClick={handleRegistration}
                    className="login_button"
                >Register</button>
            </div>
            )
        : verifying? (
            <div className= "viewStyle">
                <h1>The Identity Provider is creating your DID...</h1>
                <h3>Some seconds are needed to perform the PoW, after that time if your alias has not been used a DID will be assigned to you!</h3>
            </div>
        ):(
            <div className= "viewStyle">
                <h1>Your DID is ready!</h1>
                <h3>{document}</h3>
                <button className="login_button" onClick={handleClick}>Get a new VC!</button>
            </div>
        )}
            
        </React.Fragment>

    );
};

export default Onboarding;
