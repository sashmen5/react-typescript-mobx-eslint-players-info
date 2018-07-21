import * as React from 'react';
import PlayerIcon from './PlayerIcon';
import Games from './Games';
import {observer, inject} from 'mobx-react';
import ViewStore from "../../stores/ViewStore";
import HeadToHead from "../models/HeadToHead";

interface HeadToHeadDetailsProps {
    viewStore?: ViewStore,
    headToHead: HeadToHead,
    history: any
}

interface HeadToHeadDetailsState {

}

@inject('viewStore')
@observer
class HeadToHeadDetails extends React.Component<HeadToHeadDetailsProps, HeadToHeadDetailsState> {
    render() {
        const {history, headToHead, viewStore} = this.props;
        const {selectedHeadToHead, getPlayerName, games} = viewStore;
        const {location} = history;
        const isAll = location.pathname === '/all';
        const goToDetail = () => {
            // think about a way to go to the detail page
            // 1. we need to select head to head in viewStore
            // 2. we need to change the url
            viewStore.selectHeadToHead(headToHead);
            history.push(`/details/${headToHead.key}`);
        };
        const {playerA, playerB, playerAWinCount, playerBWinCount, drawsCount, title} = headToHead || selectedHeadToHead;
        return (
            <div className={`hth-block ${!isAll ? 'with-details' : ''}`} onClick={() => {
                isAll && goToDetail();
            }}>
                <div className={`hth-block__item is-winning away-team`} >

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

                    <button type="button" className="btn btn-default btn-lg btn-block btn-show-all">Show All</button>

                </div>
            </div>
        );
    }
}

export default HeadToHeadDetails;