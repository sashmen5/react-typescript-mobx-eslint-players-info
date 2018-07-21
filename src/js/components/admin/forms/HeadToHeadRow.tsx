import * as React from 'react';
import ViewStore from "../../../../stores/ViewStore";
import {inject, observer} from "mobx-react";
import HeadToHead from "../../../models/HeadToHead";

interface HeadToHeadRowProps {
    index: number;
    headToHead: HeadToHead;
    viewStore?: ViewStore;
}

interface HeadToHeadRowState {

}

@inject('viewStore')
@observer
class HeadToHeadRow extends React.Component<HeadToHeadRowProps, HeadToHeadRowState> {
    handleInputChange = (e) => {
        const {value, name} = e.target;
        const {headToHead, viewStore} = this.props;
        if (value && value.trim().length !== 0) {
            viewStore.updateHeadToHeads(headToHead.key, name,value);
        }
    };

    handleRemovePlayer = (key: string) => {
        const {viewStore} = this.props;
        viewStore.removeHeadToHeads(key);
    };

    render() {
        const {index, headToHead, viewStore} = this.props;
        const {players} = viewStore;
        const {title, playerA, playerB, key} = headToHead;
        return (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>
                    <input
                        type="text"
                        className="form-control" id={`title`}
                        name="title"
                        value={title}
                        onChange={(e) => this.handleInputChange(e)}
                        placeholder="Head To Head Title" />
                </td>
                <td>
                    <div className="form-group">
                        <select
                            className="form-control"
                            id="playerA"
                            value={playerA}
                            onChange={(e) => this.handleInputChange(e)}
                            name="playerA" >
                            {
                                players.length > 0 && players.map(player => {
                                    const {key, name} = player;
                                    return <option key={key} value={key}>{name}</option>
                                })
                            }
                        </select>
                    </div>
                </td>
                <td>
                    <div className="form-group">
                        <select
                            className="form-control"
                            id="playerB"
                            value={playerB}
                            onChange={(e) => this.handleInputChange(e)}
                            name="playerB" >
                            {
                                players.length > 0 && players.map(player => {
                                    const {key, name} = player;
                                    return <option key={key} value={key}>{name}</option>
                                })
                            }
                        </select>
                    </div>
                </td>
                <td>
                    <button className="btn btn-default" onClick={() => this.handleRemovePlayer(key)}>X</button>
                </td>
            </tr>
        );
    }
}

export default HeadToHeadRow;