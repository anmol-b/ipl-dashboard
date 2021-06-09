import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';
import {Link} from 'react-router-dom'

import './TeamPage.scss'

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const {teamName} = useParams();
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response  = await fetch(`/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
    );

    if (!team || !team.teamName) {
        return <h1>Team Not Found</h1>
    }
    return (
        <div className="TeamPage">
        <div className="team-name">
            <h1 className="team-name-disp">{team.teamName}</h1>
        </div>
        <div className="win-loss">
            Wins / Losses
            <PieChart
            data={[
                { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#B6494E' },
                { title: 'Wins', value: team.totalWins, color: '#49b67a' },
            ]}
            />
        </div>
        <div className="match-detail">
        <h3>Latest Matches</h3>
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
        </div>
        {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>)}
        <div className="more-link">
            <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_END_YEAR}`}> More > </Link>
        </div>
        
        </div>
    );
}

