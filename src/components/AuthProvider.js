import React, { Component } from 'react';
import axios from 'axios';

const {Provider: AuthContextProvider, Consumer: AuthContext} = React.createContext();



class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            signIn: this.signIn,
            signOut: this.signOut,
            getMessages: this.getMessages
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token) {
            axios.get('/api/me', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            .then(response => {
                const { user } = response.data;
                this.setState({ user });
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
            })
        }
    }

    signIn = ({ email, password }) => {
        axios.post('/auth/login', { email, password })
            .then(response => {
                const { user, token } = response.data;
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('user_id', user._id);
                this.setState({ user });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: 'Invalid email or password' });
            })
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.reload();
    }

    render() {
        const { children } = this.props;

        // value = all values given to children
        return (
            <AuthContextProvider value={this.state}> 
                {children}
            </AuthContextProvider>
        );
    }
}

export { AuthContext };
export default AuthProvider;
