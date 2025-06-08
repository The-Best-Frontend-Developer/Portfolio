'use client'

import React, {useEffect, useRef, useState} from 'react';
import styles from './ElectricityAnimation.module.css'

const ElectricityAnimation = () => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Создаем IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.intersectionRatio >= 0.5) {
                    setIsShow(true);
                } else {
                    setIsShow(false);
                }
            },
            {
                threshold: [0, 0.6, 0.7, 1], // Определяем пороги, срабатывает при 0%, 50% и 100% видимости
            }
        );

        observer.observe(element);

        // При размонтировании компонента отключаем observer
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`absolute flex customContainer max-w-[100vw] overflow-x-clip -z-10 bottom-0 left-1/2 transform -translate-y-1/2 lg:translate-y-0 -translate-x-1/2 pointer-events-none max-h-fit w-fit ${isShow ? 'dash' : ''}`} ref={elementRef}>
            <div className="absolute left-0 h-full 1440:w-[2px] bg-accent neoMiniShadow"></div>
            <svg className="w-[110vw] md:w-[min(100vw,_1440px)]" viewBox="-100 -2 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-100 300 H93 V0 H1163 V230 H1340"
                    stroke="var(--color-light-background)"
                    strokeWidth={2}
                    fill="none"
                />
                {isShow && <path
                    d="M-100 300 H93 V0 H1163 V230 H1340"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    fill="none"
                    className={[styles.wireShadow, styles.dash].join(' ')}
                />}

                <path
                    d="M-100 220 H160 V150 H1340"
                    stroke="var(--color-light-background)"
                    strokeWidth={2}
                    fill="none"
                />
                {isShow && <path
                    d="M-100 220 H160 V150 H1340"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    fill="none"
                    className={[styles.wireShadow, styles.reserveDash].join(' ')}
                />}

                <path
                    d="M-100 160 H120 V90 H1340"
                    stroke="var(--color-light-background)"
                    strokeWidth={2}
                    fill="none"
                />
                {isShow && <path
                    d="M-100 160 H120 V90 H1340"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    fill="none"
                    className={[styles.wireShadow, styles.secondDash].join(' ')}
                />}
            </svg>
            <div className="absolute right-0 h-full 1440:w-[2px] bg-accent neoMiniShadow"></div>
        </div>
    );
};

export default ElectricityAnimation;