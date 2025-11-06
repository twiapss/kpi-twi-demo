
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white dark:bg-brand-blue-light rounded-lg shadow-md p-4 md:p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
