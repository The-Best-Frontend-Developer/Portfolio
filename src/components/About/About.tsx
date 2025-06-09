'use client'

import React, {useEffect, useState} from 'react';
import ElectricityAnimation from "@/components/About/ElectricityAnimation/ElectricityAnimation";
import TagWrapper from "@/components/ui/TagWrapper";
import Technology from "@/components/About/Technology";

import html from './images/html.png';
import css from './images/css.png';
import javascript from './images/javascript.png';
import typescript from './images/typescript.png';
import react from './images/react.png';
import next from './images/next.png';
import redux from './images/redux.png';
import scss from './images/scss.png';
import tailwind from './images/tailwind.png';
import {StaticImageData} from "next/image";
import SpiralBackground from "@/components/About/SpiralBackground/SpiralBackground";

type TechnologyType = {
    id: number;
    name: string;
    size: 'small' | 'big';
    src: StaticImageData;
};

const baseTechnologies: TechnologyType[] = [
    {id: 1, name: 'HTML', size: 'big', src: html},
    {id: 2, name: 'CSS', size: 'big', src: css},
    {id: 3, name: 'JavaScript', size: 'big', src: javascript},
    {id: 4, name: 'TypeScript', size: 'big', src: typescript},
    {id: 5, name: 'React js', size: 'big', src: react},
    {id: 6, name: 'Next js', size: 'big', src: next},
    {id: 7, name: 'Redux', size: 'small', src: redux},
    {id: 8, name: 'SCSS', size: 'small', src: scss},
    {id: 9, name: 'Tailwind', size: 'small', src: tailwind},
];

const About = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(4)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const displayedTechnologies: TechnologyType[] = isMobile
        ? baseTechnologies.map(el => ({...el, size: 'big'}))
        : baseTechnologies;

    const bigTech = displayedTechnologies.filter(el => el.size === 'big');
    const smallTech = displayedTechnologies.filter(el => el.size === 'small');

    return (
        <div className="flex flex-col gap-0" id='aboutMe'>
            <TagWrapper tag='h2' direction="row">
                <h2>Кто я?</h2>
            </TagWrapper>
            <div className="w-[min(90%,_1000px)]">
                <TagWrapper tag="p" direction="col">
                    <p>
                        Меня зовут Кирилл, я фронтенд-разработчик, увлечённый созданием удобных и эстетичных
                        интерфейсов.
                        Работаю с HTML, CSS, TypeScript, React, Tailwind и Redux.
                        Понимаю, как устроена верстка под любые устройства, уверенно использую Figma и Git.
                        Постоянно развиваюсь — изучаю архитектуру, паттерны и делаю акцент на чистом, масштабируемом
                        коде.
                        Всегда рад новым вызовам и возможностям, где можно вырасти и сделать что-то по-настоящему
                        ценное.
                    </p>
                </TagWrapper>
            </div>

            <div className="flex relative flex-col items-center gap-4 lg:gap-2 py-3 md:py-7 lg:py-13">
                {isMobile ?
                    <SpiralBackground onHighlight={setHighlightedIndex}/>
                    :
                    <ElectricityAnimation/>
                }
                <div className={`
                    w-full 
                    grid grid-cols-3 place-items-center
                    gap-4 sm:gap-6 p-2 sm:p-3 lg:p-0 
                    lg:flex lg:flex-row lg:justify-center lg:gap-10`}
                >
                    {bigTech.map(el => (
                        <Technology key={el.id} technology={el} highlighted={isMobile ? highlightedIndex : undefined}/>
                    ))}
                </div>

                {!isMobile && (
                    <div className="flex gap-5 sm:gap-10 lg:gap-20">
                        {smallTech.map(el => (
                            <Technology key={el.id} technology={el}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
