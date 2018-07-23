import * as React from 'react';
import PlayerIcon from './PlayerIcon';
import Games from './Games';
import {observer, inject} from 'mobx-react';
import {AddGameForm} from './admin/forms';
import * as classNames from 'classnames';
import ViewStore from "../../stores/ViewStore";
import HeadToHead from "../models/HeadToHead";

interface HeadToHeadDetailsProps {
    viewStore?: ViewStore,
    headToHead: HeadToHead,
    history: any,
    match?: any
}

interface HeadToHeadDetailsState {
    showAllGames: boolean
}

@inject('viewStore')
@observer
class HeadToHeadDetails extends React.Component<HeadToHeadDetailsProps, HeadToHeadDetailsState> {

    constructor(props){
        super(props)
        this.state = {
            showAllGames: false
        }
    }

    componentDidMount(){
        const {viewStore, history, match} = this.props;
        const {selectedHeadToHead, authed} = viewStore;
        const {location} = history;
        const isAll = location.pathname === '/all';
        if(selectedHeadToHead === null && !isAll){
            viewStore.fetchHeadToHead(match.params.id);
        }
        authed && viewStore.fetchHeadToHeads();
    }

    handleShowAll = () => {
        const {viewStore} = this.props;
        const {selectedHeadToHead} = viewStore;

        // fetch all games
        viewStore.fetchGames(selectedHeadToHead, true);

        this.setState({
            showAllGames: true
        })
    }

    render() {
        const {history, headToHead, viewStore} = this.props;
        const {selectedHeadToHead, getPlayerName, games, errorMessage, authed} = viewStore;
        const {location} = history;
        const isAll = location.pathname === '/all';
        const goToDetail = () => {
            // think about a way to go to the detail page
            // 1. we need to select head to head in viewStore
            // 2. we need to change the url
            viewStore.selectHeadToHead(headToHead);
            history.push(`/details/${headToHead.key}`);
        }
        const {playerA, playerB, playerAWinCount, playerBWinCount, drawsCount, title} = headToHead || !!selectedHeadToHead && selectedHeadToHead;
        const {showAllGames} = this.state;

        const blockClass = classNames({
            'hth-block__item': true,
            'is-winning home-team': playerAWinCount > playerBWinCount,
            'is-winning away-team': playerAWinCount < playerBWinCount
        })

        return (
            <div className="row">
                <div className="col-sm-8">
                    {
                        selectedHeadToHead && <div className={`hth-block ${!isAll ? 'with-details' : ''}`} onClick={() => {
                            isAll && goToDetail();
                        }}>
                            <div className={blockClass} >

                                {/* Head To Head title - start */}
                                <span className="hth-block__item__title center-teams">
                                    <span className="center-teams__home">
                                        <span><PlayerIcon /> {getPlayerName(playerA)}</span>
                                    </span>
                                    <span className="center-teams__center">vs</span>
                                    <span className="center-teams__away">
                                        <span>{getPlayerName(playerB)} <PlayerIcon /></span>
                                    </span>
                                </span>
                                {/* Head To Head title - end */}

                                {/* Head To Head body - start */}
                                <span className="hth-block__item__body">
                                    <span className="hth-block__item__label"><em>All times score</em></span>

                                    {/* Total score - start */}
                                    <span className="center-teams">
                                        <span className="center-teams__home">{playerAWinCount}</span>
                                        <span className="center-teams__center">- {drawsCount} -</span>
                                        <span className="center-teams__away">{playerBWinCount}</span>
                                    </span>
                                    {/* Total score - end */}

                                    <span className="hth-block__details">

                                        <span className="hth-block__item__label is-large">{title}</span>

                                        {
                                            games.length > 0 ?
                                                <Games /> :
                                                <span className="hth-block__item__label"><em>No games found.</em></span>
                                        }

                                    </span>

                                </span>
                                {/* Head To Head body - end */}

                                {
                                    !showAllGames && games.length > 0 && games.length < 11 && <button type="button" className="btn btn-default btn-lg btn-block btn-show-all" onClick={() => {
                                        this.handleShowAll();
                                    }}>Show All</button>
                                }
                            </div>
                        </div>
                    }
                    {
                        errorMessage !== '' && <div id="login-alert" className="alert alert-danger">{errorMessage}</div>
                    }
                </div>
                <div className="col-sm-4">
                    {
                        authed && !isAll && <AddGameForm />
                    }
                </div>
            </div>
        );
    }
}

export default HeadToHeadDetails;