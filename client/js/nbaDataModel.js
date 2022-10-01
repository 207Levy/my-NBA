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
class NbaModel {
    getTeam(teamName, year, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            NbaModel.currentTeam = yield $.get(`/team?teamName=${teamName}&year=${year}&isActive=${isActive}`);
            return NbaModel.currentTeam;
        });
    }
    getDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            NbaModel.currentTeam = yield $.get(`/dreamTeam/`);
            return NbaModel.currentTeam;
        });
    }
    addPlayer(playerId) {
        if (NbaModel.currentTeam === null || NbaModel.currentTeam.teamId === "0") {
            throw "cant access team's data...";
        }
        for (const player of NbaModel.currentTeam.players) {
            if (player.personId === playerId) {
                $.post(`/dreamTeam`, JSON.stringify(player));
                return;
            }
        }
    }
    deletePlayer(playerId) {
        if (NbaModel.currentTeam.teamId !== "0") {
            throw "cant access Dream-team's data...";
        }
        $.ajax({
            url: `/dreamTeam?playerId=${playerId}`,
            type: 'DELETE',
        });
    }
}
