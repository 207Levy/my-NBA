from pydantic import BaseModel


class Player(BaseModel):

    firstName: str
    lastName: str
    personId: str
    teamId: str
    jersey: str
    pos: str
    isActive: bool
    isInDreamTeam: bool = False
    
    img: str = ""
