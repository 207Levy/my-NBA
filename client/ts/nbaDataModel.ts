
class NbaModel{
    static currentTeam:Team 

    async getTeam(teamName: string, year: string, isActive:boolean): Promise<Team>{
       NbaModel.currentTeam =  await $.get(`/team?teamName=${teamName}&year=${year}&isActive=${isActive}`)
       return NbaModel.currentTeam
    }
}