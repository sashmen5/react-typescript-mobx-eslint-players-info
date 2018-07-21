import * as React from 'react';
import {inject, observer} from 'mobx-react';
import ViewStore from "../../../../stores/ViewStore";

interface AddGameFormProps {
    viewStore?: ViewStore // make viewStore optional
}

interface AddGameFormState {
    headToHeadKey: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamGoals: number,
    awayTeamGoals: number
}

@inject("viewStore")
@observer
class AddGameForm extends React.Component<AddGameFormProps, AddGameFormState> {

    constructor(props){
        super(props);
        this.state = {
            headToHeadKey: '',
            homeTeamName: '',
            awayTeamName: '',
            homeTeamGoals: 0,
            awayTeamGoals: 0
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
        const {headToHeadKey, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals} = this.state;

        console.log(headToHeadKey, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals);

        // clear form
        this.setState({
            headToHeadKey: '',
            homeTeamName: '',
            awayTeamName: '',
            homeTeamGoals: 0,
            awayTeamGoals: 0
        })
    };

    render() {
        const {headToHeadKey, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals} = this.state;
        return (
            <div className={`form-add-game`}>
                <div className="panel panel-success">
                    <div className="panel-heading"><h3 className="panel-title">Add new Game</h3></div>
                    <div className="panel-body">
                        <form className="form" onSubmit={(e) => this.handleSubmit(e) }>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="headToHead">Head To Head</label>
                                        <select
                                            className="form-control"
                                            id="headToHeadKey"
                                            name="headToHeadKey"
                                            onChange={(e) => this.handleInputChange(e) }>
                                            <option value='1'>Head To Head 1</option>
                                            <option value='2'>Head To Head 2</option>
                                            <option value='3'>Head To Head 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="homeTeamName">{`Home Team`}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="homeTeamName"
                                            name="homeTeamName"
                                            placeholder="Arsenal"
                                            value={homeTeamName}
                                            onChange={(e) => this.handleInputChange(e) }/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="awayTeamName">{`Away Team`}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="awayTeamName"
                                            name="awayTeamName"
                                            placeholder="Real Madrid"
                                            value={awayTeamName}
                                            onChange={(e) => this.handleInputChange(e) } />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12">
                                    <h4>Final Score</h4>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="homeTeamGoals">{`Home Team`}</label>
                                                <input type="number"
                                                       className="form-control"
                                                       id="homeTeamGoals"
                                                       name="homeTeamGoals"
                                                       placeholder="0"
                                                       value={homeTeamGoals}
                                                       onChange={(e) => this.handleInputChange(e) } />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="awayTeamGoals">{`Away Team`}</label>
                                                <input type="number"
                                                       className="form-control"
                                                       id="awayTeamGoals"
                                                       name="awayTeamGoals"
                                                       placeholder="0"
                                                       value={awayTeamGoals}
                                                       onChange={(e) => this.handleInputChange(e) } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddGameForm;