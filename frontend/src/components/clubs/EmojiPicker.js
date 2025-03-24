import React, { useEffect, useRef, useState } from "react";
import EmojiMartPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";
import { useAutoAnimate } from '@formkit/auto-animate/react';

const EmojiPicker = ({ onEmojiSelect }) => {
    const [pickerOpen, setPickerOpen] = useState(false);
    const pickerRef = useRef(null);
    const buttonRef = useRef(null);
    const [animationParent] = useAutoAnimate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setPickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTrigger = (e) => {
        e.preventDefault();
        setPickerOpen((prev) => !prev);
    };

    return (
        <div className="relative flex" ref={animationParent}>
            <button ref={buttonRef} onClick={handleTrigger}>
                <Smile size={20} className="text-body" />
            </button>

            {pickerOpen && (
                <div ref={pickerRef} className="absolute z-40 bottom-full mb-6">
                    <EmojiMartPicker
                        data={data}
                        onEmojiSelect={onEmojiSelect}
                        theme="light"
                        previewPosition="none"
                        perLine={7}
                        emojiSize={18}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;