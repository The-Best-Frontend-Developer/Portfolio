'use client'

import React, {useEffect, useRef, useState} from 'react';
import TypingText from "@/components/ui/TypingText";
import Image from 'next/image'
import me from './me.jpg'

const WhoAmI = () => {
    const [showCursor, setShowCursor] = useState(true)
    const [showSecondCursor, setShowSecondCursor] = useState(false)
    const [typingGreetingDone, setTypingGreetingDone] = useState(false)
    const [typingAboutDone, setTypingAboutDone] = useState(false)

    const targetRef = useRef<HTMLDivElement | null>(null);
    const [canStart, setCanStart] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    setCanStart(true);
                }
            },
            {
                threshold: 1.0,
            }
        );

        const element = targetRef.current;
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    useEffect(() => {
        if (!typingGreetingDone) return;

        const timeout = setTimeout(() => {
            setShowCursor(false);
            setShowSecondCursor(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [typingGreetingDone]);

    return (
        <div className="flex flex-col sm:flex-row py-5 md:py-15 gap-10 lg:gap-22">
            <div className="self-center neoShadow w-[min(100%,_200px)] sm:w-[200px] lg:w-[320px] rounded-big">
                <Image
                    className="w-full rounded-big"
                    src={me}
                    alt="портрет"
                    width={250}
                    height={300}
                    priority={true}
                />
            </div>
            <div className="flex flex-col gap-5 justify-between min-h-[260px] sm:min-h-[190px] h-full flex-1" ref={targetRef}>
                <div className="flex flex-col py-5 px-9 neoShadow rounded-big font-second min-h-16 text-mini">
                    {canStart &&
                        <>
                            <div className="flex gap-3 md:gap-7">
                                <span className="text-darkest-accent">1</span>
                                <div className="text-dark-accent">
                                    <TypingText
                                        text='console.log(greeting)'
                                        delay={500}
                                        speed={20}
                                        setTypingTextDone={setTypingGreetingDone}
                                        cursor={showCursor}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 md:gap-7">
                                {showSecondCursor && <span className="text-darkest-accent">2</span>}
                                <div className="text-dark-accent">
                                    <TypingText
                                        text='console.log(aboutMe)'
                                        speed={20}
                                        delay={5000}
                                        setTypingTextDone={setTypingAboutDone}
                                        cursor={showSecondCursor}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </div>
                {canStart &&
                    <div className="flex flex-col gap-1 md:gap-5 text-big">
                        {showSecondCursor &&
                            <span>
                            <span className="mr-5">&gt;&gt;</span>
                            <TypingText
                                text='Привет! Рад тебя видеть здесь'
                                delay={1000}
                                speed={20}
                            />
                        </span>
                        }
                        {typingAboutDone &&
                            <span>
                            <span className="mr-5">&gt;&gt;</span>
                            <TypingText
                                text='Создаю интерфейсы, которые хочется трогать глазами 👀'
                                delay={1000}
                                speed={20}
                            />
                        </span>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default WhoAmI;