import React, { Component } from 'react';

import { LikeButton } from '../LikeButton/LikeButton';

import './style.css';

const colors = ['aqua-gradient', 'blue-gradient', 'purple-gradient', 'peach-gradient', 'dusty-grass-gradient'];

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardUpColor: ""
        };
    }

    componentWillMount() {
        this.setState({ 
            // set random card color
            cardUpColor: colors[Math.floor(Math.random() * colors.length)]
        }); 
    }

    render() {
        return (
              <div className="card testimonial-card" style={{ maxWidth: "22rem", marginLeft: 'auto', marginRight: 'auto' }}>
                <div className={`card-up ${this.state.cardUpColor}`} />
                <div className="avatar mx-auto white square-image">
                  <img
                    src={this.props.avatar}
                    className="rounded-circle img-responsive"
                    alt=""
                  />
                </div>
                <div className="card-body">
                <a href={`/u/${this.props.userId}`}>
                  <h4 className="card-title">{this.props.username}</h4>
                </a>
                  <hr />
                  <p>{this.props.messageContent}</p>
                </div>
                <LikeButton 
                    messageId={this.props.messageId}
                    messageLikes={this.props.messageLikes}/>
              </div>
            /*</div>*/
          
          );
    }
}