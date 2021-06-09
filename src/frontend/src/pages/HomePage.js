import {React, useEffect, useState} from 'react';

import './HomePage.scss'
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    const [teams, setTeam] = useState([]);
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response  = await fetch(`/team`);
                const data = await response.json();
                setTeam(data);
            };
            fetchAllTeams();
        }, []
    );

    return (
        <div className="HomePage">
        <div className="header-section">
            <h1 className="app-name">Indian Premier League Dashboard</h1>
        </div>
        <div className="team-grid">
            {teams.map(team => <TeamTile key={team.id} teamName={team.teamName} totalWins={team.totalWins} totalMatches={team.totalMatches}/>)}
        </div>
        </div>
    );
}

