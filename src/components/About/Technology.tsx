'use client'

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type Technology = {
    id: number;
    name: string;
    size: 'small' | 'big';
    src: StaticImageData;
};

const Technology = ({technology}: {technology: Technology}) => {
    const {name, size, src} = technology
    const [hasError, setHasError] = useState(false);
    const [dimension, setDimension] = useState(0);

    useEffect(() => {
        const base = size === 'big' ? 100 : 70;

        const updateDimension = () => {
            const width = window.innerWidth;

            if (width >= 1024) {
                setDimension(base)
            } else if (width >= 768) {
                setDimension(base + 10); // md
            } else {
                setDimension(base - 40); // sm и ниже
            }
        };

        updateDimension();
        window.addEventListener('resize', updateDimension);

        return () => window.removeEventListener('resize', updateDimension);
    }, [size]);

    return (
        <div
            className={`relative rounded-full cursor-pointer group`}
            style={{
                width: dimension + 10,
                height: dimension + 10,
                perspective: '1000px'
            }}
        >
            <div
                className="absolute inset-0 transition-transform rounded-full duration-500 group-hover:scale-110 transform-style-preserve-3d group-hover:rotate-y-180"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div
                    className={`absolute inset-0 flex items-center p-3 md:p-4 ${size === "big" ? 'neoShadow text-headline' : 'neoMiniShadow text-normal'} justify-center bg-text rounded-full`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {hasError ? (
                        <div
                            className="bg-gray-500 rounded-mini"
                            style={{ width: `${dimension}px`, height: `${dimension}px` }}
                        />
                    ) : (
                        <Image
                            className="rounded-mini"
                            width={dimension}
                            src={src}
                            alt={name}
                            onError={() => setHasError(true)}
                        />
                    )}
                </div>

                <div
                    className={`absolute inset-0 flex items-center ${size === "big" ? 'neoShadow text-headline' : 'neoMiniShadow text-normal'} justify-center bg-dark-accent text-bg text-center px-2 rounded-full`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(-180deg)'
                    }}
                >
                    {name}
                </div>
            </div>
        </div>
    );
};

export default Technology;
