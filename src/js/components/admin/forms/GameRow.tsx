import * as React from 'react';
import {observer, inject} from 'mobx-react'
import Game from "../../../models/Game";
import ViewStore from "../../../../stores/ViewStore";

interface GameRowProps {
    index: number,
    game: Game,
    viewStore?: ViewStore
}

interface GameRowState {

}

@inject('viewStore')
@observer
class GameRow extends React.Component<GameRowProps, GameRowState> {

    handleInputChange = (e) => {
        const {name, value} = e.target;
        const {viewStore, game} = this.props;
        if(value && value.trim().length !== 0){
            viewStore.updateGame(game.key, name, value);
        }
    };

    handleRemoveGame = (key: string) => {
        const {viewStore} = this.props;
        viewStore.removeGame(key);
    };

    render() {
        const {index, game} = this.props;
        const {homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals} = game;
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td>
                    <input type="text" className="form-control" id={`homeTeamName`} name="homeTeamName" placeholder="Home team name" value={homeTeamName} onChange={(e) => this.handleInputChange(e) } />
                </td>
                <td>
                    <input type="text" className="form-control" id={`awayTeamName`} name="awayTeamName" placeholder="Away team name" value={awayTeamName} onChange={(e) => this.handleInputChange(e) } />
                </td>
                <td>
                    <input disabled type="text" className="form-control" id={`homeTeamGoals`} name="homeTeamGoals" placeholder="Home team score" value={homeTeamGoals} onChange={(e) => this.handleInputChange(e) } />
                </td>
                <td>
                    <input disabled type="text" className="form-control" id={`awayTeamGoals`} name="awayTeamGoals" placeholder="Away team score" value={awayTeamGoals} onChange={(e) => this.handleInputChange(e) } />
                </td>
                <td>
                    <button className={`btn btn-default`} onClick={() => this.handleRemoveGame(game.key) }>X</button>
                </td>
            </tr>
        );
    }
}

export default GameRow;