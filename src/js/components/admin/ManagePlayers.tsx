import * as React from 'react';
import {AddPlayerForm, PlayerRow} from "./forms";
import ViewStore from "../../../stores/ViewStore";
import {inject, observer} from "mobx-react";

interface ManagePlayersProps {
    viewStore?: ViewStore
}

const ManagePlayers = (props: ManagePlayersProps) => {
    const {viewStore} = props;
    const {players} = viewStore;
    return (
        <div className="row">
            <h2>Manage Players</h2>
            <AddPlayerForm/>
            {
                players.length > 0 && <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Players</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                players.length > 0 ? players.map((player, index) => {
                                    const {key} = player;
                                    return <PlayerRow key={key} player={player} index={index}/>
                                }) : <tr><td colSpan={3}><p>Create your first player above.</p></td></tr>

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            }

        </div>
    );
};

export default inject('viewStore')(observer(ManagePlayers));