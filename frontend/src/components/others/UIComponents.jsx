import React from 'react';

// Status Badge - Used for displaying status of tasks
export const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300';
      case 'in progress':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

// Priority Badge - Used for displaying priority of tasks
export const PriorityBadge = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyles()}`}>
      {priority}
    </span>
  );
};

// Empty State - Used when there's no data to display
export const EmptyState = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">{message || 'No data available'}</p>
    </div>
  );
};

// Card with hover effect - Used for clickable cards
export const HoverCard = ({ onClick, children, className = '' }) => {
  return (
    <div 
      onClick={onClick}
      className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

// Avatar component with initials fallback
export const Avatar = ({ src, alt, initials, size = 'md' }) => {
  const sizeClasses = {
    'sm': 'h-8 w-8 text-xs',
    'md': 'h-10 w-10 text-sm',
    'lg': 'h-12 w-12 text-base',
    'xl': 'h-16 w-16 text-lg',
  };
  
  const classes = `${sizeClasses[size]} rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 overflow-hidden`;
  
  if (src) {
    return <img src={src} alt={alt || 'Avatar'} className={classes} />;
  }
  
  return (
    <div className={classes}>
      <span className="font-medium">{initials || '?'}</span>
    </div>
  );
};

// Loading Spinner
export const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    'sm': 'h-4 w-4',
    'md': 'h-6 w-6',
    'lg': 'h-8 w-8',
    'xl': 'h-12 w-12',
  };
  
  const colorClasses = {
    'primary': 'text-primary-600',
    'secondary': 'text-secondary-600',
    'accent': 'text-accent-600',
    'white': 'text-white',
  };
  
  return (
    <svg className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

// Date Badge - Format and display date in a nice badge
export const DateBadge = ({ date, label }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {label && <span className="font-medium mr-1">{label}:</span>}
        {formatDate(date)}
      </span>
    </div>
  );
}; 