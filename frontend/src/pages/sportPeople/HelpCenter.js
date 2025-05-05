import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useAuthStore } from "../../store/useAuthStore";

export default function HelpCenterPage() {
    const [message, setMessage] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const { user } = useAuthStore();

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How to reset my password?",
            answer: "If you have forgotten your password, go to the login page, click 'Forgot Password', and follow the instructions. You will receive an email to reset your password."
        },
        {
            question: "How to update my profile information?",
            answer: "Navigate to your account settings, click on 'Profile', and update your information. Remember to save changes before leaving the page."
        },
        {
            question: "Why is the website running slow?",
            answer: "Sometimes high traffic or maintenance can slow down the website. Please clear your browser cache and try again. If the issue persists, contact support."
        },
        {
            question: "How can I view my invoices?",
            answer: "Go to the billing section in your account dashboard, where all your past invoices and payment history are available for download."
        },
        {
            question: "How to request a refund?",
            answer: "Visit the billing section, click 'Request Refund' for the relevant payment, fill out the form, and submit. Our team will process your request within 5-7 business days."
        }
    ];
    async function submitHelp(e) {
        e.preventDefault();
        try {
            const templateParams = {
                from_user: user.username,
                message: message,
            };
    
            await emailjs.send(
                "service_0rfopse",      
                "template_jv43kbv",     
                templateParams,
                "kVB0utlxfeysWQyzE"     
            );
    
            console.log("Help request email sent successfully");
            alert("Your message has been sent!");
            setMessage(""); 
        } catch (error) {
            console.error("Error sending email", error);
            alert("There was an error sending your message. Please try again.");
        }
    }
    

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1>{user.username}</h1>
            <h2 className="text-2xl text-center font-bold mb-6">How Can We Help You?</h2>

            <div className="w-full p-4">
                <div className="bg-primary-light shadow rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-secondary-light shadow rounded-lg p-4">
                                <button
                                    className="w-full text-left flex justify-between items-center text-lg font-semibold focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    <span>{openIndex === index ? "▲" : "▼"}</span>
                                </button>

                                {openIndex === index && (
                                    <p className="mt-4 text-gray-700 text-sm md:text-base">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={submitHelp} className="bg-primary-light shadow rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-center">Still Need Help? Send Us a Message</h3>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="bg-secondary-light w-full h-32 p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-[200px] flex justify-center items-center bg-white text-primary border-2 border-secondary py-3 rounded-lg hover:bg-primary group"
                        >
                            <span className="group-hover:text-white transition-colors duration-300">
                                Submit Help Request
                            </span>
                            <img
                                src="/send-svgrepo-com.svg"
                                alt="submitImg"
                                className="ml-2 w-[30px] h-[30px] transition-colors duration-300 group-hover:invert group-hover:brightness-0"
                            />
                        </button>
                    </div>

                </form>

                <div className="mt-4 bg-blue-100 p-4 rounded-lg grid md:grid-cols-3 gap-4 text-center">
                    <div>
                        <strong>Phone:</strong> 076 34567849
                    </div>
                    <div>
                        <strong>Location:</strong> HQ, Homagama, Colombo
                    </div>
                    <div>
                        <strong>Email:</strong> support@support.com
                    </div>
                </div>
            </div>
        </div>
    );
}


