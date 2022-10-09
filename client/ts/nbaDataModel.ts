
class NbaModel{
    static currentTeam:Team 

    async getTeam(teamName: string, year: string, isActive:boolean): Promise<Team>{
       NbaModel.currentTeam =  await $.get(`/team?teamName=${teamName}&year=${year}&isActive=${isActive}`)
       return NbaModel.currentTeam
    }

    async getDreamTeam(): Promise<Team>{
        NbaModel.currentTeam = await $.get(`/dreamTeam`)
        return NbaModel.currentTeam
    }

    async getPlayerStatistics(firstName: string, lastName: string): Promise<Statistics>{
        const statistics: Statistics = await $.get(`/statistics?lastName=${lastName}&firstName=${firstName}`)
        return statistics
    }

    addPlayer(playerId: string): void{
        if(NbaModel.currentTeam === null || NbaModel.currentTeam.teamId === "0"){
         throw "cant access team's data..."
        }
        for(const player of NbaModel.currentTeam.players){
            if(player.personId === playerId){
                $.post(`/dreamTeam`,JSON.stringify(player))
                return
            }
        }
        
    }

    deletePlayer(playerId: string): void{
        if(NbaModel.currentTeam.teamId !== "0"){
            throw "cant access Dream-team's data..."
           }
           
        $.ajax({
        url: `/dreamTeam?playerId=${playerId}`,
        type: 'DELETE',
        })
               
           
    }


}