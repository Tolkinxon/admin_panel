const box2 = document.querySelector('.box2')
const child = document.querySelector('.first')
const li = document.querySelectorAll('li')

let i = 0
let j = 0

let prevValueOfScroll = 0

box2.addEventListener('scroll', (evt) => {
    console.log(box2.scrollTop);

    if(prevValueOfScroll >= box2.scrollTop) {
        prevValueOfScroll = box2.scrollTop
        i += 0.1
    }
    else {
        prevValueOfScroll = box2.scrollTop
        i -= 0.1
    }
    


    j += i
    li.forEach((item) => {
        item.style.top = j * 20 + 'px'
        j++

        // console.log(j);
    })
    j = 0
})


li.forEach((item) => {
    item.style.top = j * 20 + 'px'
    j++

})

