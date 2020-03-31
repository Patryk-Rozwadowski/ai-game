export const showElement = elements => {
  for(let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('el-hide');
    elements[i].classList.add('el-show');
  }
  return hideElements => {
    for(let i = 0; i < hideElements.length; i++) {
      hideElements[i].classList.remove('el-show');
      hideElements[i].classList.add('el-hide');
    }
  }
};