"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Controller {
    constructor() {
        this.renderer = new Renderer();
        this.nbaDataModel = new NbaModel();
        this.emptyPlayerImg = function (img) {
            img.src = "client/empty-user1.png";
        };
    }
    loadTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamName = String($("#team-input").val());
            const year = String($("#year-input").val());
            const isActive = $('#active-player').is(':checked');
            const teamToRender = yield this.nbaDataModel.getTeam(teamName, year, isActive);
            this.renderer.render(teamToRender);
        });
    }
    loadDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamToRender = yield this.nbaDataModel.getDreamTeam();
            this.renderer.render(teamToRender);
        });
    }
    addPlayerToDreamTeam(playerId) {
        this.nbaDataModel.addPlayer(playerId);
    }
    deletePlayerFromDreamTeam(playerId) {
        this.nbaDataModel.deletePlayer(playerId);
        this.loadDreamTeam();
    }
}
const controller = new Controller();
