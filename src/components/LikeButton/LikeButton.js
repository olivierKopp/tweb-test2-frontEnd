import React, { Component } from 'react';
import { like, unlike, hasLike } from '../../scripts/graphQL';

import './style.css';

export class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.messageLikes.length,
            likers : this.props.messageLikes,
            messageId : this.props.messageId,
            status: false
        };
        this.toggleLike = this.toggleLike.bind(this);
        this.checkLike = this.checkLike.bind(this);
        
        this.checkLike(this.state.messageId, localStorage.getItem('user_id'));
    }

    async checkLike (messageId, user_id) {
        await hasLike(messageId, user_id)
        .then(res => {
            this.setState({
                status : res,
            });
        })
    }

    toggleLike() {
        // Not liked yet
        if(!this.state.status) {
            like(this.state.messageId, localStorage.getItem('user_id'))
            .then(res => {
                this.setState((prevState, props) => {
                    return {
                        likes: prevState.likes + 1,
                        status: true
                    }
                });
            })
        } 
        // Already liked
        else {
            unlike(this.state.messageId, localStorage.getItem('user_id'))
            .then(res => {
            this.setState((prevState, props) => {
                return {
                    likes: prevState.likes - 1,
                    status: false
                }
            });
        });
        }
    }

    render() {
        const buttonLabel = this.state.status ? "button button-like liked " : "button button-like";
        const buttonText =  this.state.status ? <span>Liked</span> : <span>Like</span>;
        return (
            <div>
                <button className={buttonLabel} onClick={this.toggleLike}>
                    <i className="fa fa-heart"></i>
                    {buttonText}
                </button>
                <span className="counter">{this.state.likes}</span>
            </div>
        );
    }
}