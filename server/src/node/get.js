const Node = require('../models/Node');

const get = async ( req, res ) => {
    console.log("FETCHING NODES");
    const nodes = await Node.find({});
    console.log('nodes', nodes);
    res.send(nodes);
}

module.exports = get;