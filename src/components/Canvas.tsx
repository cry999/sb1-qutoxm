import React from 'react'
import { useDrop } from 'react-dnd'
import { C4Element } from '../types'
import C4ElementComponent from './C4ElementComponent'

interface CanvasProps {
  elements: C4Element[]
}

const Canvas: React.FC<CanvasProps> = ({ elements }) => {
  const [, drop] = useDrop(() => ({
    accept: 'c4element',
    drop: (item: C4Element, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + (delta?.x || 0))
      const top = Math.round(item.top + (delta?.y || 0))
      return { ...item, left, top }
    },
  }))

  return (
    <div ref={drop} className="flex-1 bg-white border-l border-gray-200 p-4">
      {elements.map((element, index) => (
        <C4ElementComponent key={index} {...element} />
      ))}
    </div>
  )
}

export default Canvas