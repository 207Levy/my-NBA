from pydantic import BaseModel

from player import Player


class Statistics(BaseModel):
    minutes_per_game: str
    field_goal_percentage: str
    free_throw_percentage: str
    three_point_percentage: str
    player_efficiency_rating: str
