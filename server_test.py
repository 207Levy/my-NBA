
from nbaMainServer import app
from fastapi.testclient import TestClient
import json
  
client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200, "Test failed!, cant get main site html..."
    
def test_team():
    f = open('test_data\chicago_team.json')
    teamData = json.load(f)
    f.close()
    response = client.get('/team?teamName=Chicago Bulls&year=2022&isActive=false')
    assert response.status_code == 200,  "Test failed!, cant get chicago team..."
    assert teamData == response.json()
    
def test_illegal_team_name():
    response = client.get('/team?teamName=Chicagaa&year=2022&isActive=false')
    assert response.status_code == 404
    
def test_illegal_team_year():
    response = client.get('/team?teamName=Chicago Bulls&year=20222&isActive=false')
    assert response.status_code == 500
    
def test_player_statistics():
    f = open('test_data\lebron_statistics.json')
    statisticsData = json.load(f)
    f.close()
    response = client.get('/statistics?lastName=James&firstName=LeBron')
    assert response.status_code == 200
    assert statisticsData == response.json()
    
def test_dream_team():
    response = client.get('/dreamTeam')
    assert response.status_code == 200
    
def test_duplicate_in_dream_team():
    f = open('test_data\lebron_player.json')
    playerData = json.load(f)
    f.close()
    response = client.post('/dreamTeam', json.dumps(playerData))
    assert response.status_code == 200
    playerData['isInDreamTeam'] = True
    responseDuplicate = client.post('/dreamTeam', json.dumps(playerData))
    assert responseDuplicate.status_code == 500
    
def test_delete_from_dream_team():
    f = open('test_data\lebron_player.json')
    playerData = json.load(f)
    f.close()
    client.post('/dreamTeam', json.dumps(playerData))
    response = client.delete('/dreamTeam?playerId=2544')
    assert response.status_code == 200
  
  
def test_delete_illegal_id_dream_team():
    response = client.delete('/dreamTeam?playerId=25442522')
    assert response.status_code == 500

    
    
    