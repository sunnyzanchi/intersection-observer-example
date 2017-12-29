import { fromToBy } from './utils'

const sections = document.querySelectorAll('section')

const observer = new IntersectionObserver(
  /* `entries` is an array of all the thresholds we've crossed
   * on any elements we'll observer.observe() later.
   * So one element is big and taking up the whole viewport, we'll only get
   * one entry. If there are several small elements all visible in the viewport,
   * we'll get an entry for each one.
   */
  entries => entries.forEach(entry =>
    // * 2 so it'll be totally opaque with only 50% of the element showing
    (entry.target.style.opacity = entry.intersectionRatio * 2)
  ), {
    // null means to watch for intersection with the viewport
    root: null,
    // This will cause it to trigger with every 1% change
    threshold: fromToBy(0, 1, 0.01)
  })

// Start that ish 😩👌💯🔥
sections.forEach(section => observer.observe(section))
