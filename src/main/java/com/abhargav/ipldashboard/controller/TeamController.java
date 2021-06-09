package com.abhargav.ipldashboard.controller;

import java.time.LocalDate;
import java.util.List;

import com.abhargav.ipldashboard.model.Match;
import com.abhargav.ipldashboard.model.Team;
import com.abhargav.ipldashboard.repository.MatchRepository;
import com.abhargav.ipldashboard.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TeamController {
    private TeamRepository teamRepo;
    private MatchRepository matchRepo;
    
    public TeamController(TeamRepository teamRepo, MatchRepository matchRepo) {
        this.teamRepo = teamRepo;
        this.matchRepo = matchRepo;
    }

    @GetMapping("/team")
    public Iterable<Team> getAllTeam(){
        return this.teamRepo.findAll();
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team = this.teamRepo.findByTeamName(teamName);
        team.setMatches(matchRepo.findLatestMatchesByTeam(teamName, 4));
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);

        return this.matchRepo.getMatchesByTeambetweenDates(
            teamName,
            startDate,
            endDate
        );
    }

}
