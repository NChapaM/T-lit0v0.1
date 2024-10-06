import React from 'react'

interface ContentCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ContentCard: React.FC<ContentCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors h-20">
      <div className="flex items-center mb-1">
        {icon}
        <h3 className="text-sm font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}

export default ContentCard