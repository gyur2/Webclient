import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { FaPlus, FaPalette, FaCamera, FaSave } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import './mindmap.css';

const MindMap = () => {
    const [nodes, setNodes] = useState([{ id: 1, text: 'Root', x: 200, y: 150, children: [], color: '#ffffff', level: 0 }]);
    const [nodeData, setNodeData] = useState([{ index: 0, nodename: 'Root' }]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedNode, setDraggedNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState('');
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const addNode = () => {
        if (!selectedNode) return;
        const newNode = {
            id: nodes.length + 1,
            text: `Node ${nodes.length + 1}`,
            x: selectedNode.x + 100,
            y: selectedNode.y + 100,
            children: [],
            color: '#ffffff',
            level: selectedNode.level + 1,
            parentId: selectedNode.id
        };

        setNodes([...nodes, newNode]);
        setNodeData([...nodeData, { index: newNode.level, nodename: newNode.text }]);

        setSelectedNode(prevSelected => {
            const updatedNode = { ...prevSelected, children: [...prevSelected.children, newNode] };
            setNodes(prevNodes => prevNodes.map(n => n.id === prevSelected.id ? updatedNode : n));
            return updatedNode;
        });
    };

    const handleMouseDown = (e, node) => {
        const offsetX = e.clientX - node.x;
        const offsetY = e.clientY - node.y;
        setDraggedNode({ ...node, offsetX, offsetY });
        setIsDragging(true);
        if (!editMode) {
            setSelectedNode(node);
        }
    };

    const handleDoubleClick = (node) => {
        setEditMode(true);
        setEditText(node.text);
        setSelectedNode(node);
    };

    const handleMouseMove = (e) => {
        if (isDragging && draggedNode) {
            const newX = e.clientX - draggedNode.offsetX;
            const newY = e.clientY - draggedNode.offsetY;
            setNodes(nodes.map(n => n.id === draggedNode.id ? { ...n, x: newX, y: newY } : n));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedNode(null);
    };

    const handleTextChange = (e) => {
        setEditText(e.target.value);
    };

    const handleSubmitEdit = () => {
        setNodes(nodes.map(node => node.id === selectedNode.id ? { ...node, text: editText } : node));
        setEditMode(false);
    };

    const handleColorChange = (color) => {
        if (!selectedNode) return;
        const updatedNodes = nodes.map(node => node.level === selectedNode.level ? { ...node, color: color.hex } : node);
        setNodes(updatedNodes);
    };

    const captureMindMap = () => {
        const element = document.querySelector('.mindmap');
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.download = 'mindmap.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const saveMindMap = async () => {
        try {
            const response = await fetch('https://your-server-url.com/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes: nodeData }),
            });
            if (response.ok) {
                console.log('Mind map saved successfully');
            } else {
                console.error('Failed to save mind map');
            }
        } catch (error) {
            console.error('Error saving mind map:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, draggedNode]);

    const renderLines = () => {
        const lines = [];
        nodes.forEach(node => {
            if (node.parentId) {
                const parentNode = nodes.find(n => n.id === node.parentId);
                if (parentNode) {
                    lines.push(
                        <line key={`${parentNode.id}-${node.id}`}
                            x1={parentNode.x + 75}
                            y1={parentNode.y + 25}
                            x2={node.x + 75}
                            y2={node.y + 25}
                            stroke="black"
                            strokeWidth="2" />
                    );
                }
            }
        });
        return lines;
    };

    return (
        <div className="mindmap">
            <Link to="/">
                <img src="./mindmapcraft.png" alt="Mind Map Logo" className="header-image" />
            </Link>
            <svg className="lines" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                {renderLines()}
            </svg>
            {nodes.map(node => (
                <div
                    key={node.id}
                    className={`node ${selectedNode && selectedNode.id === node.id ? 'selected' : ''}`}
                    onMouseDown={e => handleMouseDown(e, node)}
                    onDoubleClick={() => handleDoubleClick(node)}
                    style={{ left: `${node.x}px`, top: `${node.y}px`, position: 'absolute', backgroundColor: node.color }}
                >
                    {!editMode || selectedNode.id !== node.id ? node.text :
                        <input type="text" value={editText} onChange={handleTextChange} onBlur={handleSubmitEdit} autoFocus className="node-input" />}
                </div>
            ))}
            <div className="toolbar">
                <button onClick={addNode}><FaPlus /></button>
                {selectedNode && (
                    <div>
                        <button onClick={() => setColorPickerVisible(!colorPickerVisible)}><FaPalette /></button>
                        {colorPickerVisible && (
                            <SketchPicker color={selectedNode.color} onChangeComplete={handleColorChange} />
                        )}
                    </div>
                )}
            </div>
            <div className="save-capture-buttons">
                <button onClick={saveMindMap} className="save-button">
                    <FaSave style={{ fontSize: '24px' }} />
                </button>
                <button onClick={captureMindMap} className="capture-button">
                    <FaCamera style={{ fontSize: '24px' }} />
                </button>
            </div>
        </div>
    );
};

export default MindMap;
