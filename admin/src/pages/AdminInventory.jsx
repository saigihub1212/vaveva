import React, { useState, useEffect } from 'react';
import { Box, Save, Plus, Minus, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products?limit=50');
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = (productId, invIdx, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p._id === productId) {
          const updatedInv = [...p.inventory];
          const newStock = Math.max(0, updatedInv[invIdx].stock + delta);
          updatedInv[invIdx].stock = newStock;
          return { ...p, inventory: updatedInv };
        }
        return p;
      })
    );
  };

  const handleSaveInventory = async (product) => {
    try {
      await axios.put(`/api/admin/products/${product._id}`, {
        inventory: product.inventory
      });
      toast.success(`Inventory updated for ${product.name}`);
    } catch (err) {
      toast.error('Failed to update inventory');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Variant Inventory Matrix</h1>
          <p className="text-xs text-gray-400">Manage exact stock counts per Color & Size variant</p>
        </div>
      </div>

      <div className="space-y-6">
        {products.map((p) => {
          const totalStock = p.inventory?.reduce((a, b) => a + b.stock, 0) || 0;

          return (
            <div key={p._id} className="bg-[#16161D] border border-[#272733] p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#272733] pb-4">
                <div className="flex items-center space-x-3">
                  <img src={p.images?.[0]} alt="" className="w-12 h-14 object-cover border border-[#272733]" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                    <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku} | Category: {p.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right font-mono">
                    <span className="text-xs text-gray-400 uppercase">Total Stock: </span>
                    <span className={`text-sm font-bold ${totalStock === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {totalStock} {totalStock === 0 && '(OUT OF STOCK)'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSaveInventory(p)}
                    className="bg-[#D4AF37] text-[#0C0C0F] px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-white transition-colors"
                  >
                    <Save size={14} />
                    <span>Save Stock</span>
                  </button>
                </div>
              </div>

              {/* Variant Stock Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {p.inventory?.map((inv, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border text-center space-y-2 ${
                      inv.stock === 0 ? 'border-red-900 bg-red-950/20' : 'border-[#272733] bg-[#1E1E26]'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {inv.colorName} • Size {inv.size}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleUpdateStock(p._id, idx, -1)}
                        className="w-6 h-6 bg-[#272733] text-white flex items-center justify-center hover:bg-red-800 text-xs"
                      >
                        <Minus size={12} />
                      </button>
                      <span className={`font-mono text-sm font-bold ${inv.stock === 0 ? 'text-red-400' : 'text-white'}`}>
                        {inv.stock}
                      </span>
                      <button
                        onClick={() => handleUpdateStock(p._id, idx, 1)}
                        className="w-6 h-6 bg-[#272733] text-white flex items-center justify-center hover:bg-emerald-800 text-xs"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    {inv.stock === 0 && (
                      <span className="block text-[9px] uppercase tracking-widest text-red-400 font-bold">
                        OUT OF STOCK
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
