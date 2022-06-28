import React from 'react';

import './styles.scss';

const Relation = ({ node, remove }) => {
  console.log('node', node);
  return (
        <div className='relation'>
            {node.name}
            <button className='relation-remove' onClick={remove}>x</button>
        </div>
  );
};

export default Relation;
