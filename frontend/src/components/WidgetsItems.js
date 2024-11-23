import React from "react";

export default function WidgetsItems({ name, category, onCategoryChange }) {
    return (
        <div className="rounded-full h-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full h-full"
            onClick={() => onCategoryChange(category)}>
                {name}
            </button>
        </div>
    );
}
