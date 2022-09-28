"use strict";
class Renderer {
    constructor() {
        this.playersTemplate = Handlebars.compile($("#players-template").html());
    }
    render(data) {
        this.emptyAll();
        this.renderTeamPlayers(data);
    }
    renderTeamPlayers(team) {
        const inject = this.playersTemplate({ "player": team.players });
        $("#players").append(inject);
    }
    emptyAll() {
        $("#players").empty();
    }
}
