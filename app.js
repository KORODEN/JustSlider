const root = document.querySelector('#root')
const sliderImages = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
]

createSlider(root, sliderImages)

function createSlider(root, sliderImages) {
    function createCustomElement(root, tagName, className) {
        const elem = document.createElement(tagName)
        elem.classList.add(className)
        root.append(elem)

        return elem
    }

    const imageIndex = Math.floor(sliderImages.length / 2)
    const imageBlocks = []
    const indicatorPoints = []
    let pointIndex = imageIndex

    const slider = createCustomElement(root, 'div', 'slider')
    const controls = createCustomElement(slider, 'div', 'controls')
    const leftBtn = createCustomElement(controls, 'div', 'leftBtn')
    const rightBtn = createCustomElement(controls, 'div', 'rightBtn')
    const indicators = createCustomElement(controls, 'div', 'indicators')

    sliderImages.forEach((item, index) => {
        const image = document.createElement('img')
        image.src = item
        image.style.left = -(imageIndex - index) * window.innerWidth + 'px'
        slider.append(image)
        imageBlocks.push(image)

        const indicator = createCustomElement(indicators, 'div', 'indicator')
        indicatorPoints.push(indicator)
    })

    indicatorPoints[pointIndex].classList.add('active')

    const autoSlider = setInterval(() => {
        rightButtonTrigger()
    }, 2000)

    leftBtn.addEventListener('click', () => {
        clearInterval(autoSlider)
        const newImageBlock = imageBlocks[imageBlocks.length - 1]

        imageBlocks.splice(imageBlocks.length - 1, 1)
        imageBlocks.unshift(newImageBlock)
        controls.insertAdjacentElement('afterend', newImageBlock)

        pointIndexUpdate('-')
        swipeImages()
    })

    rightBtn.addEventListener('click', () => {
        clearInterval(autoSlider)
        rightButtonTrigger()
    })

    function rightButtonTrigger() {
        const newImageBlock = imageBlocks[0]

        imageBlocks.splice(0, 1)
        imageBlocks.push(newImageBlock)
        slider.append(newImageBlock)

        pointIndexUpdate()
        swipeImages()
    }

    function pointIndexUpdate(mark = '+') {
        if (mark === '+') {
            pointIndex++
            if (pointIndex === sliderImages.length) {
                pointIndex = 0
            }
        } else {
            pointIndex--
            if (pointIndex === -1) {
                pointIndex = sliderImages.length - 1
            }
        }
    }

    function swipeImages() {
        imageBlocks[0].style.display = 'none'
        imageBlocks[imageBlocks.length - 1].style.display = 'none'

        indicatorPoints.forEach(item => {
            item.classList.remove('active')
        })

        indicatorPoints[pointIndex].classList.add('active')

        imageBlocks.forEach((item, index) => {
            item.style.left = -(imageIndex - index) * window.innerWidth + 'px'
            item.style.display = 'inline-block'
        })
    }
}
