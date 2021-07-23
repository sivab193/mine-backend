import getRegNo from "../auth/getRegNo"
let fs = require('fs')
let path = require('path')
module.exports={
    Query:{
        async teamscore(parent, {data}, {prisma}, info){
            let t = await prisma.game_scores.findUnique({
                where: {
                    ...data
                }
            })
            if(t!=null && t.current_round>4){
                t.team_id = null
            }
            return t
        },

        async teamLogin(parent, {data}, {prisma}, info){
            let t = await prisma.game_scores.findUnique({
                where: {
                    ...data
                },
                select:{
                    team_id:true,
                    current_round:true,
                    roll_no:true
                }
            })
            return t
        }
    },
    Mutation:{
        async updateScore(parent, { data }, { prisma }, info) {
            const current_round=data.current_round;
            const { clicks,time } = data;
            let hello = JSON.parse(`{"r${current_round}_time":${time},"r${current_round}_clicks":${clicks}}`)
            await prisma.game_scores.update({
                where: {
                    team_id: data.team_id,
                },
                data: {
                    ...hello
                }
            })
            return true;
        },
        async nextRound(parent, { data }, { prisma }, info) {
            
            await prisma.game_scores.update({
                where: {
                    team_id: data.team_id
                },
                data: {
                    current_round: data.current_round+1
                }
            })
            return true;
        }
    }
}