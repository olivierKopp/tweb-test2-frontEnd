import React, { Component } from "react";
import { MDBRow, MDBCol } from 'mdbreact';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessages, getUser } from '../scripts/graphQL';

import { Card } from './card/Card'

const fetchLength = 9;

export class MessagesGrid extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            allMessages:[],
            currentMessages: [],
            MessageToDisplay: [],
            index: fetchLength,
            hasLoad : false,
        };
        this.fetchMoreMessages = this.fetchMoreMessages.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
    }

    componentDidMount() {
        if(this.state.hasLoad === false){
        this.props.messages.then(response => {
            if(response !== null && response !== undefined) {
                this.setState({ 
                    allMessages: response,
                    currentMessages: response.slice(0, fetchLength),
                    hasLoad: true
                });
                this.renderMessages(this.state.currentMessages);
            }
            else {
                this.setState({
                    MessageToDisplay: (
                        <h4>No Messages yet :( But you can write your first message !</h4>
                    )
                });
            }
        }
        ).catch();
        }
    }

    async fetchMoreMessages() {
        console.log("Fetching more messages");
        var State = this;
        setTimeout(() => {
        if(State.state.hasLoad && State.state.currentMessages.length < State.state.allMessages.length) {
            this.setState({
                currentMessages: State.state.allMessages.slice(0, State.state.index + fetchLength),
                index: State.state.index + fetchLength,
            })
            this.renderMessages(State.state.currentMessages)
        }
    }, 1500);
  };
  
  async renderMessages(arrayToRender) {
    let table = [];
    for(let i = 0; i < arrayToRender.length; i+=3) {
        if(arrayToRender[i].user === undefined){
        await getUser(arrayToRender[i].authorId)
        .then(res => arrayToRender[i].user = res);
        }

        if((i+2) < arrayToRender.length) {
            if(arrayToRender[i+1].user === undefined) {
                await getUser(arrayToRender[i+1].authorId)
                .then(res => arrayToRender[i+1].user = res);
            }
            if(arrayToRender[i+2].user === undefined) {
                await getUser(arrayToRender[i+2].authorId)
                .then(res => arrayToRender[i+2].user = res);
            }

                table.push(
                    <MDBRow>
                        <MDBCol size="4">
                            <Card
                                avatar={arrayToRender[i].user.image}
                                username={arrayToRender[i].user.username}
                                messageContent={arrayToRender[i].content}
                                userId={arrayToRender[i].user.id} 
                                messageId={arrayToRender[i].id}
                                messageLikes={arrayToRender[i].like} />
                        </MDBCol>
                        <MDBCol size="4">
                            <Card
                                avatar={arrayToRender[i+1].user.image}
                                username={arrayToRender[i+1].user.username}
                                messageContent={arrayToRender[i+1].content} 
                                userId={arrayToRender[i+1].user.id} 
                                messageId={arrayToRender[i+1].id}
                                messageLikes={arrayToRender[i+1].like} />
                        </MDBCol>
                        <MDBCol size="4">
                            <Card
                                avatar={arrayToRender[i+2].user.image}
                                username={arrayToRender[i+2].user.username}
                                messageContent={arrayToRender[i+2].content} 
                                userId={arrayToRender[i+2].user.id} 
                                messageId={arrayToRender[i+2].id}
                                messageLikes={arrayToRender[i+2].like} />
                        </MDBCol>
                    </MDBRow>
                );
            }
            else if((i+1) < arrayToRender.length) {
                if(arrayToRender[i+1].user === undefined) {
                    await getUser(arrayToRender[i+1].authorId)
                    .then(res => arrayToRender[i+1].user = res);
                }
                
                table.push(
                    <MDBRow>
                        <MDBCol size="4">
                            <Card
                               avatar={arrayToRender[i].user.image}
                               username={arrayToRender[i].user.username}
                               messageContent={arrayToRender[i].content} 
                               userId={arrayToRender[i].user.id} 
                               messageId={arrayToRender[i].id}
                               messageLikes={arrayToRender[i].like} />
                        </MDBCol>
                        <MDBCol size="4">
                            <Card
                                avatar={arrayToRender[i+1].user.image}
                                username={arrayToRender[i+1].user.username}
                                messageContent={arrayToRender[i+1].content} 
                                userId={arrayToRender[i+1].user.id} 
                                messageId={arrayToRender[i+1].id}
                                messageLikes={arrayToRender[i+1].like} />
                        </MDBCol>
                    </MDBRow>
                );
                this.setState({
                    MessageToDisplay : table
                })
            }
            else{
                table.push(
                    <MDBRow>
                        <MDBCol size="4">
                            <Card
                                avatar={arrayToRender[i].user.image}
                                username={arrayToRender[i].user.username}
                                messageContent={arrayToRender[i].content} 
                                userId={arrayToRender[i].user.id}
                                messageId={arrayToRender[i].id}
                                messageLikes={arrayToRender[i].like} />
                        </MDBCol>
                    </MDBRow>
                );
                this.setState({
                    MessageToDisplay : table
                })
            }
    }
    
    this.setState({
        MessageToDisplay : table
    })
}

  render() {
    console.log("current messages = " + this.state.currentMessages.length);
    return (
        <InfiniteScroll
          dataLength={this.state.currentMessages.length}
          next={this.fetchMoreMessages}
          hasMore={this.state.currentMessages.length === this.state.allMessages.length ? false : true}
          loader={<h4>Loading...</h4>}
          style={{overflowX: 'hidden'}}
        >
        {this.state.MessageToDisplay}
        </InfiniteScroll>
    );
  }
}
