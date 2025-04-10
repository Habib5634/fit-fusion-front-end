'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';

const AdminPaymentsDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/user/payments`,
          getAuthHeaders()
        );
        setPayments(data.payments);
        setStats({
          total: data.totalPayments,
          revenue: data.totalRevenue
        });
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <div className="flex gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-600">Total Payments</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-600">Total Revenue</h3>
            <p className="text-2xl font-bold">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Member</th>
              <th className="py-3 px-4 text-left">Nutritionist</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Booking</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{payment.memberId?.fullName}</div>
                  <div className="text-sm text-gray-500">{payment.memberId?.email}</div>
                </td>
                <td className="py-3 px-4">
                  {payment.bookingId?.nutritionistId?.fullName}
                </td>
                <td className="py-3 px-4">${payment.amount}</td>
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
                  <div className="text-sm space-y-1">
                    <p>Plan: ${payment.bookingId?.planAmount}</p>
                    <p>Status: {payment.bookingId?.status}</p>
                    <p className="text-gray-500 truncate max-w-xs">
                      {payment.bookingId?.problems}
                    </p>
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

export default AdminPaymentsDashboard;