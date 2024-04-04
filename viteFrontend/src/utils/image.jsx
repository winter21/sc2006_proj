function getImageURL(name) {
    return new URL(`../../../SwoleMates Server/${name}`, import.meta.url).href
  }
  
  export {getImageURL};