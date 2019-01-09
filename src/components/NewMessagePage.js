import React, { Component } from 'react';
import { BackgroundPage } from './BackgroundPage';
import { NavbarPage } from './Navbar';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn, MDBInput } from 'mdbreact';

import { createMessage } from '../scripts/graphQL'

import Background from '../images/login_background_2.jpg';
import allEmoji from '../emojis.json';

const SYMBOLS = '"%&,.<>@[]`{}~';
const maxLength = '155';

//todo: 1 5 5 emojis don't work on Firefox
export class NewMessagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageContent: ""
        }
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.messageContent !== "") {
            createMessage(localStorage.getItem('user_id'), this.translate(this.state.messageContent))
                .then(data => {
                    if(data !== null) {
                        setTimeout(() => {
                            window.location.replace("/");
                        }, 1000); 
                    }
                });
        }
    };

    handleMessageChange(e) {
        this.setState({ messageContent: e.target.value });
    }

    isMaybeAlreadyAnEmoji(word) {
        let ranges = [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
        ];
        return word.match(ranges.join('|')) !== null;
    }  

    // Returns the list of all emoji translations of an english word
    getAllEmojiForWord(originalWord) {
        let word = originalWord.trim().toLowerCase(); // remove white spaces and set to lower case

        // some exceptions
        if (!word || word === '' || word === 'a' || word === 'it' || word === 'is')
            return '';

        // Maybe this is a plural word but the word is the singular?
        // Don't do it for two letter words since "as" would become "a" etc.
        let maybeSingular = '';
        if (word.length > 2 && word[word.length - 1] === 's') {
            maybeSingular = word.slice(0, word.length - 1);
        }

        // Maybe this is a singular word but the word is the plural?
        // Don't do this for single letter since that will pluralize crazy things.
        let maybePlural = (word.length === 1) ? '' : word + 's';

        let maybeVerbedSimple = '';
        let maybeVerbedVowel = '';
        let maybeVerbedDoubled  = '';

        if (word.indexOf('ing') !== -1) {
            let verb = word.substr(0, word.length - 3);
            // eating => eat
            maybeVerbedSimple = verb;
            // dancing => dance
            maybeVerbedVowel = verb + 'e';
            // running => run
            maybeVerbedDoubled = verb.substr(0, verb.length - 1);
          }

        // Go through all the things and find the first one that matches.
        let possibleMatches = [];

        // If this is already an emoji, don't try to translate it.
        if (this.isMaybeAlreadyAnEmoji(word)) {
            possibleMatches.push(word);
            return possibleMatches;
        }

        if(word === 'fuck' || word === 'bitch' || word === 'cunt') {
            possibleMatches.push('*beep*');
        }

        for (let emoji in allEmoji) {
            //////////////////TODO/////////////////////77
            ///////////UNDERSTAND AND CLEAN DA SHIT//////
            //////////////////////////////////////////////
            /////////////////////////////////////////////
            let words = allEmoji[emoji].keywords;
            // TODO: omg refactor this one day, please. Why is this even. Why.
            if (word === allEmoji[emoji].char ||
                emoji === word || (emoji === word + '_face') ||
                emoji === maybeSingular || emoji === maybePlural ||
                emoji === maybeVerbedSimple || emoji === maybeVerbedVowel || emoji === maybeVerbedDoubled ||
                (words && words.indexOf(word) >= 0) ||
                (words && words.indexOf(maybeSingular) >= 0) ||
                (words && words.indexOf(maybePlural) >= 0) ||
                (words && words.indexOf(maybeVerbedSimple) >= 0) ||
                (words && words.indexOf(maybeVerbedVowel) >= 0) ||
                (words && words.indexOf(maybeVerbedDoubled) >= 0)) {
                    // If it's a two letter word that got translated to a flag, it's 99% of the
                    // time incorrect, so stop doing that.
                    if (!(word.length <= 3 && allEmoji[emoji].category === 'flags')) {
                        possibleMatches.push(allEmoji[emoji].char);
                    }   
            }
        }
        return (possibleMatches.length === 0) ? '' : possibleMatches;
    }

    getEmojiForWord(word) {
        let translations = this.getAllEmojiForWord(word);
        // random emoji if multiple translations
        //return translations[Math.floor(Math.random() * translations.length)];
        return translations[0];
    }

    translate(sentence) {
        let translation = '';
        let words = sentence.split(' ');

        for(let i = 0; i < words.length; i++) {
            let firstSymbol = '';
            let lastSymbol = '';
            var word = words[i];

            // Remove symbols at the beginning of the word
            while(SYMBOLS.indexOf(word[0]) !== -1) {
                firstSymbol += word[0];
                word = word.slice(1, word.length);
            }

            // Remove symbols at the end of the word
            while (SYMBOLS.indexOf(word[word.length - 1]) !== -1) {
                lastSymbol += word[word.length - 1];
                word = word.slice(0, word.length - 1);
            }

            let translated = this.getEmojiForWord(word);

            if(translated) {
                translation += firstSymbol + translated + lastSymbol + ' ';
            }
            else {
                translation += firstSymbol + word + lastSymbol +  ' ';
            }
        }
        
        return translation;
    }

    render() {
        return (
            <div>
                <NavbarPage></NavbarPage>
                <BackgroundPage src={Background}>
                    <MDBRow style={ { display: 'flex', justifyContent: 'center'} }>
                        <MDBCol md="4">
                            <MDBCard style={{marginTop: '7%'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="fa-pencil" /> New message:
                                        </h3>    
                                    </MDBCardHeader>

                                    <form onSubmit={this.onSubmit}>
                                        <MDBInput type="textarea" label="(max. 155 characters)" rows="3" maxLength={maxLength} value={this.state.messageContent} onChange={this.handleMessageChange}/>
                                        <h4>Message preview:</h4>
                                        <p>{this.translate(this.state.messageContent)}</p>
                                        <div className="text-center mt-4">
                                            <MDBBtn
                                                color="light-blue"
                                                className="mb-3"
                                                type="submit">Send</MDBBtn>
                                        </div>
                                    </form>                         
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </BackgroundPage>
            </div>
        );
    }
};