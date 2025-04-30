'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const MemberBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentBookingId, setPaymentBookingId] = useState(null);

    // Add this payment handler
    const handleOpenPaymentModal = (booking) => {
        setPaymentBookingId(booking._id);
        setPaymentAmount(booking.planAmount);
        setIsPaymentModalOpen(true);
    };
    // Add this payment submission handler
    const handlePaymentSubmit = async () => {
        try {
            const { data } = await axios.post(
                `${API_URL}/user/make-payment/${paymentBookingId}`,
                { amount: paymentAmount },
                getAuthHeaders()
            );

            toast.success('Payment successful!');
            setIsPaymentModalOpen(false);
            // Refresh bookings after payment
            const { data: bookingsData } = await axios.get(
                `${API_URL}/user/user-bookings/`,
                getAuthHeaders()
            );
            setBookings(bookingsData.bookings);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Payment failed');
        }
    };
    const [reportData, setReportData] = useState({
        weight: '',
        progress: '',
        comments: ''
    });
    const [paymentRequired, setPaymentRequired] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data } = await axios.get(
                    `${API_URL}/user/user-bookings/`,
                    getAuthHeaders()
                );
                setBookings(data.bookings);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch bookings');
                toast.error('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const getStatusBadge = (status) => {
        const statusClasses = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleViewPlan = async (bookingId) => {
        try {
            setIsPlanModalOpen(true);
            setPaymentRequired(false);

            const { data } = await axios.get(
                `${API_URL}/user/view-plan/${bookingId}`,
                getAuthHeaders()
            );

            if (data.plan) {
                setSelectedPlan(data.plan);
            } else if (data.message === 'Payment required') {
                setPaymentRequired(true);
                setSelectedPlan(null);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch plan details');
            setIsPlanModalOpen(false);
        }
    };

    const handleMakePayment = async (bookingId) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/payment/${bookingId}`,
                { amount: bookings.find(b => b._id === bookingId)?.planAmount },
                getAuthHeaders()
            );

            toast.success('Payment successful!');
            setPaymentRequired(false);
            // Refetch the plan after payment
            handleViewPlan(bookingId);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Payment failed');
        }
    };

    const handleOpenReportModal = (booking) => {
        setSelectedBooking(booking);
        setIsReportModalOpen(true);
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/user/submit-report/${selectedBooking.planId}`,
                reportData,
                getAuthHeaders()
            );

            toast.success('Report submitted successfully!');
            setIsReportModalOpen(false);
            setReportData({ weight: '', progress: '', comments: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit report');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-yellow text-dark px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">You haven't made any bookings yet.</p>
                        <Link
                            href="/nutritionist"
                            className="inline-block mt-4 bg-yellow text-dark px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Find Nutritionists
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nutritionist
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Plan Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {booking.nutritionistId?.fullName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {booking.nutritionistId?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(booking.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.planStatus === 'created' ? (
                                                    <span className="text-green-600">Plan Created</span>
                                                ) : (
                                                    <span className="text-gray-400">No Plan</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {booking.planStatus === 'pending' ? (
                                                    <span className="text-yellow-600">Wait for Plan Creation</span>
                                                ) : booking.paymentStatus === 'pending' ? (
                                                    <button
                                                        onClick={() => handleOpenPaymentModal(booking)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Pay Plan Fees
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleViewPlan(booking._id)}
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                        >
                                                            View Plan
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenReportModal(booking)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Submit Report
                                                        </button>
                                                    </>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Plan Details Modal */}
                {isPlanModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {paymentRequired ? 'Payment Required' : 'Plan Details'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsPlanModalOpen(false);
                                        setPaymentRequired(false);
                                    }}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    &times;
                                </button>
                            </div>

                            {paymentRequired ? (
                                <div className="text-center py-8">
                                    <p className="text-lg mb-4">You need to complete payment to view this plan</p>
                                    <button
                                        onClick={() => handleMakePayment(selectedBooking?._id)}
                                        className="bg-yellow text-dark px-4 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            ) : selectedPlan ? (
                                <>
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-2">Diet Plan</h3>
                                        <div className="space-y-4">
                                            {selectedPlan.dietPlan.map((dayPlan, dayIndex) => (
                                                <div key={dayIndex} className="border rounded-lg p-4">
                                                    <h4 className="font-medium mb-2">{dayPlan.day}</h4>
                                                    <div className="space-y-2">
                                                        {dayPlan.meals.map((meal, mealIndex) => (
                                                            <div key={mealIndex} className="bg-gray-50 p-3 rounded">
                                                                <h5 className="font-medium">{meal.mealType}</h5>
                                                                <p className="text-gray-600">{meal.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-2">Workout Plan</h3>
                                        <div className="space-y-4">
                                            {selectedPlan.workoutPlan.map((dayPlan, dayIndex) => (
                                                <div key={dayIndex} className="border rounded-lg p-4">
                                                    <h4 className="font-medium mb-2">{dayPlan.day}</h4>
                                                    <div className="space-y-2">
                                                        {dayPlan.exercises.map((exercise, exIndex) => (
                                                            <div key={exIndex} className="bg-gray-50 p-3 rounded">
                                                                <h5 className="font-medium">{exercise.exerciseName}</h5>
                                                                <p className="text-gray-600">
                                                                    {exercise.sets} sets × {exercise.reps} reps
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-right font-semibold">
                                            Total Price: Rs {selectedPlan.price}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p>Loading plan details...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Report Submission Modal */}
                {isReportModalOpen && selectedBooking && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Submit Progress Report</h2>
                                <button
                                    onClick={() => setIsReportModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleReportSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Current Weight
                                    </label>
                                    <input
                                        type="text"
                                        value={reportData.weight}
                                        onChange={(e) => setReportData({ ...reportData, weight: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Progress Notes
                                    </label>
                                    <textarea
                                        value={reportData.progress}
                                        onChange={(e) => setReportData({ ...reportData, progress: e.target.value })}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Comment/Feedback
                                    </label>
                                    <textarea
                                        value={reportData.comments}
                                        onChange={(e) => setReportData({ ...reportData, comments: e.target.value })}
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsReportModalOpen(false)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isPaymentModalOpen && (
                    //   Usage in your component:
                    <PaymentModal
                        paymentAmount={paymentAmount}
                        onClose={() => setIsPaymentModalOpen(false)}
                        onConfirm={handlePaymentSubmit}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default MemberBookings;

const PaymentModal = ({ paymentAmount, onClose, onConfirm }) => {
    const [payment, setPayment] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const [errors, setErrors] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    // Real-time validation
    useEffect(() => {
        validateForm();
    }, [payment]);

    const validateForm = () => {
        const newErrors = {};

        // Validate card number
        if (!payment.cardNumber) {
            newErrors.cardNumber = '';
        } else if (payment.cardNumber.length !== 16 || !/^\d+$/.test(payment.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number (must be 16 digits)';
        } else {
            newErrors.cardNumber = '';
        }

        // Validate expiry date
        if (!payment.expiry) {
            newErrors.expiry = '';
        } else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
            newErrors.expiry = 'Invalid format (MM/YY)';
        } else {
            const [month, year] = payment.expiry.split('/');
            const expiryDate = new Date(`20${year}`, month - 1);
            const currentDate = new Date();
            if (expiryDate < currentDate) {
                newErrors.expiry = 'Card has expired';
            } else {
                newErrors.expiry = '';
            }
        }

        // Validate CVV
        if (!payment.cvv) {
            newErrors.cvv = '';
        } else if (payment.cvv.length !== 3 || !/^\d+$/.test(payment.cvv)) {
            newErrors.cvv = 'Invalid CVV (must be 3 digits)';
        } else {
            newErrors.cvv = '';
        }

        // Validate name
        if (!payment.name.trim()) {
            newErrors.name = '';
        } else {
            newErrors.name = '';
        }

        setErrors(newErrors);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }

        setPayment({ ...payment, expiry: value.substring(0, 5) });
    };

    const handleSubmit = () => {
        // Final validation before submission
        const newErrors = {};

        if (!payment.cardNumber) {
            newErrors.cardNumber = 'Card number is required';
        } else if (payment.cardNumber.length !== 16 || !/^\d+$/.test(payment.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number (must be 16 digits)';
        }

        if (!payment.expiry) {
            newErrors.expiry = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
            newErrors.expiry = 'Invalid format (MM/YY)';
        } else {
            const [month, year] = payment.expiry.split('/');
            const expiryDate = new Date(`20${year}`, month - 1);
            const currentDate = new Date();
            if (expiryDate < currentDate) {
                newErrors.expiry = 'Card has expired';
            }
        }

        if (!payment.cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (payment.cvv.length !== 3 || !/^\d+$/.test(payment.cvv)) {
            newErrors.cvv = 'Invalid CVV (must be 3 digits)';
        }

        if (!payment.name.trim()) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (!hasErrors) {
            onConfirm(payment);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Complete Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-lg mb-2">Amount to Pay: Rs{paymentAmount}</p>
                    <div className="space-y-4">
                        <div className="border p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Credit Card</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={payment.name}
                                        onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {errors.name && <div className="error text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={payment.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                                            setPayment({ ...payment, cardNumber: value });
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {errors.cardNumber && <div className="error text-red-500 text-sm mt-1">{errors.cardNumber}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={payment.expiry}
                                            onChange={handleExpiryChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                        {errors.expiry && <div className="error text-red-500 text-sm mt-1">{errors.expiry}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            value={payment.cvv}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                                                setPayment({ ...payment, cvv: value });
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                        {errors.cvv && <div className="error text-red-500 text-sm mt-1">{errors.cvv}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};