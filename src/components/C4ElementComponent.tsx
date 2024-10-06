import React from 'react'
import { useDrag } from 'react-dnd'
import { User, Database, Globe, Box } from 'lucide-react'
import { C4Element } from '../types'

const C4ElementComponent: React.FC<C4Element> = ({ type, left, top }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'c4element',
    item: { type, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

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

  return (
    <div
      ref={drag}
      className={`absolute p-2 bg-white border-2 border-gray-300 rounded cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{ left, top }}
    >
      <div className="flex flex-col items-center">
        {getIcon()}
        <span className="mt-1 text-sm">{type}</span>
      </div>
    </div>
  )
}

export default C4ElementComponent