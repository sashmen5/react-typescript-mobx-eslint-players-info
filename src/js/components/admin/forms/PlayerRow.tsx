import * as React from 'react';
import Player from "../../../models/Player";
import ViewStore from "../../../../stores/ViewStore";
import {inject, observer} from "mobx-react";

interface PlayerRowProps {
    index: number;
    player: Player;
    viewStore?: ViewStore;
}

@inject('viewStore')
@observer
class PlayerRow extends React.Component<PlayerRowProps, any> {

    handleInputChange = (e) => {
        const {value} = e.target;
        const {player, viewStore} = this.props;
        if (value && value.trim().length !== 0) {
            viewStore.updatePlayer(player.key, value);
        }
    };

    handleRemovePlayer = (key: string) => {
        const {viewStore} = this.props;
        viewStore.removePlayer(key);
    };

    render() {
        const {index, player} = this.props;

        return (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>
                    <input type="text" onChange={(e) => {this.handleInputChange(e)}} className="form-control" id="playerName" name="name" value={player.name}
                           placeholder="Player Name"/>
                </td>
                <td>
                    <button className={`btn btn-default`} onClick={() => this.handleRemovePlayer(player.key)}>X</button>
                </td>
            </tr>
        );
    }
}

export default PlayerRow;