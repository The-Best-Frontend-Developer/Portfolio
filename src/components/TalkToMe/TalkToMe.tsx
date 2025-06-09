'use client'

import React, {useEffect, useRef, useState} from 'react';
import styles from './TalkToMe.module.css'
import {TalkToMeItem} from "@/components/TalkToMe/TalkToMeItem";

const TalkToMe = ({item}: {item: TalkToMeItem}) => {
    const {text, svg, href, lineColor} = item
    const [isHover, setIsHover] = useState(false);
    const [isIconActive, setIsIconActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const timeoutId = useRef<number | null>(null);

    function hover(hovering: boolean) {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }

        if (hovering) {
            setIsHover(true);
            timeoutId.current = window.setTimeout(() => {
                setIsIconActive(true);
                timeoutId.current = null;
            }, 100);
        } else {
            setIsIconActive(false);
            timeoutId.current = window.setTimeout(() => {
                setIsHover(false);
                timeoutId.current = null;
            }, 100);
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, []);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-5 bg-light-background p-5 rounded-big items-center cursor-default overflow-hidden"
            style={{ '--line-color': lineColor } as React.CSSProperties}
        >
            <h2 className="max-w-[300px]">{text}</h2>

            <div className="flex flex-col self-end items-center -mb-5">
                <div
                    className={`cursor-pointer rounded-full w-15 sm:w-25 duration-200 h-15 sm:h-25 ${
                        isIconActive || isMobile ? `${styles.neoShadow}` : 'fill-gray-700 grayscale-100'
                    }`}
                    style={{
                        fill: isIconActive || isMobile ? lineColor : ''
                    }}
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                >
                    {svg}
                </div>
                <div
                    className={`relative h-[50px] w-[2px] stroke-background ${styles.customFill} ${
                        isHover || isMobile ? styles.hovered : ''
                    }`}
                >
                    <svg width="2" height="50" xmlns="http://www.w3.org/2000/svg" className="relative">
                        <line x1="1" y1="0" x2="1" y2="50" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        </a>
    );
};

export default TalkToMe;
