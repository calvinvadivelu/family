const Node = require('../../models/Node');

const inverseKey = (key) => {
    switch (key) {
        case 'parents':
            return 'children';
        case 'children':
            return 'parents';
        case 'spouses':
            return 'spouses';
        case 'siblings':
            return 'siblings';
        default:
            break;
    }
}

const updateRelations = async (relations, key, newId) => {
    for (let i=0;i<relations.length;i++){
        const id = relations[i];
        const relationNode = await Node.findOne({ _id: id });
        console.log('relationNode', relationNode);
        console.log('inverseKey(key)', inverseKey(key));
        const keyToUpdate = inverseKey(key);
        let { [keyToUpdate]: reactRelations } = relationNode;
        
        reactRelations.push(newId);
        console.log('reactRelations', reactRelations);
        const response = await Node.findOneAndUpdate({ _id: id }, { [keyToUpdate]: reactRelations });
        console.log('response', response);
        
    }
}

module.exports = updateRelations;