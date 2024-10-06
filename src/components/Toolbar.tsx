import React from 'react'
import { User, Database, Globe, Box } from 'lucide-react'

const Toolbar: React.FC = () => {
  const elements = [
    { type: 'person', icon: User, label: 'Person' },
    { type: 'system', icon: Box, label: 'System' },
    { type: 'container', icon: Database, label: 'Container' },
    { type: 'component', icon: Globe, label: 'Component' },
  ]

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        {elements.map((element) => (
          <div
            key={element.type}
            className="flex items-center space-x-2 w-full bg-white p-2 rounded hover:bg-gray-100 cursor-move"
            draggable
            onDragStart={(event) => onDragStart(event, element.type)}
          >
            <element.icon className="w-5 h-5" />
            <span>{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Toolbar