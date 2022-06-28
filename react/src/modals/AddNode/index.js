import React, { useEffect, useState } from 'react'

import RelationGroup from './components/RelationGroup';

import './styles.scss'

const AddNodeModal = ({ open, nodes, setOpenModal, addNode, selectedNodes, treeState, setSelectedNodes, setTreeState }) => {

    const [ name, setName ] = useState('');
    const [ gender, setGender ] = useState('male');
    const [ parents, setParents ] = useState([])
    const [ siblings, setSiblings ] = useState([])
    const [ spouse, setSpouses ] = useState([])
    const [ children, setChildren ] = useState([])

    const handleChangeTreeState = (state, preSelectedNodes) => {
        setSelectedNodes(preSelectedNodes);
        setTreeState(state);
    }


    useEffect(() => {
        addAttachedNodes();
    }, [ selectedNodes ])

    const addAttachedNodes = () => {
        const nodesToSet = [ ...selectedNodes ];
        switch (treeState) {
            case 'parents':
                setParents(nodesToSet);
                break;
            case 'siblings':
                setSiblings(nodesToSet);
                break;
            case 'spouse':
                setSpouses(nodesToSet);
                break;
            case 'children':
                setChildren(nodesToSet);
                break;
            default:
                break;
        }
    }

    const finishedAddingNodes = () => {
        setTreeState('');
        setSelectedNodes([]);
    }

    const handleNodeCreate = () => {
        const nodeData = {
            gender: gender,
            name: name,
            children: children,
            parents: parents,
            spouses: spouse,
            siblings: siblings,
            placeholder: false
        };
        addNode(nodeData);
    }

    if (!nodes) return '';

    return (
        <div className={`addnode-backdrop ${ open ? 'open' : 'close' }`}>
            { !open ? 
            <div className='addnode-btn' onClick={() => setOpenModal('AddNode')}>
                <h4>Add Family Member</h4>
            </div>
            :
            <div className='modal addnode'>
                <button className='addnode-close'onClick={() => setOpenModal('')}>
                    <span class="material-icons-round">close</span>
                </button>
                <div className='addnode-form'>
                    <h4>Add Family Member</h4>
                    <label>Name</label>
                    <input value={name} onChange={({ target: { value }}) => setName(value)} type='text'></input>
                    <select value={gender} onChange={({ target: { value }}) => setGender(value)}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                    <RelationGroup
                        nodes={nodes}
                        groupNodes={parents}
                        groupName={"Parents"}
                        group={"parents"}
                        handleChangeTreeState={() => handleChangeTreeState('parents', parents)}
                        remove={(nodeId) => setParents(parents.filter(_ => _ !== nodeId))}
                    />
                    <RelationGroup
                        nodes={nodes}
                        groupNodes={siblings}
                        groupName={"Siblings"}
                        group={"siblings"}
                        handleChangeTreeState={() => handleChangeTreeState('siblings', siblings)}
                        remove={(nodeId) => setParents(siblings.filter(_ => _ !== nodeId))}
                    />
                    <RelationGroup
                        nodes={nodes}
                        groupNodes={spouse}
                        groupName={"Spouse"}
                        group={"spouse"}
                        handleChangeTreeState={() => handleChangeTreeState('spouse', spouse)}
                        remove={(nodeId) => setParents(spouse.filter(_ => _ !== nodeId))}
                    />
                    <RelationGroup
                        nodes={nodes}
                        groupNodes={children}
                        groupName={"Children"}
                        group={"children"}
                        handleChangeTreeState={() => handleChangeTreeState('children', children)}
                        remove={(nodeId) => setParents(children.filter(_ => _ !== nodeId))}
                    />
                    {/* <button onClick={() => handleChangeTreeState('parents')}>Select Parents</button>
                    <button onClick={() => handleChangeTreeState('siblings')}>Select Siblings</button>
                    <button onClick={() => handleChangeTreeState('spouse')}>Select Spouse</button>
                    <button onClick={() => handleChangeTreeState('children')}>Select Children</button> */}
                </div>
                { treeState !== '' ?
                    <button onClick={finishedAddingNodes}>Done Adding { treeState }</button>
                    :
                    <button onClick={handleNodeCreate}>Create Family Member</button>
                }
            </div>
            }
        </div>
    )
}

export default AddNodeModal
