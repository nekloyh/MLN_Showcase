// src/types/timeline.ts
export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
  detailContent: {
    context: string;
    significance: string;
    keyFigures: string[];
    outcomes: string[];
    historicalContext: string;
  };
}
