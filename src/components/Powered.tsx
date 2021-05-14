import React from "react"

const PoweredBy = [
    {
        logo: "/imgs/vite.svg",
        name: "Vite",
    },
    {
        logo: "/imgs/react.svg",
        name: "React",
    },
    {
        logo: "/imgs/tailwindcss.png",
        name: "Tailwindcss",
    },
    {
        logo: "/imgs/rollup.png",
        name: "Rollup",
    },
    {
        logo: "/imgs/postcss.png",
        name: "Postcss",
    },
]

const Powered = () => (
    <div className="w-full flex-col justify-center items-center px-5">
        <h2>Powered By</h2>
        <ul className="flex-row justify-center items-center">
            {PoweredBy.map((item) => (
                <li
                    key={item.name}
                    className="flex-col justify-center items-center w-auto"
                >
                    <img
                        src={item.logo}
                        alt={item.name}
                        width="100"
                        height="100"
                    />
                    <div className="w-24">{item.name}</div>
                </li>
            ))}
        </ul>
    </div>
)

export default Powered
