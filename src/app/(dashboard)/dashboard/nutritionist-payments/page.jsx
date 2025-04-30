'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';

const NutritionistPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/nut/nutritionist-payments`,
          getAuthHeaders()
        );
        setPayments(data.payments);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Members Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Member</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Booking Details</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="border-b">
                <td className="py-3 px-4">
                  <div className="font-medium">{payment.memberId?.fullName}</div>
                  <div className="text-sm text-gray-500">{payment.memberId?.email}</div>
                </td>
                <td className="py-3 px-4">Rs {payment.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <p>Plan: Rs{payment.bookingId?.planAmount}</p>
                    <p>Status: {payment.bookingId?.status}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionistPayments;