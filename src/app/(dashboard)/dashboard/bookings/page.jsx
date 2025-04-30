'use client'
import { fetchNutritionistBookings, updateBookingStatus } from '@/app/Store/ReduxSlice/bookingsSlice';
import { createPlan, resetPlanState } from '@/app/Store/ReduxSlice/plansSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const NutritionistBookings = () => {
  const dispatch = useDispatch();
  const { data: bookings, loading, error } = useSelector((state) => state.bookings);
  const { loading: planLoading, error: planError, success: planSuccess } = useSelector((state) => state.plans);
  
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [planData, setPlanData] = useState({
    dietPlan: [
      {
        day: 'Monday',
        meals: [
          { mealType: 'Breakfast', description: '' },
          { mealType: 'Lunch', description: '' },
          { mealType: 'Dinner', description: '' }
        ]
      }
    ],
    workoutPlan: [
      {
        day: 'Monday',
        exercises: [
          { exerciseName: '', sets: "", reps: "" }
        ]
      }
    ],
    price: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  useEffect(() => {
    dispatch(fetchNutritionistBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
    if (planError) toast.error(planError);
    if (planSuccess) {
      toast.success('Plan created successfully!');
      dispatch(resetPlanState());
      setIsPlanModalOpen(false);
      dispatch(fetchNutritionistBookings());
    }
  }, [error, planError, planSuccess, dispatch]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await dispatch(updateBookingStatus({ bookingId, status: newStatus })).unwrap();
      toast.success('Status updated successfully!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleOpenPlanModal = (booking) => {
    if (booking.status !== 'accepted') {
      toast.warning('Booking must be accepted to create a plan');
      return;
    }
    setSelectedBooking(booking);
    setPlanData({
      dietPlan: [
        {
          day: 'Monday',
          meals: [
            { mealType: 'Breakfast', description: '' },
            { mealType: 'Lunch', description: '' },
            { mealType: 'Dinner', description: '' }
          ]
        }
      ],
      workoutPlan: [
        {
          day: 'Monday',
          exercises: [
            { exerciseName: '', sets: "", reps: "" }
          ]
        }
      ],
      price: ''
    });
    setIsPlanModalOpen(true);
  };

  const handleDietPlanChange = (dayIndex, mealIndex, field, value) => {
    const updatedDietPlan = [...planData.dietPlan];
    updatedDietPlan[dayIndex].meals[mealIndex][field] = value;
    setPlanData({ ...planData, dietPlan: updatedDietPlan });
  };

  const handleWorkoutPlanChange = (dayIndex, exerciseIndex, field, value) => {
    const updatedWorkoutPlan = [...planData.workoutPlan];
    updatedWorkoutPlan[dayIndex].exercises[exerciseIndex][field] = value;
    setPlanData({ ...planData, workoutPlan: updatedWorkoutPlan });
  };

  const addDietDay = () => {
    if (planData.dietPlan.length >= 7) return;
    const nextDay = daysOfWeek[planData.dietPlan.length];
    setPlanData({
      ...planData,
      dietPlan: [
        ...planData.dietPlan,
        {
          day: nextDay,
          meals: mealTypes.slice(0, 3).map(type => ({ mealType: type, description: '' }))
        }
      ]
    });
  };

  const addWorkoutDay = () => {
    if (planData.workoutPlan.length >= 7) return;
    const nextDay = daysOfWeek[planData.workoutPlan.length];
    setPlanData({
      ...planData,
      workoutPlan: [
        ...planData.workoutPlan,
        {
          day: nextDay,
          exercises: [{ exerciseName: '', sets: "", reps: "" }]
        }
      ]
    });
  };

  const addExercise = (dayIndex) => {
    const updatedWorkoutPlan = [...planData.workoutPlan];
    updatedWorkoutPlan[dayIndex].exercises.push({ exerciseName: '', sets: "", reps: "" });
    setPlanData({ ...planData, workoutPlan: updatedWorkoutPlan });
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const updatedWorkoutPlan = [...planData.workoutPlan];
    updatedWorkoutPlan[dayIndex].exercises.splice(exerciseIndex, 1);
    setPlanData({ ...planData, workoutPlan: updatedWorkoutPlan });
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (!selectedBooking) return;
    
    // Filter out empty exercises
    const payload = {
      ...planData,
      workoutPlan: planData.workoutPlan.map(day => ({
        ...day,
        exercises: day.exercises.filter(ex => ex.exerciseName.trim() !== '')
      })),
      price: Number(planData.price)
    };

    dispatch(createPlan({
      bookingId: selectedBooking._id,
      planData: payload
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Member</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Problems</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-semibold">{booking.memberId?.fullName}</div>
                    <div className="text-sm text-gray-500">{booking.memberId?.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{booking.problems}</td>
                  <td className="py-3 px-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className={`px-2 py-1 rounded border ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {booking.status === 'accepted' && booking.planStatus ==="pending" && (
                      <button
                        onClick={() => handleOpenPlanModal(booking)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Create Plan
                      </button>
                    )}
                    {booking.planStatus === 'created' && (
                      <span className="text-green-500">Plan Created</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Plan Creation Modal */}
      {isPlanModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Create Plan for {selectedBooking.memberId?.fullName}
              </h2>
              <button 
                onClick={() => setIsPlanModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handlePlanSubmit}>
              {/* Diet Plan Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Diet Plan</h3>
                  <button
                    type="button"
                    onClick={addDietDay}
                    disabled={planData.dietPlan.length >= 7}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    + Add Day
                  </button>
                </div>

                {planData.dietPlan.map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-6 border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{day.day}</h4>
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                        <div className="md:col-span-3">
                          <select
                            value={meal.mealType}
                            onChange={(e) => handleDietPlanChange(dayIndex, mealIndex, 'mealType', e.target.value)}
                            className="w-full border p-2 rounded"
                          >
                            {mealTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-9">
                          <input
                            type="text"
                            value={meal.description}
                            onChange={(e) => handleDietPlanChange(dayIndex, mealIndex, 'description', e.target.value)}
                            placeholder="Meal description"
                            className="w-full border p-2 rounded"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Workout Plan Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Workout Plan</h3>
                  <button
                    type="button"
                    onClick={addWorkoutDay}
                    disabled={planData.workoutPlan.length >= 7}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    + Add Day
                  </button>
                </div>

                {planData.workoutPlan.map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-6 border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{day.day}</h4>
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                        <div className="md:col-span-5">
                          <input
                            type="text"
                            value={exercise.exerciseName}
                            onChange={(e) => handleWorkoutPlanChange(dayIndex, exerciseIndex, 'exerciseName', e.target.value)}
                            placeholder="Exercise name"
                            className="w-full border p-2 rounded"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                         
                          <input
                            type="number"
                            min="1"
                            value={exercise.sets}
                            placeholder='Add Sets'
                            onChange={(e) => handleWorkoutPlanChange(dayIndex, exerciseIndex, 'sets', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                         
                          <input
                            type="number"
                            min="1"
                            placeholder='Add Reps'
                            value={exercise.reps}
                            onChange={(e) => handleWorkoutPlanChange(dayIndex, exerciseIndex, 'reps', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                          />
                        </div>
                        <div className="md:col-span-3 flex items-center gap-2">
                          {exerciseIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => removeExercise(dayIndex, exerciseIndex)}
                              className="bg-red-100 text-red-600 p-1 rounded"
                            >
                              Remove
                            </button>
                          )}
                          {exerciseIndex === day.exercises.length - 1 && (
                            <button
                              type="button"
                              onClick={() => addExercise(dayIndex)}
                              className="bg-green-100 text-green-600 p-1 rounded"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Price (Rs)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={planData.price}
                  onChange={(e) => setPlanData({...planData, price: e.target.value})}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={planLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {planLoading ? 'Creating...' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionistBookings;