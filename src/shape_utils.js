export function getShapeSize(shape) {
    switch(shape.tagName) {
        case "circle":
            return Number(shape.getAttribute("r"))
            break;
        
        case "rect":
            let x = Number(shape.getAttribute("width"))
            let y = Number(shape.getAttribute("height"))


            return x > y ? x / 2 : y / 2
            break;
    }
}

export function getShapeBaseY(shape) {
    switch(shape.tagName) {
        case "circle":
            return shape.getAttribute("cy")
            break;
        
        case "rect":
            return shape.getAttribute("y")
            break;
    }
}

export function getShapeOrigin(shape) {
    switch (shape.tagName) {
        case "circle":
            return {
                x: shape.getAttribute("cx"),
                y: shape.getAttribute("cy")
            }
            break;
        
        case "rect":
            const posX = Number(shape.getAttribute("x"))
            const posY = Number(shape.getAttribute("y"))
            const width = Number(shape.getAttribute("width"))
            const height = Number(shape.getAttribute("height"))

            return {
                x: posX + width/2,
                y: posY + height/2
            }

            break;
    }
}

export function setShapeY(shape, offset) {
        shape.style.transform = `translateY(${offset}px)`
}

export function setShapeTransform(shape, offsetY, scale) {
    shape.style.transform = `translateY(${offsetY}px) scale(${scale})`
}
