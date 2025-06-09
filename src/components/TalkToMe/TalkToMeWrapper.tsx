'use client';

import React from 'react';
import TalkToMe from "@/components/TalkToMe/TalkToMe";
import {talkToMeItems} from "@/components/TalkToMe/TalkToMeItem";

const TalkToMeList = () => {
    return (
        <div className="flex justify-center flex-wrap gap-10 py-10" id="talkToMe">
            {talkToMeItems.map((item, idx) => (
                <TalkToMe key={idx} item={item} />
            ))}
        </div>
    );
};

export default TalkToMeList;