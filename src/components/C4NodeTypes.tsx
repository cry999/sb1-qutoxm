import React from 'react'
import { User, Database, Globe, Box } from 'lucide-react'
import { NodeProps, Handle, Position } from 'reactflow'

const C4Node: React.FC<NodeProps> = ({ data, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'person':
        return <User className="w-8 h-8" />
      case 'system':
        return <Box className="w-8 h-8" />
      case 'container':
        return <Database className="w-8 h-8" />
      case 'component':
        return <Globe className="w-8 h-8" />
      default:
        return null
    }
  }

  const getColor = () => {
    switch (type) {
      case 'person':
        return 'bg-blue-100 border-blue-500'
      case 'system':
        return 'bg-green-100 border-green-500'
      case 'container':
        return 'bg-yellow-100 border-yellow-500'
      case 'component':
        return 'bg-red-100 border-red-500'
      default:
        return 'bg-gray-100 border-gray-500'
    }
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${getColor()} border-2 rounded-lg p-4 shadow-md w-48`}>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-2 mb-2">
            {getIcon()}
          </div>
          <span className="text-sm font-medium text-center">{data.label}</span>
          {data.description && (
            <span className="text-xs text-gray-600 mt-1 text-center">{data.description}</span>
          )}
          {data.technology && (
            <span className="text-xs text-gray-500 mt-1 italic text-center">[{data.technology}]</span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

const C4NodeTypes = {
  person: (props: NodeProps) => <C4Node {...props} type="person" />,
  system: (props: NodeProps) => <C4Node {...props} type="system" />,
  container: (props: NodeProps) => <C4Node {...props} type="container" />,
  component: (props: NodeProps) => <C4Node {...props} type="component" />,
}

export default C4NodeTypes