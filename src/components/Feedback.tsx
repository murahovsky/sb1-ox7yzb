import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeedbackProps {
  show: boolean;
}

export function Feedback({ show }: FeedbackProps) {
  if (!show) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-green-600 animate-fade-in p-4 bg-green-50 rounded-lg">
      <CheckCircle className="w-6 h-6" />
      <p className="font-medium text-lg">Great job! Get ready for the next word!</p>
    </div>
  );
}