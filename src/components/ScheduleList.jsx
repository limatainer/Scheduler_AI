import { projectFirestore } from '../firebase/config';
import { GoDot } from 'react-icons/go';
import { CiTrash } from 'react-icons/ci';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ScheduleList({ schedules }) {
  const { user } = useAuthContext();

  if (schedules.length === 0) {
    return (
      <div className="text-center p-4 m-4 text-red-600 dark:text-red-400">
        No schedules to load...
      </div>
    );
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
      confirmButtonColor: '#6366f1', // primary color
      cancelButtonColor: '#f43f5e', // accent color
      confirmButtonText: 'Yes, delete it!',
      background: document.documentElement.classList.contains('dark')
        ? '#1f2937'
        : '#ffffff',
      color: document.documentElement.classList.contains('dark')
        ? '#f3f4f6'
        : '#111827',
    }).then((result) => {
      if (result.isConfirmed) {
        projectFirestore.collection('schedule').doc(id).delete();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          background: document.documentElement.classList.contains('dark')
            ? '#1f2937'
            : '#ffffff',
          color: document.documentElement.classList.contains('dark')
            ? '#f3f4f6'
            : '#111827',
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
              className="relative bg-white dark:bg-gray-800 shadow-md rounded-md p-4 m-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute flex m-2 top-0 right-0">
                <CiTrash
                  className="text-2xl cursor-pointer text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                  onClick={() => deleteRequest(schedule.id)}
                />
                {schedule.id === mostRecentSchedule.id && (
                  <GoDot className="text-2xl animate-ping text-accent-600 dark:text-accent-400" />
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    Requester Name: {schedule.name}
                  </h3>
                  <div className="flex">
                    <div className="mr-4">
                      <p className="text-l font-semibold mb-2 text-secondary-600 dark:text-secondary-400">
                        Date requested:
                      </p>
                    </div>
                    <div>
                      <p className="text-l font-semibold mb-2 text-accent-600 dark:text-accent-400">
                        {new Date(
                          schedule.date.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                Message: {schedule.message.substring(0, 100)}...
              </div>
            </div>
          )
      )}
    </div>
  );
}
