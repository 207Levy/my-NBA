from pydantic import BaseModel

from player import Player


class Team_meta(BaseModel):
    city: str
    isNBAFranchise: bool
    fullName: str
    teamId: str


class Team():
    def __init__(self, team_info: Team_meta, players: list[Player] = None):
        self.players = players
        self.teamId = team_info.teamId
        self.fullName = team_info.fullName
        self.isInNba = team_info.isNBAFranchise
        self.city = team_info.city

    def set_players(self, players: list[Player]):
        self.players = players

    def add_player(self, player_to_add: Player):
        if len(self.players) == 0:
            self.players.append(player_to_add)
            return

        for player in self.players:
            if player_to_add.get("personId") == player.get("personId"):
                return {"message": "player allready exists in this team!"}

        self.players.append(player_to_add)
        return {"message": "player added succesfully to the team!"}
