const riderService = require("../services/riderService");

async function registerRider(req,res,next){
    try{
        const {name} = req.body;
        if(!name){
            throw new Error("Name is required");
        }
        const rider = await riderService.registerRider(name);
        res.status(201).json(rider);
    }catch(error){
        next(error);
    }
}

module.exports = {
    registerRider
}