
from fastapi import FastAPI, HTTPException, Request, Response, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
from player import Player
from team import Team, Team_meta
from playerStatistics import Statistics
import urlConstants

dreamTeamMeta = Team_meta(city="", isNBAFranchise=False,
                          fullName="Dream-Team", teamId="0")
dreamTeam = Team(dreamTeamMeta, [])
app = FastAPI()
app.mount("/client", StaticFiles(directory="client"), name="client")


@app.get("/")
async def root():
    return FileResponse('.\client\index.html')


@app.get("/team/")
async def get_team(teamName: str = "", year: str = "2020", isActive: bool = False):
    try:
        players_response = requests.get(
            urlConstants.BASE_URL + urlConstants.LEAGUE_YEAR_PLAYERS["route"] % (year))
        players_response.raise_for_status()
        teams_response = requests.get(
            urlConstants.BASE_URL + urlConstants.LEAGUE_YEAR_TEAMS["route"] % year)
        teams_response.raise_for_status()
        players_json = players_response.json()["league"]["standard"]
        teams_json = teams_response.json()["league"]["standard"]

        team_to_return = make_team(players_json, teams_json, teamName)
        if (isActive):
            team_to_return = filter_active_players(team_to_return)
    except requests.exceptions.HTTPError as err:
        raise HTTPException(
            status_code=500, detail=f"Team not found... \nTeam: {teamName}, Year: {year}.")

    return team_to_return


@app.get("/statistics/")
async def get_player_statistics(firstName: str = "", lastName: str = ""):
    try:
        statistics_response: requests.Response = requests.get(
            urlConstants.PLAYER_STATS["route"] % (lastName, firstName))
        statistics_json = statistics_response.json()
        statistics = Statistics(**statistics_json)
        print(statistics)
    except requests.exceptions.HTTPError as err:
        raise HTTPException(
            status_code=500, detail=f"Player Statistic not found... \nFirst name: {firstName}, Last name: {lastName}.")
    return statistics


@app.get("/dreamTeam")
def getDreamTeam():
    return dreamTeam


@app.post("/dreamTeam")
async def add_player_to_dream_team(playerRequest: Request, response: Response) -> None:
    player = await playerRequest.json()
    if (player in dreamTeam.players):
        raise HTTPException(
            status_code=500, detail="Player already exisit in dream-team!")
    player['isInDreamTeam'] = True
    dreamTeam.add_player(player)
    response.status_code = status.HTTP_201_CREATED
    return player


@app.delete("/dreamTeam")
def delete_player_from_dream_team(playerId: str, response: Response) -> None:
    playerToDelete = None
    for player in dreamTeam.players:
        if player.get('personId') == playerId:
            playerToDelete = player
            break
    if playerToDelete is None:
        raise HTTPException(
            status_code=500, detail="Player not found in dream-team!")
    indexToDelete = dreamTeam.players.index(player)
    dreamTeam.players.pop(indexToDelete)
    response.status_code = status.HTTP_204_NO_CONTENT
    return


def filter_active_players(team: Team) -> Team:
    team.players = [p for p in team.players if p.isActive]
    return team


def make_team(players, teams, team_name) -> Team:
    team_json = None
    for t in teams:
        if team_name in t["fullName"]:
            team_json = t
            break

    if team_json is None:
        raise HTTPException(status_code=404, detail="Team not found")
    team_meta = Team_meta(**team_json)

    players_in_team = [Player(**p, img=urlConstants.IMG_URL["route"] % (
        p["lastName"], p["firstName"])) for p in players if p["teamId"] == team_meta.teamId]
    team_result = Team(team_meta, players_in_team)
    return team_result


if __name__ == "__main__":
    uvicorn.run("nbaMainServer:app", host="0.0.0.0", port=8000, reload=True)
