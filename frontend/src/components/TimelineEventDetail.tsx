import { useState } from 'react'
import { TimelineEvent } from '../types/timeline'
import ImageModal from './ui/ImageModal'

interface Props {
  readonly event: TimelineEvent
}

export default function TimelineEventDetail({ event }: Props) {
  const d = event.detailContent
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-4 mg-t-10">
      <div className="flex items-start space-x-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Xem lớn ${event.title}`}
          className="p-0 bg-transparent border-0 rounded-md overflow-hidden"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-56 h-60 object-cover rounded-md cursor-zoom-in"
            draggable={false}
          />
        </button>
        <div>
          <h4 className="text-lg font-bold">
            {event.title} <span className="text-sm text-gray-500">({event.year})</span>
          </h4>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>
      </div>

      <div>
        <h5 className="font-semibold">Bối cảnh</h5>
        <p className="text-sm text-gray-700">{d.context}</p>
      </div>

      <div>
        <h5 className="font-semibold">Ý nghĩa</h5>
        <p className="text-sm text-gray-700">{d.significance}</p>
      </div>

      <div>
        <h5 className="font-semibold">Nhân vật chính</h5>
        <p className="text-sm text-gray-700">{d.keyFigures.join(', ')}</p>
      </div>

      <div>
        <h5 className="font-semibold">Kết quả / Hệ quả</h5>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {d.outcomes.map((o: string) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="font-semibold">Bối cảnh lịch sử</h5>
        <p className="text-sm text-gray-700">{d.historicalContext}</p>
      </div>

      <ImageModal isOpen={isOpen} src={event.image} alt={event.title} onClose={() => setIsOpen(false)} />
    </div>
  )
}
