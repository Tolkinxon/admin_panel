const box = document.querySelector('.box')
const child = document.querySelector('.first')
const li = document.querySelectorAll('li')

let loverScrollTop = 0
box.addEventListener('scroll', () => {

    if(Math.floor(box.scrollTop) === 205) {
        box.scrollTop = 0
    }

    else if(loverScrollTop > box.scrollTop && box.scrollTop === 0) {
        box.scrollTop = 204
    }

    li.forEach(item => {
        item.style.color = 'black'
        item.style.fontSize = '12px'
    })


    li[Math.ceil(box.scrollTop / 20) + 1].style.color = 'red'
    li[Math.ceil(box.scrollTop / 20) + 1].style.fontSize = '18px'

    loverScrollTop = box.scrollTop
})
