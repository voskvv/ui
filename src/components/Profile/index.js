import React, { Component } from 'react';
import Account from './Account';
import PanelSSH from './PanelSSH';
import Email from './Email';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <Account />
                <PanelSSH />
                <Email />
            </div>
        );
    }
}
