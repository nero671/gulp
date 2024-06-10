export const tabs = (linkWrapper, link, content) => {
  const toggleTab = (index, link) => {
    for(let i = 0; i < content.length; i++) {
      if (index === i) {
        link[i].classList.add('show');
        content[i].classList.add('active');
      } else {
        link[i].classList.remove('show');
        content[i].classList.remove('active');
      }
    }
  }

  if(linkWrapper) {
    linkWrapper.addEventListener('click', (e) => {
      let target = e.target;
      console.log(target)
      const linkClass = '.' + link[1].classList[0];
      console.log(linkClass)
      if (target.matches(linkClass)) {
        link.forEach((item, i) => {
          if (item === target) {
            toggleTab(i, link);
          }
        })
      }
    })
  }


}
