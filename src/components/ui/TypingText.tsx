'use client'

import React, {useEffect, useState} from 'react';

type Props = {
    text: string,
    speed?: number,
    cursor?: boolean,
    delay?: number,
    setTypingTextDone?: React.Dispatch<React.SetStateAction<boolean>>
}

const TypingText = ({text, speed = 80, cursor = false, delay = 0, setTypingTextDone}: Props) => {
    const [showCursor, setShowCursor] = useState(cursor);
    const [isTypingStart, setIsTypingStart] = useState(false)
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            setTypingTextDone?.(isTypingDone)
        })
        return () => clearTimeout(typingTimeout)
    }, [isTypingDone, setTypingTextDone])

    useEffect(() => {
        let typingDoneTimeout: NodeJS.Timeout;

        const delayTimeout = setTimeout(() => {
            let localIndex = 0;
            setIsTypingStart(true)
            const typingInterval = setInterval(() => {
                setIndex((prev) => prev + 1);
                localIndex++;

                if (localIndex >= text.length) {
                    clearInterval(typingInterval);
                    typingDoneTimeout = setTimeout(() => {
                        setIsTypingDone(true);
                    }, 500)
                }
            }, speed);
        }, delay);

        return () => {clearTimeout(typingDoneTimeout); clearTimeout(delayTimeout)}
    }, [text, speed, delay]);

    useEffect(() => {
        let cursorInterval: NodeJS.Timeout;
        if (!cursor) return;

        if ((!isTypingStart && !isTypingDone) || isTypingDone) {
            cursorInterval = setInterval(() => {
                setShowCursor((v) => !v);
            }, 400);
        } else {
            setShowCursor(true)
        }

        return () => clearInterval(cursorInterval);
    }, [cursor, isTypingStart, isTypingDone]);

    return (
        <span>
            {text.slice(0, index)}
            {cursor && <span className={`${!showCursor && 'invisible'}`}>|</span>}
        </span>
    );
};

export default TypingText;