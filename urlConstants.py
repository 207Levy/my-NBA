BASE_URL = "http://data.nba.net"
IMG_URL = {"args": ["last_name", "first_name"],
           "route": "https://nba-players.herokuapp.com/players/%s/%s"}

CALENDAR = "/data/10s/prod/v1/calendar.json"

SCOREBOARD = {
    "args": ["date"],
    "route": "/data/10s/prod/v1/%s/scoreboard.json"}

LEAGUE_YEAR_PLAYERS = {
    "args": ["year"],
    "route": "/data/10s/prod/v1/%s/players.json"
}

LEAGUE_YEAR_TEAMS = {
    "args": ["year"],
    "route": "/data/10s/prod/v1/%s/teams.json"
}

PLAYER_STATS = {
    "args": ["lastName", "firstName"],
    "route": 'https://nba-players.herokuapp.com/players-stats/%s/%s'
}
