import React, { useState } from 'react'
import { Image, HelpCircle, Calendar, FileText, Phone, CreditCard } from 'lucide-react'
import Carousel from './components/Carousel'
import Chat from './components/Chat'

function App() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; feedback?: 'positive' | 'negative' }>>([])

  const handleSendMessage = async (message: string) => {
    const newMessages = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)

    // Aquí iría la lógica para conectarse a Azure OpenAI
    // Por ahora, simularemos una respuesta
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: 'Esta es una respuesta simulada de Azure OpenAI.' }])
    }, 1000)
  }

  const handleFeedback = (index: number, feedback: 'positive' | 'negative') => {
    setMessages(prevMessages => 
      prevMessages.map((msg, i) => 
        i === index ? { ...msg, feedback } : msg
      )
    )
    // Aquí podrías enviar la retroalimentación a tu backend o a Azure OpenAI
    console.log(`Feedback for message ${index}: ${feedback}`)
  }

  const handleUploadImage = (file: File) => {
    // Aquí iría la lógica para procesar y enviar la imagen a Azure OpenAI
    console.log('Imagen subida:', file.name)
    // Por ahora, simplemente agregaremos un mensaje indicando que se subió una imagen
    setMessages([...messages, { role: 'user', content: `[Imagen subida: ${file.name}]` }])
  }

  const handleClearConversation = () => {
    setMessages([])
    // Aquí podrías agregar lógica adicional, como reiniciar el contexto en Azure OpenAI
    console.log('Conversación limpiada')
  }

  const contentCards = [
    { icon: <Image className="w-6 h-6" />, title: "Crea una Imagen", description: "Genera imágenes únicas con IA" },
    { icon: <HelpCircle className="w-6 h-6" />, title: "Consultar un Incidente", description: "Obtén ayuda sobre problemas específicos" },
    { icon: <Calendar className="w-6 h-6" />, title: "Calendario de Pagos", description: "Revisa tus próximos pagos" },
    { icon: <FileText className="w-6 h-6" />, title: "Resumen de Factura", description: "Obtén un resumen de tu última factura" },
    { icon: <Phone className="w-6 h-6" />, title: "Soporte Técnico", description: "Contacta con nuestro equipo de soporte" },
    { icon: <CreditCard className="w-6 h-6" />, title: "Métodos de Pago", description: "Administra tus métodos de pago" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar con carrusel de tarjetas de contenido y logo */}
      <div className="w-1/4 bg-white p-4 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Consejos de Prompts</h2> {/* Aumentado el margen inferior */}
          <Carousel items={contentCards} />
        </div>
        {/* Logo corporativo */}
        <div className="mt-auto">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Axtel_logo.svg/2560px-Axtel_logo.svg.png" 
            alt="Logo corporativo" 
            className="w-24 h-auto"
          />
        </div>
      </div>

      {/* Chat principal */}
      <div className="flex-1 p-4">
        <Chat 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          onFeedback={handleFeedback}
          onUploadImage={handleUploadImage}
          onClearConversation={handleClearConversation}
        />
      </div>
    </div>
  )
}

export default App