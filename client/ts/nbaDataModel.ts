
class NbaModel{
    static currentTeam:Team 

    async getTeam(teamName: string, year: string): Promise<Team>{
       NbaModel.currentTeam =  await $.get(`/team/teamName=${teamName}&year=${year}`)
       return NbaModel.currentTeam
    }
}