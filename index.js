const box = document.querySelector('.box')
const child = document.querySelector('.first')
const li = document.querySelectorAll('li')

// let i = 0
// let j = 0

// let prevValueOfScroll = 0

// box2.addEventListener('scroll', (evt) => {

//     console.log(box2.scrollTop);

//     if(prevValueOfScroll >= box2.scrollTop) {
//         prevValueOfScroll = box2.scrollTop
//         i += 0.1
//     }
//     else {
//         prevValueOfScroll = box2.scrollTop
//         i -= 0.1
//     }

    


//     j = i
//     li.forEach((item) => {
//         item.style.top = j * 20 + 'px'
//         j++

//         // console.log(j);
//     })
//     j = 0
// })


// li.forEach((item) => {
//     item.style.top = j * 20 + 'px'
//     j++

// })


box.addEventListener('scroll', () => {
    // console.log(box.scrollTop);

    li.forEach(item => item.style.backgroundColor = 'white')


    li[Math.ceil(box.scrollTop / 20)  + 1].style.backgroundColor = 'red'

    // console.log(Math.ceil(box.scrollTop / 20)  + 1);


})
