import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getUserByEmail } from '../../scripts/graphQL';
import { ProfileCard } from '../card/ProfileCard';

import './style.css';

const fetchLength = 9;

export class UsersGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            currentUsers: [],
            usersToDisplay: [],
            index: fetchLength,
            hasLoad: false,
        };
        this.fetchMoreUsers = this.fetchMoreUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        if(this.state.hasLoad === false) {
            this.props.users.then(response => {
                if(response !== null && response !== undefined) {
                    this.setState({
                        allUsers: response,
                        currentUsers: response.slice(0, fetchLength),
                        hasLoad: true
                    });
                    this.renderUsers(this.state.currentUsers);
                }
                else {
                    this.setState({
                        usersToDisplay: (
                            <h4>No users found</h4>
                        )
                    });
                }
            }).catch();
        }
    }

    fetchMoreUsers() {
        var State = this;
        setTimeout(() => {
            if(State.state.hasLoad && State.state.currentUsers.length < State.state.allUsers.length) {
                this.setState({
                    currentUsers: State.state.allUsers.slice(0, State.state.index + fetchLength),
                    index: State.state.index + fetchLength,
                })
                this.renderUsers(State.state.currentUsers)
            }
        }, 1500);
    }

    renderUsers(arrayToRender) {
        let table = [];
        for(let i = 0; i < arrayToRender.length; i+=3) {
            if((i+2) < arrayToRender.length) {
                table.push(
                    <MDBRow>
                        <MDBCol size="4">
                            <ProfileCard
                                avatar={arrayToRender[i].image}
                                username={arrayToRender[i].username}
                                email={arrayToRender[i].email}
                                following={arrayToRender[i].following}
                                followers={arrayToRender[i].followers}
                                id={arrayToRender[i].id}
                                displayFollowButton={arrayToRender[i].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol>
                        <MDBCol size="4">
                            <ProfileCard
                                avatar={arrayToRender[i+1].image}
                                username={arrayToRender[i+1].username}
                                email={arrayToRender[i+1].email}
                                following={arrayToRender[i+1].following}
                                followers={arrayToRender[i+1].followers}
                                id={arrayToRender[i+1].id}
                                displayFollowButton={arrayToRender[i+1].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol>
                        <MDBCol size="4">
                            <ProfileCard
                                avatar={arrayToRender[i+2].image}
                                username={arrayToRender[i+2].username}
                                email={arrayToRender[i+2].email}
                                following={arrayToRender[i+2].following}
                                followers={arrayToRender[i+2].followers}
                                id={arrayToRender[i+2].id}
                                displayFollowButton={arrayToRender[i+2].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol>
                    </MDBRow>
                );
            }
            else if((i+1) < arrayToRender.length) {
                table.push(
                    <MDBRow>
                       <MDBCol size="4">
                            <ProfileCard
                                avatar={arrayToRender[i].image}
                                username={arrayToRender[i].username}
                                email={arrayToRender[i].email}
                                following={arrayToRender[i].followed}
                                followers={arrayToRender[i].followers}
                                id={arrayToRender[i].id}
                                displayFollowButton={arrayToRender[i].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol>
                        <MDBCol size="4">
                            <ProfileCard
                                avatar={arrayToRender[i+1].image}
                                username={arrayToRender[i+1].username}
                                email={arrayToRender[i+1].email}
                                following={arrayToRender[i+1].followed}
                                followers={arrayToRender[i+1].followers}
                                id={arrayToRender[i+1].id}
                                displayFollowButton={arrayToRender[i+1].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol> 
                    </MDBRow>
                );
            }
            else {
                table.push(
                    <MDBRow>
                      <MDBCol size="4">
                        <ProfileCard
                            avatar={arrayToRender[i].image}
                            username={arrayToRender[i].username}
                            email={arrayToRender[i].email}
                            following={arrayToRender[i].followed}
                            followers={arrayToRender[i].followers}
                            id={arrayToRender[i].id}
                            displayFollowButton={arrayToRender[i].id.localeCompare(localStorage.getItem('user_id'))} />
                        </MDBCol>  
                    </MDBRow>
                );
            }
        }
        
        this.setState({
            usersToDisplay: table
        });
    }

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.currentUsers.length}
                next={this.fetchMoreUsers}
                hasMore={!(this.state.currentUsers.length === this.state.allUsers.length)}
                loader={<h4>Loading...</h4>}
            >
            {this.state.usersToDisplay}
            </InfiniteScroll>
        );
    }
}