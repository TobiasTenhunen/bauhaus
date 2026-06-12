import { normalize, lerp, clamp } from "./math.js"
import * as ShapeUtils from "./shape_utils.js"

const onMobile = window.innerWidth < 450
const headerBlock = document.getElementById("header-block")
const testCircle = document.getElementById("test-circle")
const maxBlurShapeSize = 200
const minBlurShapeSize = 4
const maxBlurAmount = onMobile ? 0 : 1.1//px
const shapePopupSpeedMultiplier = 0.6
const shapePopupHeight = 300
const shapes = []


function init() {
    initShapes()
    initTextObserver()
}

function initShapes() {
    let htmlShapes = document.getElementById("shapes").children
    Array.from(htmlShapes).forEach(shape => {
        let shapeInfo = {
            shape: shape,
            size: ShapeUtils.getShapeSize(shape),
            y: ShapeUtils.getShapeBaseY(shape)}

        shapes.push(shapeInfo)
        ShapeUtils.setShapeTransform(shape, 0, 0)
        console.log(shapeInfo.shape.tagName, shapeInfo.size)

        const originPoint = ShapeUtils.getShapeOrigin(shape)
        shape.style.transformOrigin = `${originPoint.x}px ${originPoint.y}px`

        let normalizedBlur = normalize(shapeInfo.size, maxBlurShapeSize, minBlurShapeSize)
        let blurAmount = lerp(normalizedBlur, 0, maxBlurAmount)
        shape.style.filter = `blur(${blurAmount}px)`
    })
    
    document.getElementById("shapes").style.display = "block"
}

function initTextObserver() {
    let bodyText = document.getElementById("body-text")
    const observerOptions = {
        threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            bodyText.classList.add("activated")
            return
        }
        bodyText.classList.remove("activated")
    }, observerOptions)
    observer.observe(bodyText)
}

function applyScrollEffects() {
    shapes.forEach(shapeObject => {
        const newSize = clamp(
            (window.scrollY - shapePopupHeight) * shapePopupSpeedMultiplier,
            0,
            shapeObject.size
        )

        const scale = newSize / shapeObject.size

        ShapeUtils.setShapeTransform(
            shapeObject.shape,
            (-window.scrollY * (shapeObject.size / 300)),
            scale
        )
    })
}


let ticking = false
window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            applyScrollEffects()
            ticking = false
        })
        ticking = true
    }
})
document.addEventListener("DOMContentLoaded", init)
