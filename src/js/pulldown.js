import { clamp, fromToBy } from './utils'

let held = false
let startY = -Infinity
let lastY = -Infinity
const nav = document.querySelector('nav')
const navTexts = document.querySelectorAll('nav ul li p')
// We only want the transition when it's let go, this removes it
nav.addEventListener('transitionend', e => {
  nav.style.transition = ''
})

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    entry.target.style.opacity = entry.intersectionRatio
    navTexts.forEach(text =>
      // With a little math, we can stagger the text fade in
      (text.style.opacity = (entry.intersectionRatio - 0.75) * 4)
    )
  }),
  {
    root: null,
    threshold: fromToBy(0, 1, 0.01)
  }
)

observer.observe(nav)

// TODO: Smooth out the navbar movement
document.addEventListener('touchstart', e => {
  held = true
  startY = e.touches[0].clientY
})
document.addEventListener('mousedown', e => {
  held = true
  startY = e.clientY
})
document.addEventListener('touchend', e => {
  held = false;
  if ((lastY - startY) / 3 < 65 / 2) {
    nav.style.transition = '.3s transform'
    nav.style.transform = 'translateY(0)'
  } else {
    nav.style.transition = '.3s transform'
    nav.style.transform = 'translateY(65px)'
  }
  startY = -Infinity
})
document.addEventListener('mouseup', e => {
  held = false
  if ((e.clientY - startY) / 3 < 65 / 2) {
    nav.style.transition = '.3s transform'
    nav.style.transform = 'translateY(0)'
  } else {
    nav.style.transition = '.3s transform'
    nav.style.transform = 'translateY(65px)'
  }
  startY = -Infinity
})
document.addEventListener('touchmove', e => {
  lastY = e.touches[0].clientY
  if (held) {
    nav.style.transform =
      // We divive by 3 so the user will have to move more pixels to get it to show
      `translateY(${clamp((e.touches[0].clientY - startY) / 3, 0, 65)}px)`
  }
})
document.addEventListener('mousemove', e => {
  if (held) {
    nav.style.transform =
      `translateY(${clamp((e.clientY - startY) / 3, 0, 65)}px)`
  }
})
