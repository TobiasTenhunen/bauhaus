export function normalize(value, min, max) {
    return (value - min) / (max - min)
}

export function lerp(normalizedValue, min, max) {
    let clampedNormal = clamp(normalizedValue, 0, 1)
    return min + clampedNormal * (max - min)
}

// Voor nu alleen gebruikt in deze file.
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}
