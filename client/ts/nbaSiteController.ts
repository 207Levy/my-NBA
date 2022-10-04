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

    async loadPlayerStatistics(personId: string ,firstName: string, lastName: string){
        const player: JQuery<HTMLElement> = $(`#${personId}`)
        if(player.children('.statistics').length > 0){
            player.find('.statistics').show()
        }
        else{
            const statsToRender: Statistics = await this.nbaDataModel.getPlayerStatistics(firstName, lastName)
            this.renderer.renderStats(statsToRender, player)
        }

    }

    addPlayerToDreamTeam(playerId: string): void{
        this.nbaDataModel.addPlayer(playerId)
    }

    deletePlayerFromDreamTeam(playerId: string): void{
        this.nbaDataModel.deletePlayer(playerId)
        this.loadDreamTeam()
    }

    emptyPlayerImg(img: HTMLImageElement): void{
        img.src = "client/empty-user1.png"
    }

    closeStatistics(cancelBtn: HTMLButtonElement):void{
        const statisticsDiv: HTMLElement | null = cancelBtn.parentElement
        if(statisticsDiv !== null){
            statisticsDiv.style.display = "none"
        }
    }


} 

const controller = new Controller() 
