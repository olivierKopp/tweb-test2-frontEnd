import React from 'react';

import { AuthContext } from './AuthProvider';
import { NavbarPage } from './Navbar';
import { BackgroundPage } from './BackgroundPage';
import { MessagesGrid } from './MessagesGrid';
import { getMessages } from '../scripts/graphQL';

import Background from '../images/login_background_2.jpg';

export const HomePage = () => {    
    return (
        <AuthContext>
            {({ signOut }) => {
                return (
                    <div>
                        <NavbarPage logout={signOut}/>
                        <BackgroundPage src={Background}>
                            <MessagesGrid messages={getMessages(localStorage.getItem('user_id'), 0).then(res => res.getMessagesFromDB)}/>
                        </BackgroundPage>
                    </div>
                );
            }}
        </AuthContext>
    );
};