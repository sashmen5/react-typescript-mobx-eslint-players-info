import * as React from 'react';

import {ManageGames, ManageHeadToHeads, ManagePlayers} from '.'
import ViewStore from "../../../stores/ViewStore";
import {inject, observer} from "mobx-react";

interface AdminProps {
    viewStore?: ViewStore
}

@inject('viewStore')
@observer
class Admin extends React.Component<AdminProps, any> {
    componentDidMount() {
        this.props.viewStore.fetchData();
    }
    render() {
        const {viewStore} = this.props;
        const {players, headToHeads} = viewStore;
        return (
            <div className="col-sm-8">

                <ManagePlayers/>
                {
                    players.length > 1 &&  <ManageHeadToHeads/>
                }
                {
                    headToHeads.length > 1 &&  <ManageGames/>
                }

            </div>
        );
    }
}

export default Admin;