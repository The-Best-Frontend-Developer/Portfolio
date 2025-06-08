import React from 'react';
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-[100vh]">
            <h2 className="!text-xl md:!text-3xl lg:!text-6xl">Страница не найдена 404</h2>
            <Link href="/" className="!text-lg md:!text-2xl lg:!text-4xl text-blue-400 underline">На главную</Link>
        </div>
    );
};

export default NotFound;