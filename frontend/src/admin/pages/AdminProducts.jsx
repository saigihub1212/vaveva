import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Image, Check, X } from 'lucide-react';
import adminApi from '../utils/adminApi';
import toast from 'react-hot-toast';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Shirts');
  const [price, setPrice] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get('/products?limit=50');
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        category,
        brand: 'VAVEVA',
        description: description || 'Luxury minimal fashion piece.',
        price: Number(price),
        compareAtPrice: Number(compareAtPrice || 0),
        sku: sku || 'VAV-' + Math.floor(1000 + Math.random() * 9000),
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'],
        isFeatured
      };

      await adminApi.post('/admin/products', payload);
      toast.success('Product created successfully!');
      setIsAddModalOpen(false);
      fetchProducts();
      // Reset form
      setName('');
      setPrice('');
      setCompareAtPrice('');
      setSku('');
      setImages([]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminApi.delete(`/admin/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Products Catalog</h1>
          <p className="text-xs text-gray-400">Manage luxury items, variant matrix, pricing, and images</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#D4AF37] text-[#0C0C0F] px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:bg-white transition-colors"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-[#16161D] border border-[#272733]">
        <div className="p-4 border-b border-[#272733] flex justify-between items-center">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products by SKU or name..."
              className="w-full bg-[#1E1E26] border border-[#272733] py-2 pl-9 pr-3 text-xs text-white focus:outline-none"
            />
          </div>
          <span className="text-xs font-mono text-gray-400">Total: {products.length} Products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="bg-[#1E1E26] uppercase text-[10px] tracking-wider text-gray-400">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272733]">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-[#1E1E26]/50">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={p.images?.[0]} alt="" className="w-10 h-12 object-cover border border-[#272733]" />
                    <div>
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</p>
                    </div>
                  </td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 font-mono font-bold text-white">₹{p.price?.toLocaleString()}</td>
                  <td className="p-3 font-mono">
                    {p.totalStock > 0 ? (
                      <span className="text-emerald-400">{p.totalStock} in stock</span>
                    ) : (
                      <span className="text-red-400 font-bold">OUT OF STOCK</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 uppercase font-bold">
                      Active
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => handleDeleteProduct(p._id)} className="p-1 text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#16161D] border border-[#272733] w-full max-w-2xl p-6 shadow-2xl relative my-8 text-white">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-serif text-xl text-[#D4AF37] mb-6">Add New Product</h2>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Oversized Linen Shirt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none"
                  >
                    {['Shirts', 'Pants', 'Hoodies', 'Jackets', 'Accessories'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="1799"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">Compare At Price (₹)</label>
                  <input
                    type="number"
                    placeholder="2499"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="VAV-SH-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-gray-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none"
                  placeholder="Crafted from 100% organic French linen..."
                />
              </div>

              {/* Image URL Uploader */}
              <div>
                <label className="block text-[10px] uppercase text-gray-400 mb-1">Product Images (Cloudinary / Unsplash URL)</label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-[#1E1E26] border border-[#272733] p-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                  <button type="button" onClick={handleAddImage} className="bg-[#272733] text-white px-4 py-2.5 text-xs font-bold uppercase">
                    Add Image
                  </button>
                </div>
                {images.length > 0 && (
                  <div className="flex space-x-2 mt-2">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-12 h-14 object-cover border border-[#272733]" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#D4AF37]"
                />
                <label htmlFor="featured" className="text-xs uppercase text-gray-300">Display in Featured Homepage Collection</label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0C0C0F] py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
