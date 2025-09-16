import React from 'react';

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin" />
    </div>
  );
};

export default SpinnerLoader;
