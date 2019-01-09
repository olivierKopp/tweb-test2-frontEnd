import React, { Component } from 'react';
import { Card, CardBody, CardUp, Avatar, Col } from 'mdbreact';

const colors = ['aqua'];

export class MessageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardUpColor: ""
        };
    }
    
    componentWillMount() {
        this.setState = { 
            // set random card color
            cardUpColor: colors[Math.floor(Math.random() * colors.length)]
        }; 
    }
    
    render() {
        return (
            <Col style={{ maxWidth: "32rem" }}>
                <Card testimonial>        
                    <CardBody>
                        <h4 className="card-title">{this.props.username}</h4>
                        <hr />
                        <p>{this.props.messageContent}</p>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}