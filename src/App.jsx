import React, { useEffect } from 'react';
import { Layout, Search, Bell, Ghost, Settings } from 'lucide-react';
import Board from './components/Board';
import { useStore } from './store';

function App() {
  const fetchBoard = useStore((state) => state.fetchBoard);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return (
    <>
      <header>
        <div className="logo">
          <Layout className="icon" style={{ width: '24px', height: '24px' }} />
          <span>Trello Clone</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search 
              className="icon" 
              style={{ position: 'absolute', left: '10px', color: 'var(--text-dim)', pointerEvents: 'none' }} 
            />
            <input 
              type="text" 
              placeholder="Search boards..." 
              style={{ 
                padding: '0.5rem 1rem 0.5rem 2.2rem', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                width: '180px'
              }}
            />
          </div>
          
          <Bell className="icon" style={{ color: 'var(--text-dim)', cursor: 'pointer' }} />
          <Settings className="icon" style={{ color: 'var(--text-dim)', cursor: 'pointer' }} />
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, #6366f1, #a855f7)',
            cursor: 'pointer'
          }}></div>
        </div>
      </header>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, color: 'white' }}>
          Loading Board...
        </div>
      ) : (
        <Board />
      )}
    </>
  );
}

export default App;
