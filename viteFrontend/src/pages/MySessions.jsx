import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const MySessions = () => {
  const [isHosted, setIsHosted] = useState(true);

  const toggleSessions = () => setIsHosted(!isHosted);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <div
          onClick={toggleSessions}
          style={{
            display: 'flex',
            justifyContent: isHosted ? 'flex-start' : 'flex-end',
            alignItems: 'center',
            width: '200px',
            height: '40px',
            padding: '2px',
            backgroundColor: '#f0f0f0',
            border: '2px solid #dcdcdc',
            borderRadius: '20px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {/* New Text Element for "Hosted" */}
          {isHosted && (
            <div style={{
              position: 'absolute',
              left: '63%', // Position to the right of the smaller oval
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#000',
            }}>
              Joined
            </div>
          )}

          {/* Toggle Indicator */}
          <div style={{
            width: '50%',
            height: '100%',
            backgroundColor: isHosted ? '#FF0000' : '#FF0000',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '36px',
            color: 'white',
          }}>
            {isHosted ? 'Hosted' : 'Joined'}
          </div>

          {/* New Text Element for "Joined" */}
          {!isHosted && (
            <div style={{
              position: 'absolute',
              right: '63%', // Position to the left of the smaller oval
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#000',
            }}>
              Hosted
            </div>
          )}
        </div>
      </div>
      {isHosted ? (
        <div>
          <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Hosted</span> Sessions...</p>
        </div>
      ) : (
        <div>
          <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Joined</span> Sessions...</p>
        </div>
      )}
    </div>
  );
};

export default MySessions;
