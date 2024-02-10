const TooltipDinamicos = (e, ancho, alto, type, texto) => {
    const objeto = []
    const text = texto
    const mouseX = e.clientX
    const mouseY = e.clientY
    const width = ancho
    const heigth = alto
    const tipo = type
    objeto.push({
        text,
        mouseX,
        mouseY,
        width,
        heigth,
        tipo
    })
    return objeto
}

export default TooltipDinamicos