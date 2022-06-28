import React from 'react'
import ReactFamilyTree from 'react-family-tree';

import Node from './components/Node';

import './styles.scss';

const WIDTH = 260;
const HEIGHT = 280;

const TreePage = ({ rootId, nodes = [], treeState, selectedNodes = [], handleNodeSelect }) => {


    if (!nodes.length){
        return <div>Loading...</div>;
    }    

    return (
        <div className='tree-parent'>
            <ReactFamilyTree
                width={WIDTH}
                height={HEIGHT}
                nodes={nodes}
                rootId={rootId}
                canvasClassName='tree'
                renderNode={(node) => { 
                    return (
                    <Node
                    key={node.id}
                    node={node}
                    treeState={treeState}
                    selected={selectedNodes.includes(node.id)}
                    onClick={() => handleNodeSelect(node.id)}
                    />
                )}}
            />
        </div>
    )
}

export default TreePage
