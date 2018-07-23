import * as React from 'react';
import {observer, inject} from 'mobx-react'
import ViewStore from "../../../../stores/ViewStore";
import Player from "../../../models/Player";

interface PlayerRowProps {
    index: number,
    player: Player,
    viewStore?: ViewStore
}

interface PlayerRowState {

}

@inject('viewStore')
@observer
class PlayerRow extends React.Component<PlayerRowProps, PlayerRowState> {


    handleInputChange = (e) => {
        const {value} = e.target;
        const {viewStore, player} = this.props;
        if(value && value.trim().length !== 0){
            viewStore.updatePlayer(player.key, value);
        }
    }

    handleRemovePlayer = (key: string) => {
        const {viewStore} = this.props;
        viewStore.removePlayer(key);
    }

    render() {
        const {index, player, viewStore} = this.props;
        const {headToHeadPlayers} = viewStore;
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td>
                    <input type="text" className="form-control" id="playerName" name="name" placeholder="Player Name" value={player.name} onChange={(e) => this.handleInputChange(e) } />
                </td>
                <td>
                    {
                        !headToHeadPlayers.includes(player.key) && <button className={`btn btn-default`} onClick={() => this.handleRemovePlayer(player.key) }>X</button>
                    }
                </td>
            </tr>
        );
    }
}

export default PlayerRow;