import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { NavbarPage } from './Navbar';
import { BackgroundPage } from './BackgroundPage';
import { UsersGrid } from './UsersGrid/UsersGrid';

import Background from '../images/login_background_2.jpg';
import { searchUser } from '../scripts/graphQL';

export class SearchPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavbarPage />
                <BackgroundPage src={Background}>
                    <UsersGrid users={searchUser(this.props.match.params['username']).then(res => res)} />
                </BackgroundPage >
            </div>
        );
    }
}