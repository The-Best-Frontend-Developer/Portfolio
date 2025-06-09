import React, { useEffect, useState } from 'react';

const SpiralBackground = ({ onHighlight }: { onHighlight: React.Dispatch<React.SetStateAction<number>> }) => {
    const [order, setOrder] = useState<number[]>([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const generateInitialOrder = () => {
            const rest = [...Array(9).keys()].filter(i => i !== 4).sort(() => Math.random() - 0.5);
            return [4, ...rest];
        };
        setOrder(generateInitialOrder());
    }, []);

    useEffect(() => {
        if (order.length === 0) return;

        const interval = setInterval(() => {
            setStep((prev) => {
                const next = prev + 1;

                if (next >= 9) {
                    const reshuffled = [...Array(9).keys()].sort(() => Math.random() - 0.5);
                    setOrder(reshuffled);
                    return 0;
                }

                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [order]);

    useEffect(() => {
        if (order.length > 0) {
            onHighlight(order[step]);
        }
    }, [step, order, onHighlight]);

    return (
        <div className="lg:hidden grid grid-cols-3 grid-rows-3 gap-0.5 absolute inset-0 top-2 bottom-2 md:top-4 md:bottom-4 z-0 pointer-events-none">
            {Array.from({ length: 9 }, (_, i) => (
                <div
                    key={i}
                    className={`w-full h-full transition-colors duration-300 ${
                        i === order[step] ? 'bg-darkest-accent' : 'bg-light-background'
                    }`}
                />
            ))}
        </div>
    );
};

export default SpiralBackground;
