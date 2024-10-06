import React, { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import Toolbar from './components/Toolbar'
import C4NodeTypes from './components/C4NodeTypes'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (typeof type === 'undefined' || !type) {
        return
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const position = reactFlowInstance?.project({
        x: event.clientX - (reactFlowBounds?.left ?? 0),
        y: event.clientY - (reactFlowBounds?.top ?? 0),
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: position ?? { x: 0, y: 0 },
        data: { 
          label: `New ${type}`,
          description: 'Description here',
          technology: 'Technology stack'
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">C4 Model Constructor</h1>
      </header>
      <div className="flex flex-1">
        <ReactFlowProvider>
          <Toolbar />
          <div ref={reactFlowWrapper} className="flex-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDragOver={onDragOver}
              onDrop={onDrop}
              nodeTypes={C4NodeTypes}
              defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
              }}
              fitView
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default App