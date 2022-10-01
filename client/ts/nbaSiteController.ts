class Controller {
    renderer = new Renderer()
    nbaDataModel = new NbaModel()

    async loadTeam(){
        const teamName: string = String($("#team-input").val())
        const year: string = String($("#year-input").val())
        const isActive: boolean = $('#active-player').is(':checked')
        const teamToRender: Team = await this.nbaDataModel.getTeam(teamName, year, isActive)
        this.renderer.render(teamToRender)
    }

    async loadDreamTeam(){
        const teamToRender: Team = await this.nbaDataModel.getDreamTeam()
        this.renderer.render(teamToRender)
    }

    addPlayerToDreamTeam(playerId: string): void{
        this.nbaDataModel.addPlayer(playerId)
    }

    deletePlayerFromDreamTeam(playerId: string): void{
        this.nbaDataModel.deletePlayer(playerId)
        this.loadDreamTeam()
    }

    emptyPlayerImg = function(img: HTMLImageElement): void{
        img.src = "client/empty-user1.png"
    }


} 

const controller = new Controller() 
