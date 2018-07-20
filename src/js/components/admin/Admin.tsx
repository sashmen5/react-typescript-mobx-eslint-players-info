import * as React from 'react';

import {ManageGames, ManageHeadToHeads, ManagePlayers} from '.'

class Admin extends React.Component<any, any> {
    render() {
        return (
            <div className="col-sm-8">
                
                <ManagePlayers />
                <ManageHeadToHeads />
                <ManageGames />
                
            </div>
        );
    }
}

export default Admin;