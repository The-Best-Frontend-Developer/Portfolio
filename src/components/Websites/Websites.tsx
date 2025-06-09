'use client'

import React, {useEffect, useMemo, useState} from 'react';
import Image, {StaticImageData} from "next/image";

import todoListImg from './todo-list.png';
import neumorphismImg from './neumorphism.png';
import rotatingCubeImg from './rotating-cube.png';
import neuromintStoreImg from './neuromint-store.png';

type WebsiteCard = {
    id: number,
    name: string,
    description: string,
    time: string,
    img: StaticImageData,
    technologies: string[],
    difficulty: number,
    url: string
}

const Websites = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFading, setIsFading] = useState(false)

    const websiteCards: WebsiteCard[] = useMemo(() => [
        {
            id: 1,
            name: 'Список дел',
            description: 'Многостраничный сайт на React с управлением задачами, drag-and-drop на dnd-kit и хранением состояния через Redux Toolkit.',
            time: '1 месяц',
            img: todoListImg,
            technologies: ['TypeScript', 'React', 'dnd-kit', 'Redux Toolkit'],
            difficulty: 4,
            url: 'https://tod0shka.vercel.app'
        },
        {
            id: 2,
            name: 'Неоморфизм',
            description: 'Одностраничный сайт с чистым HTML, CSS и JavaScript, выполненный в стиле неоморфизма — плавные тени и объёмы.',
            time: '3 недели',
            img: neumorphismImg,
            technologies: ['HTML', 'CSS', 'JavaScript'],
            difficulty: 2,
            url: 'https://the-best-frontend-developer.github.io/Neumorphism'
        },
        {
            id: 3,
            name: 'Вращающийся куб',
            description: 'Одностраничный React сайт с анимацией вращающегося куба, стилизация через SCSS.',
            time: '2 недели',
            img: rotatingCubeImg,
            technologies: ['React', 'SCSS'],
            difficulty: 3,
            url: 'https://the-best-frontend-developer.github.io/Cube'
        },
        {
            id: 4,
            name: 'Neuromint',
            description: 'Одностраничный React сайт для магазина мятных жвачек с простым интерфейсом, сверстанный с макета.',
            time: '2 дня',
            img: neuromintStoreImg,
            technologies: ['React'],
            difficulty: 1,
            url: 'https://neuromint2010.vercel.app'
        }
    ], []);

    function toSlide(index: number) {
        setIsFading(true)

        setTimeout(() => {
            setIsFading(false)
            if (index > websiteCards.length - 1) {
                setCurrentIndex(0)
            } else if (index < 0) {
                setCurrentIndex(websiteCards.length - 1)
            } else {
                setCurrentIndex(index)
            }
        }, 200)
    }

    function nextSlide() {
        toSlide(currentIndex + 1)
    }

    function previousSlide() {
        toSlide(currentIndex - 1)
    }

    const [currentWebsite, setCurrentWebsite] = useState(websiteCards[currentIndex])

    useEffect(() => {
        setCurrentWebsite(websiteCards[currentIndex])
    }, [currentIndex, websiteCards])

    return (
        <div className="py-5" id="sites">
            <div
                 className="flex justify-between w-full rounded-big p-2 flex-col-reverse items-center lg:items-start lg:flex-row lg:h-[450px] bg-light-background">
                <div className="flex flex-col h-full justify-between lg:py-2 px-5 gap-2 min-h-[270px] w-full">
                    <div className={`flex flex-col gap-1 duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        <h2 className="self-center !text-headline mb-1">{currentWebsite.name}</h2>
                        <p className="sm:max-w-[60%] lg:max-w-full">Описание: {currentWebsite.description}</p>
                        <p>
                            Стек:&nbsp;
                            {currentWebsite.technologies.map((el, i) =>
                                i === currentWebsite.technologies.length - 1 ? (
                                    <span key={i}>{el}</span>
                                ) : (
                                    <span key={i}>{el}, </span>
                                )
                            )}
                        </p>
                        <p>Срок: {currentWebsite.time}</p>
                        <div className="flex gap-1">
                            <p>Уровень сложности:&nbsp;</p>
                            <div className="flex gap-1 items-center">
                                {[1, 2, 3, 4, 5].map(el =>
                                    <svg className="w-5 h-5"
                                         style={{fill: el <= currentWebsite.difficulty ? '#fcf403' : ''}} key={el}
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="currentColor" stroke="none" strokeWidth="1" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <a href={currentWebsite.url}
                           className="text-blue-400 hover:text-blue-600 text-normal duration-200">{currentWebsite.url.slice(8)}</a>
                    </div>
                    <div className="flex justify-between text-mini md:text-normal w-[80%] lg:w-full self-center">
                        <button
                            className={`flex items-center mr-auto text-accent cursor-pointer`}
                            onClick={previousSlide}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path
                                    d="M6 8L2 12L6 16"/>
                                <path d="M2 12H22"/>
                            </svg>
                            &nbsp;Предыдущий
                        </button>
                        <button
                            className={`flex items-center ml-auto text-accent cursor-pointer`}
                            onClick={nextSlide}>Следующий&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M18 8L22 12L18 16"/>
                                <path d="M2 12H22"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className={`overflow-x-hidden w-full h-full sm:w-[90%] md:w-[80%] py-2 lg:w-[60%] flex items-center shrink-0`}>
                    <div
                        className={`px-2 lg:px-5 flex gap-4 lg:gap-10 justify-start duration-500 w-full`}
                        style={{
                            transform: `translateX(-${100 * currentIndex}%)`,
                        }}
                    >
                        {websiteCards.map((el, i) => (
                            <div
                                key={el.id}
                                className="w-full shrink-0 rounded-mini overflow-hidden neoMiniShadow"
                            >
                                <a href={currentWebsite.url} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        width={800}
                                        height={350}
                                        src={websiteCards[i].img}
                                        alt={el.name}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Websites;