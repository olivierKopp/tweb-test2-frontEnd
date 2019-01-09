import React, { Component } from 'react';

import { NavbarPage } from './Navbar';
import { BackgroundPage } from './BackgroundPage';
import { UsersGrid } from './UsersGrid/UsersGrid';

import { searchUser } from '../scripts/graphQL';

export class SearchPage extends Component {

    render() {
        return (
            <div>
                <NavbarPage />
                <BackgroundPage >
                    <UsersGrid users={searchUser(this.props.match.params['username']).then(res => res)} />
                </BackgroundPage >
            </div>
        );
    }
}