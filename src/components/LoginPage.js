import React, { useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Redirect } from 'react-router-dom';
import { BackgroundPage } from './BackgroundPage';

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn, MDBInput } from 'mdbreact';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthContext>
            {({ error, user, signIn }) => {

                if (user) {
                    return <Redirect to="/" />
                }

                const onSubmit = (e) => {
                    e.preventDefault();
                    signIn({ email, password });
                };

                return (
                    <BackgroundPage >
                        <MDBRow style={ { display: 'flex', justifyContent: 'center'} }>
                            <MDBCol md="4">
                                <MDBCard style={{marginTop: '20%'}}>
                                    <MDBCardBody>
                                        <h1 className="my-1" style={ { textAlign: 'center'} }>
                                            Test TWEB
                                        </h1> 
                                        <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                            <h3 className="my-3">
                                                <MDBIcon icon="lock" /> Login:
                                            </h3> 
                                        </MDBCardHeader>

                                        <form onSubmit={onSubmit}>
                                            <div className="grey-text" style={{ textAlign: 'left' }}>
                                                <MDBInput 
                                                    label="type your email"
                                                    icon="envelope"
                                                    group
                                                    type="email"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)} />
                                                <MDBInput
                                                    label="type your password"
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    validate
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="text-center mt-4">
                                                <MDBBtn
                                                    color="light-blue"
                                                    className="mb-3"
                                                    type="submit">Login</MDBBtn>
                                            </div>
                                        </form>
                                        <MDBModalFooter>
                                            <div className="font-weight-light" style={{ textAlign: 'right' }}>
                                                <a href="/register">
                                                    Sign in
                                                </a>
                                                <br />
                                                <a href="/#!">Forgot password ?
                                                </a>
                                            </div>
                                        </MDBModalFooter>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </BackgroundPage>
                );
            }}
        </AuthContext>
    );
};