import React, { useState } from 'react';
import { BackgroundPage } from './BackgroundPage';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn, MDBInput } from 'mdbreact';

import { createUser } from '../scripts/graphQL';

export const RegisterPage = () => {
        
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      if(password1 === password2){
        let info = {
          email: email,
          username: username,
          password: password1
        }

        createUser(info.email, info.username, info.password).then(data => {
            if(data !== null) {
                setUsername('');
                //todo: add confirmation message
                setTimeout(() => {
                    window.location.replace("/login");
                }, 3000); 
                //return <Redirect to="/login" />
            }
            
            setEmail('');
            setPassword1('');
            setPassword2('');    
        })
    }
  };

    return (
        <BackgroundPage>
            <MDBRow style={ { display: 'flex', justifyContent: 'center'} }>
                <MDBCol md="4">
                    <MDBCard style={{marginTop: '20%'}}>
                        <MDBCardBody>
                            <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                <h3 className="my-3">
                                    <MDBIcon icon="lock" /> Register:
                                </h3> 
                            </MDBCardHeader>

                            <form onSubmit={onSubmit}>
                                <div className="grey-text" style={{ textAlign: 'left' }}>
                                    <MDBInput 
                                        label="email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                    <MDBInput
                                        label="type your username"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)} />
                                    <MDBInput
                                        label="type your password"
                                        icon="lock"
                                        group
                                        type="password"                                            
                                        validate
                                        value={password1}
                                        onChange={e => setPassword1(e.target.value)} />
                                    <MDBInput
                                        label="type your password again"
                                        icon="lock"
                                        group
                                        type="password"                                            
                                        validate
                                        value={password2}
                                        onChange={e => setPassword2(e.target.value)} />
                                </div>
                                <div className="text-center mt-4">
                                    <MDBBtn
                                        color="light-blue"
                                        className="mb-3"
                                        type="submit">Register</MDBBtn>
                                </div>
                            </form>
                            <MDBModalFooter>
                                <div className="font-weight-light">
                                    <a href="/login">
                                        back to login page
                                    </a>
                                </div>
                            </MDBModalFooter>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </BackgroundPage>
        );
 
};