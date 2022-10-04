class Renderer{
    playersTemplate: HandlebarsTemplateDelegate<any>
    statisticsTemplate: HandlebarsTemplateDelegate<any>


    constructor() {
        this.playersTemplate = Handlebars.compile($("#players-template").html());
        this.statisticsTemplate = Handlebars.compile($("#statistics-template").html());

    }

    render(data:Team){
        this.emptyAll();
        this.renderTeamPlayers(data);
        
    }


    private renderTeamPlayers(team: Team):void {
        const isDreamTeam = team.teamId === '0' ? true:false
        const inject = this.playersTemplate({"player": team.players});
        $("#players").append(inject);
    }
    
    public renderStats(stats: Statistics, player: JQuery<HTMLElement>): void {
            const inject = this.statisticsTemplate(stats);
            player.append(inject);
            player.find('.statistics').hide()
            player.find('.statistics').slideDown()
    }

    private emptyAll():void {
        $("#players").empty();
    }
}   