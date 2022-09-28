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
} 

const controller = new Controller() 