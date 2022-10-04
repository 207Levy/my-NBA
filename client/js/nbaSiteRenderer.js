"use strict";
class Renderer {
    constructor() {
        this.playersTemplate = Handlebars.compile($("#players-template").html());
        this.statisticsTemplate = Handlebars.compile($("#statistics-template").html());
    }
    render(data) {
        this.emptyAll();
        this.renderTeamPlayers(data);
    }
    renderTeamPlayers(team) {
        const isDreamTeam = team.teamId === '0' ? true : false;
        const inject = this.playersTemplate({ "player": team.players });
        $("#players").append(inject);
    }
    renderStats(stats, player) {
        const inject = this.statisticsTemplate(stats);
        player.append(inject);
        player.find('.statistics').hide();
        player.find('.statistics').slideDown();
    }
    emptyAll() {
        $("#players").empty();
    }
}
