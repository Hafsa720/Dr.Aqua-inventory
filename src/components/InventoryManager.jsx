import React, { useState } from 'react'

export default function InventoryManager({ inventory, updateInventory }) {
  const [product, setProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
  })
  const [editingId, setEditingId] = useState(null)

  const handleAdd = () => {
    if (editingId) {
      updateInventory(
        inventory.map((p) => (p.id === editingId ? { ...p, ...product } : p)),
      )
      setEditingId(null)
    } else {
      updateInventory([...inventory, { ...product, id: Date.now() }])
    }
    setProduct({ name: '', quantity: 0, price: 0 })
  }

  const handleDelete = (id) =>
    updateInventory(inventory.filter((p) => p.id !== id))

  const handleStockIn = (id, qty) =>
    updateInventory(
      inventory.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + qty } : p,
      ),
    )

  const handleStockOut = (id, qty) =>
    updateInventory(
      inventory.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity - qty) } : p,
      ),
    )

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-bold mb-4 text-gray-900'>
        Inventory Management
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAdd()
        }}
        className='mb-6 flex flex-wrap gap-3'
      >
        <input
          type='text'
          placeholder='Product Name'
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          className='flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <input
          type='number'
          placeholder='Quantity'
          value={product.quantity || ''}
          onChange={(e) =>
            setProduct({ ...product, quantity: +e.target.value })
          }
          required
          className='w-28 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <input
          type='number'
          placeholder='Price'
          value={product.price || ''}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          required
          className='w-28 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <button
          type='submit'
          className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors'
        >
          {editingId ? 'Update' : 'Add'} Product
        </button>
      </form>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b'>
                Name
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b'>
                Quantity
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b'>
                Price
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((p) => (
              <tr key={p.id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3 text-gray-900'>{p.name}</td>
                <td className='px-4 py-3 text-gray-900'>
                  {p.quantity}
                  {p.quantity < 10 && (
                    <span className='ml-2 px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded'>
                      Low Stock!
                    </span>
                  )}
                </td>
                <td className='px-4 py-3 text-gray-900'>PKR {p.price}</td>
                <td className='px-4 py-3 space-x-2'>
                  <button
                    onClick={() => {
                      setProduct(p)
                      setEditingId(p.id)
                    }}
                    className='px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className='px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleStockIn(p.id, 10)}
                    className='px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors'
                  >
                    +10
                  </button>
                  <button
                    onClick={() => handleStockOut(p.id, 5)}
                    className='px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors'
                  >
                    -5
                  </button>
                </td>
              </tr>
            ))}
            {inventory.length === 0 && (
              <tr>
                <td colSpan={4} className='px-4 py-8 text-center text-gray-500'>
                  No products in inventory. Add your first product above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
