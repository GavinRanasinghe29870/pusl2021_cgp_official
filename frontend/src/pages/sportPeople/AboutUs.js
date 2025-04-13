import React from "react";

export default function SportsPortal() {
    return (
        <div className="bg-[#D4E4FE] text-[#0D1271] font-sans">
            {/* Header */}
            <div className="relative bg-black text-white">
                <img
                    src="/aboutusCover.png"
                    alt="Sports Equipment"
                    className="mx-auto w-full max-w-6xl h-auto object-cover"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg">
                        Promote the Love for Sports
                    </h1>
                </div> */}
            </div>


            {/* Mission */}
            <section className="bg-[#D4E4FE] px-4 py-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="max-w-4xl mx-auto text-lg">
                    Our mission is to motivate and unify the world of sport by providing in-depth,
                    captivating coverage and creating an environment where athletes, fans, and
                    enthusiasts can express their passion for the sport. We are committed to
                    nurturing the happiness, well-being, and excitement that sports provide,
                    helping both professional athletes and promoting local talent, and creating a
                    welcoming atmosphere that reflects each athlete’s vocation.
                </p>
            </section>

            {/* Vision */}
            <section className="bg-white px-4 py-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="max-w-4xl mx-auto text-lg">
                    To be the premier community-driven sports portal that brings together players
                    and spectators across all backgrounds, providing them with the incentives to
                    succeed, motivation, and expertise. Through outreach to the elite level, we
                    envision a world where sports are widely accessible, acknowledged and promoted
                    fostering an atmosphere of excitement, wellness, and inclusiveness for
                    subsequent generations.
                </p>
            </section>

            {/* Values - vertical bar above header */}
            <section className="bg-[#D4E4FE] px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 text-[#0D1271]">
                    <div className="flex-1 space-y-8">
                        {[{
                            title: "Passion for Sports",
                            desc: "We breathe sports. It runs in our veins and our content aims to ignite that same fire in our audience."
                        }, {
                            title: "Inclusion and Diversity",
                            desc: "We promote a space where every fan, player, and enthusiast feels represented and heard. Diversity is our strength."
                        }, {
                            title: "Integrity and Accuracy",
                            desc: "We are committed to fact-checked, trustworthy, and insightful content that reflects the true essence of sports."
                        }].map((val, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex">
                                    <div className="h-auto w-1 bg-[#F5E12F] mb-3"></div>
                                    <div className="pl-5">
                                        <h3 className="text-xl font-bold mb-1">{val.title}</h3>
                                        <p className="text-base max-w-md">{val.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 space-y-8">
                        {[{
                            title: "Inspiration and Growth",
                            desc: "We motivate every individual to pursue their passion in sports and grow with every experience."
                        }, {
                            title: "Innovation and Creativity",
                            desc: "We are driven by creativity, embracing bold ideas and exploring new ways to make sports engaging for all."
                        }, {
                            title: "Inclusiveness and Outreach",
                            desc: "We believe in reaching out to the wider community to make sports inclusive, exciting, and enriching for everyone."
                        }].map((val, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex">
                                    <div className="h-auto w-1 bg-[#F5E12F] mb-3"></div>
                                    <div className="pl-5">
                                        <h3 className="text-xl font-bold mb-1">{val.title}</h3>
                                        <p className="text-base max-w-md">{val.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* What We Do */}
            <section className="bg-[#FFF6A8] px-4 py-10 text-center">
                <h2 className="text-3xl font-bold mb-4">What we do?</h2>
                <p className="max-w-5xl mx-auto text-lg">
                    All Sport Club Registration, we strive to unite the world of sports. By delivering high-quality,
                    engaging content that keeps our community informed and inspired, we help athletes and fans connect,
                    share, and grow together. We aim to provide platforms where players across all disciplines can promote
                    their stories, get discovered, and receive the recognition they deserve.
                </p>
            </section>

            {/* Team */}
            <section className="bg-[#D4E4FE] px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-8">Team Introduction</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[{
                        name: "Vihanga Dewindi",
                        role: "Planning Leader",
                        image: "/assets/bhan.jpg"
                    }, {
                        name: "Agasthi Imashi",
                        role: "Planning Leader",
                        image: "/assets/agashini.jpg"
                    }, {
                        name: "Gavin Ranasinghe",
                        role: "Testing & Maintenance Leader",
                        image: "/assets/daksh.jpg"
                    }, {
                        name: "Dulith Rajapaksha",
                        role: "Quality Leader",
                        image: "/assets/kavindha.jpg"
                    }, {
                        name: "Kavishka Ihalagama",
                        role: "Programming Leader",
                        image: "/assets/gevin.jpg"
                    }, {
                        name: "Thisuri Gamage",
                        role: "Testing & Management Leader",
                        image: "/assets/thimali.jpg"
                    }, {
                        name: "Uduala Dissanayaka",
                        role: "Quality Leader",
                        image: "/assets/kavindya.jpg"
                    }, {
                        name: "Ishara Sandaruwan",
                        role: "Technical Leader",
                        image: "/assets/suresi.jpg"
                    }, {
                        name: "Sachintha",
                        role: "Programming Leader",
                        image: "/assets/udinu.jpg"
                    },{
                        name: "Sasmini",
                        role: "Technical Leader",
                        image: "/assets/udinu.jpg"
                    }].map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h4 className="text-lg font-semibold">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="bg-black p-[1px]"></div>
        </div>
    );
}
