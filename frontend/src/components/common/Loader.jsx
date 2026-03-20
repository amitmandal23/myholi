import React from 'react';
import { Loader as LucideLoader } from 'lucide-react';

const Loader = ({ className = "", size = 24, ...props }) => {
  return (
    <LucideLoader 
      className={`animate-spin ${className}`} 
      size={size} 
      {...props} 
    />
  );
};

export default Loader;
