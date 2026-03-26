import { Book, Link as LinkIcon, Code, Trash2 } from 'lucide-react';

const ItemCard = ({ item, onDelete }) => {
  const getIcon = () => {
    switch(item.type) {
      case 'note': return <Book size={18} />;
      case 'link': return <LinkIcon size={18} />;
      case 'code': return <Code size={18} />;
      default: return <Book size={18} />;
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          {getIcon()}
          <span style={{ fontSize: '0.85rem', textTransform: 'capitalize', fontWeight: 500 }}>{item.type}</span>
        </div>
        <button 
          onClick={() => onDelete(item._id)}
          style={{ color: 'var(--text-secondary)', padding: '0.2rem' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger-color)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          title="Delete item"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
        {item.title}
      </h3>

      <div style={{ flex: 1 }}>
        {item.type === 'link' ? (
          <a href={item.content.startsWith('http') ? item.content : `https://${item.content}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
            {item.content}
          </a>
        ) : item.type === 'code' ? (
          <pre style={{ 
            backgroundColor: '#F3F3F1', 
            padding: '1rem', 
            borderRadius: '4px', 
            fontSize: '0.85rem',
            overflowX: 'auto',
            fontFamily: 'monospace'
          }}>
            {item.content}
          </pre>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
            {item.content}
          </p>
        )}
      </div>

      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {item.tags.map((tag, idx) => (
            <span key={idx} style={{ 
              backgroundColor: '#F3F3F1', 
              color: 'var(--text-secondary)', 
              fontSize: '0.75rem', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '4px',
              fontWeight: 500
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
