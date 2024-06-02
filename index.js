const box = document.querySelector('.box')
const child = document.querySelector('.first')
const li = document.querySelectorAll('li')

let i = 0
let j = 0

box.addEventListener('wheel', (evt) => {
    i--
    console.log(j);

    j = i
    li.forEach((item) => {
        item.style.top = j * 20 + 'px'
        j++

        console.log(j * 20 + 'px');
    })
})


li.forEach((item) => {
    item.style.top = j * 20 + 'px'
    j++

    console.log(j * 20 + 'px');
})

