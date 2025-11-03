import { TimelineEvent } from '../types/timeline';

interface Props {
  readonly event: TimelineEvent;
}

export default function TimelineEventDetail({ event }: Props) {
  const d = event.detailContent;

  return (
    <div className="space-y-4 mg-t-10">
      <div className="flex items-start space-x-4">
        <img src={event.image} alt={event.title} className="w-28 h-20 object-cover rounded-md" />
        <div>
          <h4 className="text-lg font-bold">{event.title} <span className="text-sm text-gray-500">({event.year})</span></h4>
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
    </div>
  );
}
