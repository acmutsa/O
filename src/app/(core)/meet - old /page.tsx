import { Suspense } from 'react';
import CreateMeetingPage from '@/components/createMeeting/CreateMeetingPage';

export default function MeetPage() {
  return (
    <div className="container mx-auto py-0 mt-0">
      <h1 className="text-2xl font-bold mb-6">Schedule a Meeting</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CreateMeetingPage />
      </Suspense>
    </div>
  );
} 