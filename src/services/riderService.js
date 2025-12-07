const riders = new Map();

let riderIdSeq = 1;

function registerRider(name){
    const id = riderIdSeq++;
    const rider = {id, name};
    riders.set(id, rider);
    return rider;
}

function getRiderById(id) {
  return riders.get(id) || null;
}


module.exports = {
    registerRider,
    getRiderById
}