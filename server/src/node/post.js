const mongoose = require('mongoose');

const Node = require('../models/Node');

const updateRelations = require('./functions/reactions');

const post = async ( req, res ) => {
    const { ...nodeData } = req.body;
    console.log('nodeData', nodeData);
    
    const node = new Node({
        _id: new mongoose.Types.ObjectId(),
        ...nodeData
    });
    const response = await node.save()
    .catch(err => console.log("Error Saving Node ", err));
    console.log('Node Save Response', response);
    
    const { parents, children, spouses, siblings, _id } = response;
    const id = _id.toString();

    // Add Children for Parents
    if (parents.length > 0) await updateRelations(parents, 'parents', id);
    if (children.length > 0) await updateRelations(children, 'children', id);
    if (spouses.length > 0) await updateRelations(spouses, 'spouses', id);
    if (siblings.length > 0) await updateRelations(siblings, 'siblings', id);

    console.log('response', response);
    
    res.send(response);
}

module.exports = post