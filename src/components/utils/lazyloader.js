const lazyloader = (entries, observer) => {
  entries.forEach(({isIntersecting, target}) => {
    if (isIntersecting) {
      if (target.dataset.src) {
        target.src = target.dataset.src

        target.addEventListener('load', () => {
          target.style.opacity = 1
        })
      }

      if (target.dataset.srcset) target.srcset = target.dataset.srcset

    	for (const child of target.children) {
        if (child.dataset.src) {
          child.src = child.dataset.src

          child.addEventListener('load', () => {
            child.style.opacity = 1
          })
        }

        if (child.dataset.srcset) child.srcset = child.dataset.srcset
      }

      observer.unobserve(target)
    }
  })
}

export default lazyloader
