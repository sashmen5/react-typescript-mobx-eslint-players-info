import * as React from 'react';

import {ManagePlayers} from '.'

class Admin extends React.Component<any, any> {
    render() {
        return (
            <div className="col-sm-8">

                <ManagePlayers />

            </div>
        );
    }
}

export default Admin;