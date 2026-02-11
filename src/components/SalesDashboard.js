import React, { useEffect, useRef } from 'react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export default function SalesDashboard({ sales }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const now = new Date()

  const dailySales = sales
    .filter((s) => new Date(s.date).toDateString() === now.toDateString())
    .reduce((sum, s) => sum + s.total, 0)

  const weeklySales = sales
    .filter(
      (s) =>
        (now.getTime() - new Date(s.date).getTime()) / (1000 * 60 * 60 * 24) <=
        7,
    )
    .reduce((sum, s) => sum + s.total, 0)

  const monthlySales = sales
    .filter(
      (s) =>
        new Date(s.date).getMonth() === now.getMonth() &&
        new Date(s.date).getFullYear() === now.getFullYear(),
    )
    .reduce((sum, s) => sum + s.total, 0)

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)
  const totalOrders = sales.length

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    chartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Daily', 'Weekly', 'Monthly'],
        datasets: [
          {
            label: 'Sales (PKR)',
            data: [dailySales, weeklySales, monthlySales],
            backgroundColor: [
              'rgba(239, 68, 68, 0.7)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(34, 197, 94, 0.7)',
            ],
            borderColor: [
              'rgb(239, 68, 68)',
              'rgb(59, 130, 246)',
              'rgb(34, 197, 94)',
            ],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Sales Overview',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return 'PKR ' + value
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [dailySales, weeklySales, monthlySales])

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-bold mb-6 text-gray-900'>Sales Dashboard</h2>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-red-600'>Daily Sales</h3>
          <p className='text-2xl font-bold text-red-700'>
            PKR {dailySales.toFixed(2)}
          </p>
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-blue-600'>Weekly Sales</h3>
          <p className='text-2xl font-bold text-blue-700'>
            PKR {weeklySales.toFixed(2)}
          </p>
        </div>

        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-green-600'>Monthly Sales</h3>
          <p className='text-2xl font-bold text-green-700'>
            PKR {monthlySales.toFixed(2)}
          </p>
        </div>

        <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
          <h3 className='text-sm font-medium text-purple-600'>Total Revenue</h3>
          <p className='text-2xl font-bold text-purple-700'>
            PKR {totalRevenue.toFixed(2)}
          </p>
          <p className='text-xs text-purple-500 mt-1'>{totalOrders} orders</p>
        </div>
      </div>

      {/* Chart */}
      <div className='h-80 bg-gray-50 rounded-lg p-4'>
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Recent Sales */}
      {sales.length > 0 && (
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-900'>
            Recent Sales
          </h3>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-900'>
                    Invoice
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-900'>
                    Date
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-900'>
                    Items
                  </th>
                  <th className='px-4 py-2 text-right text-sm font-semibold text-gray-900'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales
                  .slice(-5)
                  .reverse()
                  .map((sale, i) => (
                    <tr key={i} className='border-b'>
                      <td className='px-4 py-2 font-mono text-blue-600'>
                        {sale.invoice}
                      </td>
                      <td className='px-4 py-2 text-gray-900'>
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                      <td className='px-4 py-2 text-gray-900'>
                        {sale.items.length} items
                      </td>
                      <td className='px-4 py-2 text-right font-semibold text-gray-900'>
                        PKR {sale.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {sales.length === 0 && (
        <div className='mt-8 text-center text-gray-500 py-8'>
          No sales recorded yet. Create bills to see your sales data here.
        </div>
      )}
    </div>
  )
}
