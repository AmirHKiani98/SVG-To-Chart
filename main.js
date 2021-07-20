path = $("path");
sum = 0;
for (state in data) {
    sum += data[state];
}
normaledData = {};
for (state in data) {
    normaledData[state] = ((data[state]) / (sum));
}
for (state in normaledData) {
    $(`path[title='${state}']`).css("fill", `hsl(${normaledData[state] * 240}, 100%, 50%)`);
}

function makeSVG(tag, attrs, styles = null) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        if (k == "alignmentBaseline") {
            el.setAttribute('alignment-baseline', attrs[k]);
        } else {
            el.setAttribute(k, attrs[k]);
        }
    if (styles !== null) {
        // styleText = "";
        // for (style in styles) {
        //     styleText += style + "=" + styles[style] + ";";
        // }
        el.setAttribute("style", styles);
    }
    return el;
}

function makeColor(value) {
    return `hsl(${value*240}, 100%, 50%)`;
}

heatmapContainer = $("#heatmap-legend");
whole = 100;
for (let i = 0; i <= whole; i++) {
    colorValue = i / whole
    color = makeColor(colorValue);
    if (i % 10 == 0) {
        numberGuide = makeSVG("text", { x: 0, y: i * 5, fill: "black", alignmentBaseline: "middle" });
        if (i == 0) {

            text = document.createTextNode(((i / whole) * sum) + " (میلیون ریال)");
        } else {

            text = document.createTextNode((i / whole) * sum);
        }
        numberGuide.appendChild(text);
        heatmapContainer.append(numberGuide);
    }
    line = makeSVG("line", { x1: 100, x2: 150, y1: i * 5, y2: i * 5 }, `stroke:${color};stroke-width:5`);
    heatmapContainer.append(line);
}
// console.log(normaledData);