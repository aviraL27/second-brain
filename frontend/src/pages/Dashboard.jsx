import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../api/client';
import ItemCard from '../components/ItemCard';
import CreateItemModal from '../components/CreateItemModal';
import { Search, Plus } from 'lucide-react';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    // Determine current sidebar filter
    const params = new URLSearchParams(location.search);
    const filterType = params.get('filter');

    const fetchItems = async () => {
        try {
            const endpoint = search.trim() ? `/items/search?q=${search}` : '/items';
            const { data } = await apiClient.get(endpoint);
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch items", error);
        }
    };

    // Debounce search query to MongoDB Text Index route
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => fetchItems(), 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]); 

    // Re-fetch on initial load
    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/items/${id}`);
            // Optimistic UI update
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const handleItemCreated = (newItem) => {
        setItems([newItem, ...items]);
    };

    const displayedItems = filterType ? items.filter(item => item.type === filterType) : items;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                        type="text" 
                        placeholder="Search your brain..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem 1rem 0.75rem 2.5rem', 
                            borderRadius: '6px', 
                            border: '1px solid var(--border-color)', 
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.95rem'
                        }}
                    />
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '0.5rem', 
                        backgroundColor: 'var(--text-primary)', color: 'white', 
                        padding: '0.75rem 1.25rem', borderRadius: '6px', 
                        fontWeight: 500, fontSize: '0.95rem',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
                    onMouseLeave={e => e.currentTarget.style.opacity = 1}
                >
                    <Plus size={18} /> New Item
                </button>
            </div>

            {/* Dashboard Content */}
            {displayedItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
                    <p>No items found. Click "New Item" to populate your space.</p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '1.5rem',
                    alignItems: 'start'
                }}>
                    {displayedItems.map(item => (
                        <ItemCard key={item._id} item={item} onDelete={handleDelete} />
                    ))}
                </div>
            )}

            <CreateItemModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onItemCreated={handleItemCreated} 
            />
        </div>
    );
};

export default Dashboard;
