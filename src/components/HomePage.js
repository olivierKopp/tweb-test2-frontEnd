import React from 'react';

import { AuthContext } from './AuthProvider';
import { NavbarPage } from './Navbar';
import { BackgroundPage } from './BackgroundPage';

export const HomePage = () => {    
    return (
        <AuthContext>
            {({ signOut }) => {
                return (
                    <div>
                        <NavbarPage logout={signOut}/>
                        <BackgroundPage>
                            
                        </BackgroundPage>
                    </div>
                );
            }}
        </AuthContext>
    );
};