import * as React from 'react';
import {AddGameForm, GameRow} from './forms'
import {observer, inject} from 'mobx-react'
import ViewStore from "../../../stores/ViewStore";

interface ManageGamesProps {
    viewStore?: ViewStore
}

const ManageGames = (props: ManageGamesProps) => {
    const {games} = props.viewStore;
    return (
        <div className="row">
            <h2>Manage Games</h2>
            <AddGameForm />
            {
                // display this panel only if we have more than one game
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
                                {
                                    games.length > 0 ? games.map((game, index) => {
                                        const {key} = game;
                                        return <GameRow key={key} index={index} game={game} />
                                    }) : <tr><td colSpan={6}><p>Create your first game above.</p></td></tr>
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

export default inject('viewStore')(observer(ManageGames));