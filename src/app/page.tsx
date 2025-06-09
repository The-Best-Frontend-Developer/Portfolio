import React from 'react';
import Header from "@/components/Header/Header";
import WhoAmI from "@/components/WhoAmI/WhoAmI";
import About from "@/components/About/About";
import Websites from "@/components/Websites/Websites";

const Page = () => {
    return (
        <div className="font-marck text-headline">
            <Header/>
            <div className="px-[clamp(0.9375rem,_-0.3783rem_+_7.0175vw,_5.9375rem)] mx-auto max-w-[1440px]">
                <WhoAmI/>
                <About/>
                <Websites/>
            </div>
        </div>
    );
};

export default Page;