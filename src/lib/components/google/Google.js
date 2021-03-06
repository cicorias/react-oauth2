import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import keys from 'object-keys';
import './Google.scss';
import { googleLogin } from '../../actions/oauth';


let Google = createReactClass({
    getDefaultProps: function () {
        return {
            url: 'http://localhost:3000/',
            clientId: '',
            clientSecret: '',
            redirectUri: 'http://localhost:3000/',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
            scope: 'openid profile email',
            width: 580,
            height: 400
        };
    },

    handleClick: function () {
        googleLogin(this.props).then(res => {
            this.props.callback(null, res);
        }, error => {
            this.props.callback(error, null);
        });
    },

    render: function () {
        const opts = keys(this.props).reduce((acc, prop) => {
            if (['style', 'className'].some(wantedProp => wantedProp === prop)) {
                acc[prop] = this.props[prop];
            }
            return acc;
        }, {});
        return <button {...opts} onClick={this.handleClick} >{this.props.children} </button>
    }
})

Google.propTypes = {
    url: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    scope: PropTypes.string,
    callback: PropTypes.func.isRequired
};

export default Google;
