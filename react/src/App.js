import { useEffect, useState } from 'react';
import './App.css';

import PinchZoomPan from './components/PinchZoomPan';

//Pages
import TreePage from './pages/Tree';

//Modals
import AddNodeModal from './modals/AddNode';

import useNodes from './hooks/nodes';
let nodesObjectMapped = {};
let rootId;
function App() {
  const [ fetchNodes, putNode ] = useNodes();
  const [ nodes, setNodes ] = useState([]);
  
  const [ selectedNodes, setSelectedNodes ] = useState([]);
  const [ treeState, setTreeState ] = useState('');
  const [ openModal, setOpenModal ] = useState('AddNode');
  useEffect(async () => {
    const nodeResponse = await fetchNodes();
    rootId = nodeResponse[0].id;
    setNodes(nodeResponse);
    nodeResponse.map(node => {
      nodesObjectMapped[node.id] = node
    });
  }, []);

  const handleNodeSelect = (nodeId) => {
    let newSelectedNodes = [ ...selectedNodes ];
    if (selectedNodes.includes(nodeId)) {
      newSelectedNodes = newSelectedNodes.filter(_ => _ !== nodeId);
    } else {
      newSelectedNodes.push(nodeId);
    }
    setSelectedNodes(newSelectedNodes);
  }

  const addNode = async (nodeData) => {
    const newNodes = [ ...nodes ];
    newNodes.push(nodeData);
    await putNode(nodeData);
    window.location.reload();
    setNodes(newNodes);
  }

  return (
    <>
      <PinchZoomPan
        captureWheel
        min={0.2}
        max={2.5}
        className={'zoom'}
        key={'1'}
      >
        <TreePage
          rootId={rootId}
          nodes={nodes}
          treeState={treeState}
          selectedNodes={selectedNodes}
          handleNodeSelect={handleNodeSelect}
        />
      </PinchZoomPan>

      <AddNodeModal
        nodes={nodesObjectMapped}
        open={openModal === 'AddNode'}
        selectedNodes={selectedNodes}
        setSelectedNodes={setSelectedNodes}
        setTreeState={setTreeState}
        addNode={addNode}
        setOpenModal={setOpenModal}
        treeState={treeState}
      />
    </>
  );
}


export default App;
