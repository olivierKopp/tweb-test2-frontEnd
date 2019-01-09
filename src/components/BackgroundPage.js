import React from 'react';
import { Container } from 'mdbreact';

export class BackgroundPage extends React.Component {
    render() {
        const backgroundStyle = {
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: '70%',
            backgroundRepeat: 'repeat',
            backgroundAttachement: 'fixed'           
        };

        const { children } = this.props;
        return (
            <Container fluid style={backgroundStyle}>
                {children}
            </Container>
        );
    }
}