import * as React from 'react';
import {AddGameForm, GameRow} from './forms'
import ViewStore from "../../../stores/ViewStore";
import {inject, observer} from "mobx-react";


interface ManageGamesProps {
    viewStore?: ViewStore
}
const ManageGames = (props: ManageGamesProps) => {
    const {viewStore} = props;
    const {games} = viewStore;
    return (
        <div className="row">
            <h2>Manage Games</h2>
            <AddGameForm />
            {
                games.length > 0 && <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Games</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Home Team</th>
                                    <th>Away Team</th>
                                    <th></th>
                                    <th></th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <GameRow/>
                                <tr>
                                    <td colSpan={6}><p>Create your first game above.</p></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default inject('viewStore')(observer(ManageGames));