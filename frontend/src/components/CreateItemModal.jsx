import { useState } from 'react';
import { X } from 'lucide-react';
import apiClient from '../api/client';

const CreateItemModal = ({ isOpen, onClose, onItemCreated }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('note');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t !== '');
      
      const { data } = await apiClient.post('/items', {
        title, type, content, tags: tagsArray
      });
      
      onItemCreated(data);
      setTitle('');
      setType('note');
      setContent('');
      setTags('');
      onClose();
    } catch (err) {
      alert("Error creating item. Please check the fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem'
    }}>
      <div className="literature-card" style={{ maxWidth: '500px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 600 }}>Create New Item</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <select 
            value={type} onChange={e => setType(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: '#F9F9F8', fontFamily: 'inherit' }}
          >
            <option value="note">Text Note</option>
            <option value="link">Web Link</option>
            <option value="code">Code Snippet</option>
          </select>

          <input 
            type="text" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
          />

          {type === 'code' ? (
            <textarea 
              placeholder="Paste your code here..." required value={content} onChange={e => setContent(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', minHeight: '150px', fontFamily: 'monospace', resize: 'vertical' }}
            />
          ) : type === 'link' ? (
            <input 
              type="url" placeholder="https://..." required value={content} onChange={e => setContent(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
            />
          ) : (
            <textarea 
              placeholder="Write your thoughts..." required value={content} onChange={e => setContent(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', minHeight: '150px', resize: 'vertical', fontFamily: 'inherit' }}
            />
          )}

          <input 
            type="text" placeholder="Tags (comma separated, e.g. React, UX)" value={tags} onChange={e => setTags(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none' }}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontWeight: 500 }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--text-primary)', color: 'white', borderRadius: '4px', fontWeight: 500 }}>
              {loading ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
