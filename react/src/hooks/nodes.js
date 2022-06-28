const dummy = [
    { 
        id: '1',
        gender: "male",
        name: "Iyah",
        children: [
            { id: "11" },
            { id: "12" }
        ],
        parents: [],
        spouses: [
            { id: '0' }
        ],
        siblings: [],
        placeholder: false
    },
    { 
        id: '0',
        gender: "female",
        name: "Appamma",
        children: [
            { id: "11" },
            { id: "12" }
        ],
        parents: [],
        spouses: [
            { id: '1' }
        ],
        siblings: [],
        placeholder: false
    },
    { 
        id: '12',
        gender: "male",
        name: "Periappa",
        children: [
        ],
        parents: [
            { id: "1" },
            { id: "0" }
        ],
        spouses: [
        ],
        siblings: [],
        placeholder: false
    },
    { 
        id: '11',
        gender: "male",
        name: "Appa",
        children: [
            { id: "111" },
            { id: "112" },
            { id: "113" },
        ],
        parents: [
            { id: "1" },
            { id: "0" }
        ],
        spouses: [
            { id: '110' }
        ],
        siblings: [],
        placeholder: false
    },
    { 
        id: '110',
        gender: "female",
        name: "Amma",
        children: [
            { id: "111" },
            { id: "112" },
            { id: "113" },
        ],
        parents: [],
        spouses: [
            { id: '11' }
        ],
        siblings: [],
        placeholder: false
    },
    { 
        id: '111',
        gender: "male",
        name: "Ashwin",
        parents: [
            { id: '11' },
            { id: '110' }
        ],
        spouses: [],
        siblings: [],
        children: [],
        placeholder: false
    },
    { 
        id: '112',
        gender: "male",
        name: "Calvin",
        parents: [
            { id: '11' },
            { id: '110' }
        ],
        spouses: [],
        siblings: [],
        children: [],
        placeholder: false
    },
    { 
        id: '113',
        gender: "male",
        name: "Aravin",
        parents: [
            { id: '11' },
            { id: '110' }
        ],
        spouses: [],
        siblings: [],
        children: [],
        placeholder: false
    }
]

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const formatArr = (nodeArr) => nodeArr.map(_ => ({ id: _ }))

const formatNodes = (nodes) => nodes.map(node => ({
    ...node,
    id: node._id,
    parents: formatArr(node.parents),
    children: formatArr(node.children),
    siblings: formatArr(node.siblings),
    spouses: formatArr(node.spouses)
}))

const useNodes = () => {

    const _fetch = async () => {
        console.log("Fetching Nodes")
        const response = await fetch('/nodes', {
            method: 'GET',
            headers: headers
        })
        let body = await response.json();
        body = formatNodes(body);
        console.log('body', body);
        return body;
    }

    const post = async (body) => {
        console.log(`body`, body)
        const response = await fetch('/nodes/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    return [ _fetch, post ];
}

export default useNodes;