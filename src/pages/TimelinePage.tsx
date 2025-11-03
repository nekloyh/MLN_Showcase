// pages/TimelinePage.tsx
import { useEffect, useState } from 'react';
import TimelineEventDetail from '../components/TimelineEventDetail';
import Modal from '../components/ui/modal';
import timelineEvents from '../data/timeline-events.json';
import { TimelineEvent } from '../types/timeline';

export default function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-lenin-yellow-light to-white pt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dòng Thời Gian Kinh Tế Chính Trị
            <span className="block text-marx-red">Mác - Lênin</span>
          </h1>
          <p className="text-gray-700 text-lg">
            Hành trình từ kinh tế học cổ điển đến chủ nghĩa xã hội khoa học
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-marx-red via-lenin-yellow to-marx-red opacity-30" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openModal(event)}
                    className="w-full bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-marx-red-light hover:border-marx-red text-left"
                  >
                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-marx-red to-lenin-yellow text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {event.year}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-700 mb-4">{event.description}</p>

                    <div className="inline-flex items-center text-marx-red hover:text-marx-red-hover transition-colors">
                      <span className="mr-2">Xem Chi Tiết</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-marx-red to-lenin-yellow rounded-full border-4 border-white z-10 shadow-lg" />

                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedEvent?.title ?? ''}
      >
        {selectedEvent && <TimelineEventDetail event={selectedEvent} />}
      </Modal>
    </div>
  );
}