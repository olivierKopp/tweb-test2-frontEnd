import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, MDBDropdownItem, Fa } from "mdbreact";
import { Redirect } from 'react-router-dom';

import { getUser } from '../scripts/graphQL';

export class NavbarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            image: "",
            input: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadUserImage();
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.input !== "") {
            console.log(this.state.input);
            window.location.replace("/search/" + this.state.input);
        }        
    }

    handleInputChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    async loadUserImage() {
        let user;
        await getUser(localStorage.getItem('user_id')).then(res => {
            user = res;
        });
        this.setState({
            image: user.image
        });
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    render() {
        return (
                <Navbar color="secondary-color" dark expand="md">
                    <NavbarBrand>
                        <strong className="white-text">
                            Happy
                            <span role="img" aria-label="happyFace1">😙</span>
                            <span role="img" aria-label="happyFace2">😺</span>
                            <span role="img" aria-label="happyFace3">👻</span>
                        </strong>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                    <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left style={{ fontSize: '2rem' }}>
                            <NavItem active>
                                <NavLink to="/">
                                <span role="img" aria-label="home">🏠</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/newMessage">
                                    <span role="img" aria-label="newMessage">💬</span>
                                </NavLink>
                            </NavItem>
                        </NavbarNav>

                        <NavbarNav middle="true">
                            <NavItem>
                                <FormInline waves onSubmit={this.onSubmit}>
                                    <div className="md-form my-0">
                                        <input className="form-control mr-sm-2" type="text" value={this.state.input} onChange={this.handleInputChange} placeholder="🔎👪" aria-label="Search" />
                                    </div>
                                </FormInline>
                            </NavItem>
                        </NavbarNav>

                        <NavbarNav right>
                            <NavItem>
                                <NavLink className="waves-effect waves-light d-flex align-items-center" 
                                         to="#!" 
                                         style={{ fontSize: '1.75rem' }}>
                                         1<Fa icon="envelope" className="ml-1" />
                                </NavLink>
                            </NavItem> 
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle caret className="dopdown-toggle" nav>
                                        <img src={this.state.image} className="rounded-circle z-depth-0" style={{height: '35px', width: '35px', padding: 0}} alt="" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem href={`/u/${localStorage.getItem('user_id')}`}>My Profile</MDBDropdownItem>
                                        <MDBDropdownItem href="/settings">Settings</MDBDropdownItem>
                                        <MDBDropdownItem divider />
                                        <MDBDropdownItem onClick={this.props.logout}>Logout</MDBDropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
        );
    }
}