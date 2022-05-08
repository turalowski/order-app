import React from 'react';

export const MainHeader = () => {
  return (
    <div
      style={{
        height: '5vh',
        color: 'white',
        backgroundColor: '#55ab80',
        paddingLeft: '3vw',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span>{new Date().toDateString()}</span>
    </div>
  );
};
