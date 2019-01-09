import React, { Component } from 'react';

import './style.css';
import { follow, unfollow, hasFollow } from '../../scripts/graphQL';

export class FollowButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: this.props.followers.length,
            followers : this.props.followers,
            userId : this.props.userId,
            status: false
        }
        this.toggleFollow = this.toggleFollow.bind(this);
        this.checkFollow = this.checkFollow.bind(this);
        
        this.checkFollow(this.state.userId, localStorage.getItem('user_id'));
    }

    async checkFollow (targetId, user_id) {
        await hasFollow(targetId, user_id)
        .then(res => {
            this.setState({
                status : res,
            });
        })
    }

    toggleFollow() {
         // Not followed yet
        if(!this.state.status) {
            follow(this.state.userId, localStorage.getItem('user_id'))
            .then(res => {
                this.setState((prevState, props) => ({
                        follow: prevState.follow + 1,
                        status: true
                })
                );
                this.props.incFollow()
            })
        }
        // Already followed
        else {
            unfollow(this.state.userId, localStorage.getItem('user_id'))
            .then(res => {
            this.setState((prevState, props) => {
                return {
                    follow: prevState.follow - 1,
                    status: false
                }
            });
            this.props.decFollow();
        });
        }
    }

    render() {
        const buttonLabel = this.state.status ? "button button-follow followed " : "button button-follow" ;
        const buttonText =  this.state.status ? <span>Followed</span> : <span>Follow</span>;
        return (
            <div>
                <button className={buttonLabel} onClick={this.toggleFollow}>
                    <i className="fa fa-arrow-circle-o-right"></i>
                    {buttonText}
                </button>
            </div>
        );
    }
}