import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const TABS = [
  { id: 'customers', label: 'Customers', icon: 'group' },
  { id: 'products', label: 'Products', icon: 'inventory_2' },
  { id: 'orders', label: 'Orders', icon: 'package_2' },
];

export default function Admin() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customers');
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [stats, setStats] = useState({ customers: 0, products: 0, orders: 0 });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    try {
      let query;
      switch (activeTab) {
        case 'customers':
          query = supabase.from('profiles').select('*').order('created_at', { ascending: false });
          break;
        case 'products':
          query = supabase.from('products').select('*').order('created_at', { ascending: false });
          break;
        case 'orders':
          query = supabase.from('orders').select('*, profiles(first_name, last_name, email)').order('created_at', { ascending: false });
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
  }, [activeTab]);

  const fetchStats = useCallback(async () => {
    try {
      const [customersRes, productsRes, ordersRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        customers: customersRes.count || 0,
        products: productsRes.count || 0,
        orders: ordersRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
      fetchStats();
    }
  }, [activeTab, isAdmin, fetchData, fetchStats]);

  const handleToggleBan = async (user) => {
    setConfirmDialog({
      type: 'ban',
      title: user.is_banned ? 'Unban Customer' : 'Ban Customer',
      message: `Are you sure you want to ${user.is_banned ? 'unban' : 'ban'} ${user.first_name || user.email || 'this user'}?`,
      confirmLabel: user.is_banned ? 'Unban' : 'Ban',
      confirmClass: user.is_banned ? 'bg-primary' : 'bg-red-600',
      onConfirm: async () => {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ is_banned: !user.is_banned })
            .eq('id', user.id);
          if (error) throw error;
          fetchData();
        } catch (error) {
          alert('Error: ' + error.message);
        }
        setConfirmDialog(null);
      },
    });
  };

  const handleToggleProductStatus = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = (item, type) => {
    setConfirmDialog({
      type: 'delete',
      title: `Delete ${type}`,
      message: `Are you sure you want to delete "${item.name || item.first_name || item.email || 'this item'}"? This action cannot be undone.`,
      confirmLabel: 'Delete',
      confirmClass: 'bg-red-600',
      onConfirm: async () => {
        try {
          const table = type === 'customer' ? 'profiles' : type === 'product' ? 'products' : 'orders';
          const { error } = await supabase.from(table).delete().eq('id', item.id);
          if (error) throw error;
          fetchData();
          fetchStats();
        } catch (error) {
          alert('Error: ' + error.message);
        }
        setConfirmDialog(null);
      },
    });
  };

  const handleSave = async (formData) => {
    try {
      const table = activeTab === 'customers' ? 'profiles' : activeTab;
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
      fetchStats();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const filteredData = data.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    let matchesSearch = true;
    let matchesStatus = true;

    if (activeTab === 'customers') {
      matchesSearch = (item.first_name?.toLowerCase() || '').includes(searchLower) ||
        (item.last_name?.toLowerCase() || '').includes(searchLower) ||
        (item.email?.toLowerCase() || '').includes(searchLower);
      if (statusFilter === 'banned') matchesStatus = item.is_banned;
      if (statusFilter === 'active') matchesStatus = !item.is_banned;
      if (statusFilter === 'admin') matchesStatus = item.is_admin;
    } else if (activeTab === 'products') {
      matchesSearch = (item.name?.toLowerCase() || '').includes(searchLower) ||
        (item.category?.toLowerCase() || '').includes(searchLower);
      if (statusFilter === 'active') matchesStatus = item.is_active;
      if (statusFilter === 'inactive') matchesStatus = !item.is_active;
    } else if (activeTab === 'orders') {
      matchesSearch = (item.id?.toLowerCase() || '').includes(searchLower) ||
        (item.profiles?.email?.toLowerCase() || '').includes(searchLower);
      if (statusFilter !== 'all') matchesStatus = item.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span className="font-headline font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="font-brand text-4xl md:text-5xl text-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-on-surface-variant mt-2 font-headline">Manage customers, products, and orders</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: stats.customers, icon: 'group', color: 'bg-primary' },
            { label: 'Total Products', value: stats.products, icon: 'inventory_2', color: 'bg-secondary' },
            { label: 'Total Orders', value: stats.orders, icon: 'package_2', color: 'bg-tertiary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-container-low rounded-2xl p-6 flex items-center gap-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <span className="material-symbols-outlined text-white">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-brand text-primary">{stat.value}</p>
                <p className="text-sm text-on-surface-variant font-headline">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low rounded-2xl overflow-hidden">
          <div className="border-b border-outline-variant/30">
            <nav className="flex overflow-x-auto" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchQuery(''); setStatusFilter('all'); }}
                  className={`flex items-center gap-2 px-6 py-4 font-headline font-semibold text-sm whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-64 font-headline text-sm"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline text-sm"
                >
                  <option value="all">All Status</option>
                  {activeTab === 'customers' && (
                    <>
                      <option value="active">Active</option>
                      <option value="banned">Banned</option>
                      <option value="admin">Admins</option>
                    </>
                  )}
                  {activeTab === 'products' && (
                    <>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </>
                  )}
                  {activeTab === 'orders' && (
                    <>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  )}
                </select>
              </div>
              {activeTab === 'products' && (
                <button
                  onClick={() => { setEditingItem(null); setShowModal(true); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-headline font-semibold text-sm hover:bg-secondary/90 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Add Product
                </button>
              )}
            </div>

            {dataLoading ? (
              <div className="flex items-center justify-center py-16">
                <span className="material-symbols-outlined animate-spin text-secondary text-3xl">progress_activity</span>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">search_off</span>
                <p className="mt-4 text-on-surface-variant font-headline">No {activeTab} found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {activeTab === 'customers' && (
                  <CustomersTable data={filteredData} onToggleBan={handleToggleBan} onEdit={(item) => { setEditingItem(item); setShowModal(true); }} onDelete={(item) => handleDelete(item, 'customer')} />
                )}
                {activeTab === 'products' && (
                  <ProductsTable data={filteredData} onToggleStatus={handleToggleProductStatus} onEdit={(item) => { setEditingItem(item); setShowModal(true); }} onDelete={(item) => handleDelete(item, 'product')} />
                )}
                {activeTab === 'orders' && (
                  <OrdersTable data={filteredData} onEdit={(item) => { setEditingItem(item); setShowModal(true); }} onDelete={(item) => handleDelete(item, 'order')} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <AdminModal
          type={activeTab}
          item={editingItem}
          onClose={() => { setShowModal(false); setEditingItem(null); }}
          onSave={handleSave}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          {...confirmDialog}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
}

function CustomersTable({ data, onToggleBan, onEdit, onDelete }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-outline-variant/30">
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Customer</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Phone</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Joined</th>
          <th className="px-4 py-3 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/20">
        {data.map((user) => (
          <tr key={user.id} className="hover:bg-surface-container transition-colors">
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="font-headline font-bold text-primary text-sm">
                    {(user.first_name?.[0] || user.email?.[0] || '?').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-headline font-semibold text-primary">
                    {user.first_name || user.last_name ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'No name'}
                  </p>
                  {user.is_admin && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Admin</span>
                  )}
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-on-surface-variant">{user.email || 'N/A'}</td>
            <td className="px-4 py-4 text-sm text-on-surface-variant">{user.phone || 'N/A'}</td>
            <td className="px-4 py-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                user.is_banned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user.is_banned ? 'bg-red-500' : 'bg-green-500'}`} />
                {user.is_banned ? 'Banned' : 'Active'}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-on-surface-variant">
              {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onToggleBan(user)}
                  className={`p-2 rounded-lg transition-colors ${
                    user.is_banned ? 'hover:bg-green-100 text-green-600' : 'hover:bg-red-100 text-red-600'
                  }`}
                  title={user.is_banned ? 'Unban' : 'Ban'}
                >
                  <span className="material-symbols-outlined text-lg">{user.is_banned ? 'lock_open' : 'block'}</span>
                </button>
                <button onClick={() => onEdit(user)} className="p-2 rounded-lg hover:bg-primary-container/50 text-primary transition-colors" title="Edit">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button onClick={() => onDelete(user)} className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors" title="Delete">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductsTable({ data, onToggleStatus, onEdit, onDelete }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-outline-variant/30">
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Price</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Stock</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
          <th className="px-4 py-3 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/20">
        {data.map((product) => (
          <tr key={product.id} className="hover:bg-surface-container transition-colors">
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">image</span>
                  </div>
                )}
                <div>
                  <p className="font-headline font-semibold text-primary">{product.name}</p>
                  <p className="text-xs text-on-surface-variant line-clamp-1 max-w-xs">{product.description}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-on-surface-variant">{product.category || 'N/A'}</td>
            <td className="px-4 py-4 text-sm font-semibold text-primary">₹{product.price}</td>
            <td className="px-4 py-4">
              <span className={`text-sm font-semibold ${product.stock_quantity < 10 ? 'text-red-600' : 'text-on-surface'}`}>
                {product.stock_quantity}
              </span>
            </td>
            <td className="px-4 py-4">
              <button
                onClick={() => onToggleStatus(product)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  product.is_active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${product.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                {product.is_active ? 'Active' : 'Inactive'}
              </button>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => onEdit(product)} className="p-2 rounded-lg hover:bg-primary-container/50 text-primary transition-colors" title="Edit">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button onClick={() => onDelete(product)} className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors" title="Delete">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OrdersTable({ data, onEdit, onDelete }) {
  const statusColors = {
    pending: 'bg-slate-100 text-slate-800',
    processing: 'bg-amber-100 text-amber-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-outline-variant/30">
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Customer</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
          <th className="px-4 py-3 text-right text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/20">
        {data.map((order) => (
          <tr key={order.id} className="hover:bg-surface-container transition-colors">
            <td className="px-4 py-4">
              <span className="font-mono text-sm text-primary font-semibold">#{order.id.slice(0, 8)}</span>
            </td>
            <td className="px-4 py-4">
              <p className="font-headline font-semibold text-primary">
                {order.profiles?.first_name || order.profiles?.last_name
                  ? `${order.profiles?.first_name || ''} ${order.profiles?.last_name || ''}`.trim()
                  : 'N/A'}
              </p>
              <p className="text-xs text-on-surface-variant">{order.profiles?.email || 'N/A'}</p>
            </td>
            <td className="px-4 py-4 text-sm font-semibold text-primary">₹{order.total_amount}</td>
            <td className="px-4 py-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status] || statusColors.pending}`}>
                {order.status}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-on-surface-variant">
              {new Date(order.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => onEdit(order)} className="p-2 rounded-lg hover:bg-primary-container/50 text-primary transition-colors" title="Edit">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button onClick={() => onDelete(order)} className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors" title="Delete">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AdminModal({ type, item, onClose, onSave }) {
  const [formData, setFormData] = useState(item || {});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold text-primary">
            {item ? 'Edit' : 'Add'} {type === 'customers' ? 'Customer' : type === 'products' ? 'Product' : 'Order'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {type === 'customers' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" value={formData.first_name || ''} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" value={formData.last_name || ''} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Phone</label>
                <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_admin" checked={formData.is_admin || false} onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
                  className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" />
                <label htmlFor="is_admin" className="text-sm font-headline font-semibold text-primary">Admin privileges</label>
              </div>
            </>
          )}

          {type === 'products' && (
            <>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Product Name *</label>
                <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Description</label>
                <textarea rows={3} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Price (₹) *</label>
                  <input type="number" step="0.01" required value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Stock</label>
                  <input type="number" value={formData.stock_quantity || 0} onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Category</label>
                <input type="text" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Image URL</label>
                <input type="url" value={formData.image_url || ''} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_active" checked={formData.is_active !== false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" />
                <label htmlFor="is_active" className="text-sm font-headline font-semibold text-primary">Active (visible to customers)</label>
              </div>
            </>
          )}

          {type === 'orders' && (
            <>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Status</label>
                <select value={formData.status || 'pending'} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Amount (₹)</label>
                <input type="number" step="0.01" value={formData.total_amount || ''} onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-secondary focus:border-transparent font-headline" />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="px-6 py-3 border border-outline-variant text-on-surface-variant rounded-xl font-headline font-semibold hover:bg-surface-container transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-6 py-3 bg-secondary text-white rounded-xl font-headline font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
              {saving && <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({ title, message, confirmLabel, confirmClass, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={onCancel}>
      <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600">warning</span>
          </div>
          <h3 className="font-headline text-xl font-bold text-primary">{title}</h3>
        </div>
        <p className="text-on-surface-variant mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}
            className="px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl font-headline font-semibold hover:bg-surface-container transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`px-5 py-2.5 text-white rounded-xl font-headline font-semibold hover:opacity-90 transition-colors ${confirmClass}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
