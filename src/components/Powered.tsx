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
        logo: "/imgs/windi.svg",
        name: "Windicss",
    },
    {
        logo: "/imgs/rollup.png",
        name: "Rollup",
    },
]

const Powered = () => (
    <div className="flex w-full flex-col justify-center items-center px-5 mt-25">
        <h2 className="font-bold">Powered By</h2>
        <ul className="flex flex-row justify-center items-center">
            {PoweredBy.map((item) => (
                <li
                    key={item.name}
                    className="flex flex-col justify-center items-center w-auto m-5"
                >
                    <img
                        src={item.logo}
                        alt={item.name}
                        width="100"
                        height="100"
                    />
                    <div className="mt-4">{item.name}</div>
                </li>
            ))}
        </ul>
    </div>
)

export default Powered
