import {React} from 'react';
import { Link } from 'react-router-dom';
import './TeamTile.scss'

export const TeamTile = ({teamName, totalWins, totalMatches}) => {
    let percentage = ((totalWins/totalMatches) * 100).toFixed(2);
    return (
        <div className="TeamTile">
            <h1>
                <Link to={`/teams/${teamName}`}>
                    {teamName}
                </Link>
            </h1>
            <p>
                Win Percentage: {percentage}%
            </p>
    </div>
    )
}