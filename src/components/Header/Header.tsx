import React from 'react';

const Header = () => {
    return (
        <div className="flex justify-between px-2 sm:px-5 md:px-12 py-2 items-center bottom-shadow bg-light-background">
            <h2 className="!text-[16px] md:!text-[24px] lg:!text-[32px]">Frontend разработчик</h2>
            <ul className="flex gap-3 sm:gap-5 md:gap-12 items-center text-[12px] sm:text-normal">
                <li><a href="#aboutMe">О себе</a></li>
                <li><a href="#sites">Сайты</a></li>
                <li><a href="#talkToMe">Связаться со мной</a></li>
            </ul>
        </div>
    );
};

export default Header;