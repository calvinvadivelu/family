import React from 'react';

import RelationBlock from '../Relation';

import './styles.scss';

const RelationGroup = ({ nodes, groupNodes = [], groupName, handleChangeTreeState, remove }) => {
    console.log('groupNodes', groupNodes);
    return (
        <div className='relationgroup'>
            <label>{ groupName }</label>
            <div className='relationgroup-relations'>
                { groupNodes.map(nodeId => (
                    <RelationBlock
                    node={nodes[nodeId]}
                    remove={() => remove(nodeId)}
                    />
                ))}
                <button className='relationgroup-add' onClick={handleChangeTreeState}>Add {groupName}</button>
            </div>
        </div>
    );
};

export default RelationGroup