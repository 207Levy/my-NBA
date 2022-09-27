
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
import uvicorn
import requests
import json
from player import Player
from team import Team, Team_meta
import urlConstants

app = FastAPI()
app.mount("/client", StaticFiles(directory="client"), name="client")


@app.get("/")
async def root():
    return FileResponse('.\client\index.html')

@app.get("/team/")
async def get_book(teamName: str ="", year: str="2020"):
    players_response = requests.get(urlConstants.BASE_URL + urlConstants.LEAGUE_YEAR_PLAYERS["route"] % (year))
    teams_response = requests.get(urlConstants.BASE_URL + urlConstants.LEAGUE_YEAR_TEAMS["route"] % year)
    
    players_json = players_response.json()["league"]["standard"]
    teams_json = teams_response.json()["league"]["standard"]
    
    team_to_return = make_team(players_json, teams_json, teamName)
    
    return team_to_return


def make_team(players, teams, team_name):
    team_json = None
    for t in teams:
        if team_name in t["fullName"]:
            team_json = t
            break
    
    if team_json is None:
        raise HTTPException(status_code=404, detail="Team not found")
    print(team_json)
    team_meta = Team_meta(**team_json)
    
    players_in_team = [Player(**p, img=urlConstants.IMG_URL["route"] %(p["lastName"], p["firstName"])) for p in players if p["teamId"] == team_meta.teamId]
    team_result = Team(team_meta, players_in_team)
    return team_result

if __name__ == "__main__":
    uvicorn.run("nbaMainServer:app", host="0.0.0.0", port=8000, reload=True)
