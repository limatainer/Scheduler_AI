import { projectFirestore } from '../firebase/config';

import { GoDot } from 'react-icons/go';
import { CiTrash } from 'react-icons/ci';

import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ScheduleList({ schedules }) {
  const { user } = useAuthContext();
  if (schedules.length === 0) {
    return <div className="error">No schedules to load...</div>;
  }

  // Find the most recent schedule
  const mostRecentSchedule = schedules.reduce((prev, current) => {
    return prev.createdAt > current.createdAt ? prev : current;
  });

  // DELETE A SCHEDULE
  const deleteRequest = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        projectFirestore.collection('schedule').doc(id).delete();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-start m-4 p-4">
      {schedules.map(
        (schedule) =>
          user.uid === schedule.uid && (
            <div
              key={schedule.id}
              className="relative bg-slate-100 shadow-md rounded-md p-4 m-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <div className="absolute flex m-2 top-0 right-0">
                <CiTrash
                  className="text-2xl cursor-copy"
                  onClick={() => deleteRequest(schedule.id)}
                />
                {schedule.id === mostRecentSchedule.id && (
                  <GoDot className="text-2xl animate-ping text-accent" />
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-tertiary">
                    Requester Name: {schedule.name}
                  </h3>
                  <div className="flex">
                    <div className="mr-4">
                      <p className="text-l font-semibold mb-2 text-secondary">
                        Date requested:
                      </p>
                    </div>
                    <div>
                      <p className="text-l font-semibold mb-2 text-accent">
                        {new Date(
                          schedule.date.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-700">
                Message: {schedule.message.substring(0, 100)}...
              </div>
            </div>
          )
      )}
    </div>
  );
}
