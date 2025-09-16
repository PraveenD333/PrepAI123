import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../../Pages/InterviewPrep/Components/AIResponsePreview';

const QuestionsCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 10);
        } else {
            setHeight(0);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return <>
        <div className={`bg-black rounded-lg mb-4 overflow-hidden py-4 px-5 group border
            ${isPinned ? 'border-purple-600': 'border-gray-950'}`}>
            <div className='flex items-start justify-between cursor-pointer'>
                <div className='flex items-start gap-3.5'>
                    <span className='text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]'>
                        Q
                    </span>
                    <h3
                        className='text-xs md:text-[14px] font-medium text-white mr-0 md:mr-20'
                        onClick={toggleExpand}>
                        {question}
                    </h3>
                </div>
                <div className='flex items-center justify-end ml-4 relative'>
                    <div className={`flex ${isExpanded ? "md:flex" : "md:hidden group-hover:flex"}`}>
                        {/* Pin Button */}
                        <button className='flex items-center gap-1 text-xs text-white font-medium bg-black px-2.5 py-1 rounded border border-white mr-2 cursor-pointer'
                            onClick={onTogglePin}>
                            {isPinned ? (
                                <LuPinOff size={14} />
                            ) : (
                                <LuPin size={14} />
                            )}
                        </button>

                        {/* Learn More Button with gradient border */}
                        <div className="p-[1.5px] rounded bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mr-2">
                            <button className='flex items-center gap-1 text-xs text-white font-medium bg-black px-3 py-1 rounded cursor-pointer'
                                onClick={() => {
                                    setIsExpanded(true);
                                    onLearnMore();
                                }}>
                                <LuSparkles size={14} />
                                <span className='hidden md:block'>Learn More</span>
                            </button>
                        </div>
                    </div>

                    {/* Expand/Collapse Toggle */}
                    <button
                        className='text-gray-400 hover:text-gray-500 cursor-pointer'
                        onClick={toggleExpand}>
                        <LuChevronDown size={20}
                            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

            </div>
            <div className='overflow-hidden transition-all bg-black duration-300 ease-in-out'
                //    style={{maxWidth:`${height}px`}}>
                style={{ maxHeight: isExpanded ? `${height}px` : '0px' }}>

                <div className='mt-4 text-white bg-black px-5 py-3 rounded-lg' ref={contentRef}>
                    <AIResponsePreview content={answer} />
                </div>
            </div>
        </div>
    </>
}

export default QuestionsCard