class Renderer{
    playersTemplate: HandlebarsTemplateDelegate<any>

    constructor() {
        this.playersTemplate = Handlebars.compile($("#players-template").html());
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

    private emptyAll():void {
        $("#players").empty();
    }
}   