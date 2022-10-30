import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Onboarding from './screens/Onboarding/Onboarding';
import GetCred from './screens/GetCred/GetCred';
import VerifyCred from './screens/VerifyCred/VerifyCred';

const App = () => {
  const [alias, setAlias] = useState();
  const [credential, setCredential] = useState('');

  return (
      <React.Fragment>
        <BrowserRouter>
          <>
            <Routes>
              <Route
                  path="/"
                  element={
                    <Onboarding setAlias={setAlias} />
                  }
              />
            
              <Route
                  path="/getCred"
                  element={
                    <>
                      <GetCred alias={alias} 
                              setCredential={setCredential} credential={credential}/>
                    </>
                  }
              />
              <Route
                  path="/verifyCred"
                  element={
                    <>
                      <VerifyCred setCredential={setCredential} credential={credential}/>
                    </>
                  }
              />
            </Routes>
          </>
        </BrowserRouter>
      </React.Fragment>
  );
};
export default App;
