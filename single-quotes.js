function main() {
  // get gallery links
  let gdt = document.getElementById('gdt');
  // get title
  let docTitle = document.title;
  // empty head
  document.head.innerHTML = '';
  // set title back
  document.title = docTitle;
  // empty body
  let body = document.body;
  body.innerHTML = '';
  // set body style
  body.style.margin = '0px'
  body.style.backgroundColor = 'black'
  // create wrapping div
  let div = document.createElement('div');
  body.appendChild(div)
  div.style.display = 'flex'
  div.style.flexFlow = 'row nowrap'
  div.style.justifyContent = 'left'
  div.style.alignItems = 'center'
  // load all the images
  for (index = 0; index < gdt.children.length - 1; index++) {
    // current element of the gallery
    let child = gdt.children[index];
    // get image page url
    let imagePageUrl = child.children[0].href;
    // for each image page url, do a request to get nl, which is the backup links that work 100%
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // get response text from image page url
        let res = xhr.responseText;
        // now i need the number after nl('
        nl = res.split('nl(\'')[1].split('\')"')[0];
        // get image page nl url
        let imagePageNlUrl = imagePageUrl + '?nl=' + nl;
        // call this nl to get the source of the nl image
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            // get response text from image page nl url
            let res = request.responseText;
            // get image nl source
            let imageSource = res.split('src="')[5].split('"')[0];
            // create image tag and set title of the image from the image url
            let image = document.createElement('img');
            let title = child.children[0].children[0].title;
            // set order number, width and height
            let order = title.split('Page')[1].split(':')[0].trim();
            let width = imageSource.split('-')[2]
            let height = imageSource.split('-')[3]
            // create a div container and set its order number
            let divContainer = document.createElement('div')
            divContainer.id = order
            // set container style
            // because of the 270 degree rotation,
            // width will become height and height will become width
            divContainer.setAttribute('style', 'min-width:'+height+'px;'+'min-height:'+width+'px;')
            // set image style where the rotation occurs
            image.setAttribute('style', 'transform-origin:top left;transform:rotate(270deg) translateX(-100%);height:'+height+'px;width:'+width+'px;')
            // set loading to lazy, and remember to activate this experimental feature in safari
            image.loading = 'lazy';
            // set source
            image.src = imageSource;
            // append image to container div
            divContainer.appendChild(image)
            // append container to wrapping div
            div.appendChild(divContainer);
          }
        };
        request.open('GET', imagePageNlUrl);
        request.send();
      }
    };
    xhr.open('GET', imagePageUrl);
    xhr.send();
  }
  // sort after 0.05, 0.5, 5, 50, 500 seconds
  timeOut(div, 50);
  timeOut(div, 500);
  timeOut(div, 5000);
  timeOut(div, 50000);
  timeOut(div, 500000);
}
function timeOut(div, duration) {
  // activate the function after the duration
  setTimeout(function () {
    sorting(div);
  }, duration);
}
function sorting(div) {
  // get a list of child divs
  let children = div.getElementsByTagName('div');
  let ids = [],
    obj,
    i,
    len;
  // build an array of objects that has both the element
  // and a parsed div number in it so we can sort
  for (i = 0, len = children.length; i < len; i++) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ''), 10);
    ids.push(obj);
  }
  // sort the array
  ids.sort(function (a, b) {
    return a.idNum - b.idNum;
  });
  // append in sorted order
  for (i = 0; i < ids.length; i++) {
    div.appendChild(ids[i].element);
  }
}
main();
