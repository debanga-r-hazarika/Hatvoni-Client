import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const { isAdmin, loading, profile, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    console.log('Admin page - Auth state:', { loading, isAdmin, hasProfile: !!profile, hasUser: !!user });
    if (!loading && !isAdmin) {
      console.log('Redirecting non-admin user to home');
      navigate('/');
    }
  }, [isAdmin, loading, profile, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [activeTab, isAdmin]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      let query;
      switch (activeTab) {
        case 'users':
          query = supabase.from('profiles').select('*').order('created_at', { ascending: false });
          break;
        case 'products':
          query = supabase.from('products').select('*').order('created_at', { ascending: false });
          break;
        case 'orders':
          query = supabase.from('orders').select('*, profiles(full_name, email)').order('created_at', { ascending: false });
          break;
        default:
          query = supabase.from('profiles').select('*');
      }
      const { data: result, error } = await query;
      if (error) throw error;
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const table = activeTab === 'users' ? 'profiles' : activeTab;
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      alert('Error deleting item: ' + error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const table = activeTab === 'users' ? 'profiles' : activeTab;

      if (editingItem) {
        const { error } = await supabase.from(table).update(formData).eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([formData]);
        if (error) throw error;
      }

      setShowModal(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage all aspects of your application</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['users', 'products', 'orders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900 capitalize">Manage {activeTab}</h2>
              {activeTab !== 'users' && (
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Add New
                </button>
              )}
            </div>

            {dataLoading ? (
              <div className="text-center py-12">
                <div className="text-slate-500">Loading {activeTab}...</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {activeTab === 'users' && <UsersTable data={data} onEdit={handleEdit} onDelete={handleDelete} />}
                {activeTab === 'products' && <ProductsTable data={data} onEdit={handleEdit} onDelete={handleDelete} />}
                {activeTab === 'orders' && <OrdersTable data={data} onEdit={handleEdit} onDelete={handleDelete} />}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          activeTab={activeTab}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function UsersTable({ data, onEdit, onDelete }) {
  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-slate-900">{user.full_name || 'N/A'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-500">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-500">{user.phone || 'N/A'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.is_admin ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
              }`}>
                {user.role || 'customer'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
              <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductsTable({ data, onEdit, onDelete }) {
  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {data.map((product) => (
          <tr key={product.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded object-cover mr-3" />
                )}
                <div className="text-sm font-medium text-slate-900">{product.name}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-500">{product.category || 'N/A'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-900">${product.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-500">{product.stock_quantity}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
              <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OrdersTable({ data, onEdit, onDelete }) {
  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {data.map((order) => (
          <tr key={order.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-mono text-slate-900">{order.id.slice(0, 8)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-900">{order.profiles?.full_name || 'N/A'}</div>
              <div className="text-sm text-slate-500">{order.profiles?.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-slate-900">${order.total_amount}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              {new Date(order.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onEdit(order)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
              <button onClick={() => onDelete(order.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Modal({ activeTab, item, onClose, onSave }) {
  const [formData, setFormData] = useState(item || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {item ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === 'users' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name || ''}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={formData.role || 'customer'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value, is_admin: e.target.value === 'admin' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock_quantity || 0}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active !== false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-slate-600 border-slate-300 rounded"
                />
                <label className="ml-2 text-sm text-slate-700">Active</label>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status || 'pending'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.total_amount || ''}
                  onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
