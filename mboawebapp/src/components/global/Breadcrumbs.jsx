import React from 'react';
import { ChevronRight } from 'lucide-react';

const BreadcrumbItem = ({ item, isLast }) => {
    const content = (
        <div className="inline-flex items-center">
            {item.icon && <item.icon className="w-4 h-4 me-2" />}
            {item.name}
        </div>
    );

    if (isLast) {
        return <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{content}</span>;
    }

    return (
        <button 
            onClick={item.onClick} 
            className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
        >
            {content}
        </button>
    );
};

const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        <BreadcrumbItem item={item} isLast={index === items.length - 1} />
                        {index < items.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs; 