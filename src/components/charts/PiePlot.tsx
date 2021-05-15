import React, { useEffect } from "react"
import { Pie } from "@antv/g2plot"

/**
 * 交互饼图
 * https://antv-g2plot.gitee.io/zh/examples/pie/basic#legend-interaction
 */
const PiePlot = (data: any) => {
    useEffect(() => {
        const piePlot = new Pie("pie-chart-container", {
            appendPadding: 10,
            data,
            angleField: "value",
            colorField: "type",
            radius: 0.8,
            label: {
                type: "outer",
                content: "{name} {percentage}",
            },
            interactions: [
                { type: "pie-legend-active" },
                { type: "element-active" },
            ],
        })

        piePlot.update({
            theme: {
                styleSheet: {
                    brandColor: "#5B8FF9",
                    paletteQualitative10: [
                        "#5B8FF9",
                        "#61DDAA",
                        "#65789B",
                        "#F6BD16",
                        "#7262fd",
                        "#78D3F8",
                        "#9661BC",
                        "#F6903D",
                        "#008685",
                        "#F08BB4",
                    ],
                    paletteQualitative20: [
                        "#5B8FF9",
                        "#CDDDFD",
                        "#61DDAA",
                        "#CDF3E4",
                        "#65789B",
                        "#CED4DE",
                        "#F6BD16",
                        "#FCEBB9",
                        "#7262fd",
                        "#D3CEFD",
                        "#78D3F8",
                        "#D3EEF9",
                        "#9661BC",
                        "#DECFEA",
                        "#F6903D",
                        "#FFE0C7",
                        "#008685",
                        "#BBDEDE",
                        "#F08BB4",
                        "#FFE0ED",
                    ],
                },
            },
        })
        piePlot.render()
    })
    return <div id="pie-chart-container"></div>
}

export default PiePlot
