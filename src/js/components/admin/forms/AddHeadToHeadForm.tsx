import * as React from 'react';
import {inject, observer} from "mobx-react";
import ViewStore from "../../../../stores/ViewStore";

interface AddHeadToHeadFormProps {
    viewStore?: ViewStore;
}

interface AddPlayerFormState {
    headToHeadName: string;
    playerA: string;
    playerB: string;
}

@inject("viewStore")
@observer
class AddHeadToHeadForm extends React.Component<AddHeadToHeadFormProps, AddPlayerFormState> {
    constructor(props) {
        super(props);
        this.state = {
            headToHeadName: '',
            playerA: '',
            playerB: ''
        }
    }


    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {viewStore} = this.props;
        const {headToHeadName, playerA, playerB} = this.state;
        if (headToHeadName && headToHeadName.trim().length !== 0) {
            viewStore.addHeadToHeads(headToHeadName, playerA, playerB);
            this.setState({
                headToHeadName: '',
                playerA: '',
                playerB: '',
            })
        }
    };

    render() {
        const {players} = this.props.viewStore;
        const {playerA, playerB} = this.state;
        return (
            <div className="panel panel-success">
                <div className="panel-heading"><h3 className="panel-title">Add new Head To Head</h3></div>
                <div className="panel-body">
                    <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="headToHeadName">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="headToHeadName"
                                        name="headToHeadName"
                                        onChange={(e) => {this.handleInputChange(e)}}
                                        placeholder="VS Your Mate" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="playerA">Your Name</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => {this.handleInputChange(e)}}
                                        value={playerA}
                                        id="playerA"
                                        name="playerA">
                                        <option value=''>Select a player</option>
                                        {
                                            players.length > 0 && players.map(player => {
                                                const {key, name} = player;
                                                return <option key={key} value={key}>{name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="playerB">Your Friend</label>
                                    <select
                                        className="form-control"
                                        value={playerB}
                                        onChange={(e) => {this.handleInputChange(e)}}
                                        id="playerB"
                                        name="playerB">
                                        <option value=''>Select a player</option>
                                        {
                                            players.length > 0 && players.map(player => {
                                                const {key, name} = player;
                                                return <option key={key} value={key}>{name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddHeadToHeadForm;