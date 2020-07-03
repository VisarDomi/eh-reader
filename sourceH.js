const IPHONE_WIDTH = 1125;

// get all pages of a gallery
const GALLERY_HREF = window.location.href
let galleryPages = []
galleryPages.push(GALLERY_HREF)
const PAGES_ELEMENT = document?.body?.children[4]?.children[1]?.children[0]?.children[0]?.children;
if (PAGES_ELEMENT!==undefined && PAGES_ELEMENT.length>=4){
  for (let i=1; i<=PAGES_ELEMENT.length - 3; i++){
    galleryPages.push(GALLERY_HREF+"?p="+i)
  }
}

// next, with XHR, get all links and put them in an array
let thumbnailPages = []
let xhr1 = new XMLHttpRequest();
xhr1.open("GET", )

