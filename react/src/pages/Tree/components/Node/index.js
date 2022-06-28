import React from 'react'

import './styles.scss';

const WIDTH = 260;
const HEIGHT = 280;

const Node = ({ node: { name, id, gender, left, top}, selected, treeState, onClick }) => {

    const handleClick = () => {
        if (treeState === '') return;
        onClick();
    }

    return (
        <div
        className={`node ${gender} ${selected ? 'selected': '' }`}
        style={{
            width: WIDTH / 2,
            height: HEIGHT / 2,
            transform: `translate(${left * (WIDTH / 2) + WIDTH/2 - 82}px, ${top * (HEIGHT / 2) + HEIGHT/2- 82}px)`,
            zIndex: 1
        }}
        onClick={handleClick}
        >
            { name }
        </div>
    )
}

export default Node
