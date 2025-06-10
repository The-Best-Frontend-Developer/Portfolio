import React from 'react';

const TagWrapper = ({children, tag, direction}: { children?: React.ReactNode, tag: string, direction: "row" | "col" }) => {
    return (
        <div className={`flex ${direction === "row" ? 'flex-row items-baseline' : 'flex-col'} flex-wrap gap-2 text-accent`}>
            <span className="text-mini whitespace-nowrap leading-none">
                &lt; {tag} &gt;
            </span>
            <div className={`text-text ${direction === 'col' ? 'pl-10' : ''}`}>{children}</div>
            <span className="text-mini whitespace-nowrap leading-none">
                &lt; /{tag} &gt;
            </span>
        </div>
    );
};

export default TagWrapper;