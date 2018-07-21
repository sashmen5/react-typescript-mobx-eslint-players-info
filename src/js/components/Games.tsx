import * as React from 'react';
import {observer, inject} from 'mobx-react';
import * as classNames from 'classnames';
import ViewStore from "../../stores/ViewStore";

interface GamesProps {
    viewStore?: ViewStore
}
const Games = (props:GamesProps) => {
    const {viewStore} = props;
    const {games} = viewStore;
    return (
        <div>
            {
                games.length > 0 && games.reverse().map(game => {
                    const {key, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals} = game;

                    const homeTeamClass = classNames({
                        'center-teams__home': true,
                        'is-winner': homeTeamGoals > awayTeamGoals
                    })

                    const awayTeamClass = classNames({
                        'center-teams__away': true,
                        'is-winner': homeTeamGoals < awayTeamGoals
                    })

                    const centerClass = classNames({
                        'center-teams__center': true,
                        'is-winner-home': homeTeamGoals > awayTeamGoals,
                        'is-winner-away': homeTeamGoals < awayTeamGoals,
                        'is-draw': homeTeamGoals === awayTeamGoals
                    })

                    return <span key={key} className="center-teams is-game">

                        {/* available classes is-winner */}
                        <span className={homeTeamClass}>{homeTeamName}</span>

                        {/* available classes is-winner-home, is-draw, is-winner-away */}
                        <span className={centerClass}>{homeTeamGoals}:{awayTeamGoals}</span>

                        {/* available classes is-winner */}
                        <span className={awayTeamClass}>{awayTeamName}</span>

                    </span>
                })
            }
        </div>
    );
};

export default inject('viewStore')(observer(Games));