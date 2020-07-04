// the main function that will be executed by the script
function main() {
  // get page from which to begin
  const BEGINNING_PAGE_NUMBER = prompt("Begin:", "1");
  if (BEGINNING_PAGE_NUMBER !== null && BEGINNING_PAGE_NUMBER !== "") {
    // settings
    const HORIZONTAL = true;
    const IPHONE_WIDTH = 1125;

    // code
    // save the GDT element which has all (max 200) links of the gallery
    const GDT = document.getElementById("gdt");
    // save the title
    const DOC_TITLE = document.title;
    // empty the head
    document.head.innerHTML = "";
    // set the title
    document.title = DOC_TITLE;
    // save the body
    let body = document.body;
    // empty the body
    body.innerHTML = "";
    // set margin to 0 and background-color to black
    body.style.margin = "0px";
    body.style.backgroundColor = "#000000";
    // initialize the loaded images counter - for the horizontal viewer
    let loadedImages = BEGINNING_PAGE_NUMBER - 1;
    // last div does not contain an image, so that's why the total number of images is (length-1)
    const NUMBER_OF_IMAGES = GDT.children.length - 1;
    // loop through the children elements of GDT
    for (const CHILD of GDT.children) {
      // except for element with class "c"
      if (CHILD.classList.value !== "c") {
        // get image name from the nested element - large thumbnails view  on gallery only
        const IMAGE_NAME = CHILD.children[0].children[0].title;
        // get the page number which is set by the server and not the uploader
        const PAGE_NUMBER = parseInt(
          IMAGE_NAME.split("Page")[1].split(":")[0].trim()
        );
        // skip the loop if PAGE_NUMBER is less than BEGINNING_PAGE_NUMBER
        if (PAGE_NUMBER < parseInt(BEGINNING_PAGE_NUMBER)) {
          continue;
        }
        // get image page link from the element - large thumbnails view  on gallery only
        const URL_FROM_GALLERY = CHILD.children[0].href;
        // create a new request and send it to the url we got before
        let xhr1 = new XMLHttpRequest();
        xhr1.open("GET", URL_FROM_GALLERY);
        xhr1.send();
        // when there is a response from the server:
        xhr1.onreadystatechange = function () {
          // if the response is 200 OK
          if (xhr1.readyState === 4) {
            // save the response text from first request
            const RESPONSE_TEXT_1 = xhr1.responseText;
            // get the nl value -> this is the backup link of the image page that never fails
            const NL = RESPONSE_TEXT_1.split("nl('")[1].split("')\"")[0];
            // get the image nl page link from the image page link
            const URL_FROM_NL = URL_FROM_GALLERY + "?nl=" + NL;
            // create a second new request and send it to the NL url
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", URL_FROM_NL);
            xhr2.send();
            xhr2.onreadystatechange = function () {
              if (xhr2.readyState === 4) {
                const RESPONSE_TEXT_2 = xhr2.responseText;
                // get the image source that will be set to src="<<image-source-goes-here>>"
                const IMAGE_SOURCE = RESPONSE_TEXT_2.split('src="')[5].split(
                  '"'
                )[0];
                // create a new image tag element. same as document.createElement("img")
                let image = new Image();
                // set width and height - width should always be 1280px or whatever you set in the sad panda settings page
                let width = IMAGE_SOURCE.split("-")[2];
                let height = IMAGE_SOURCE.split("-")[3];
                // get ratio
                const RATIO_HW = height / width;
                // get final height
                const FINAL_HEIGHT = parseInt(IPHONE_WIDTH * RATIO_HW);
                // overwrite width and height with the new values
                width = IPHONE_WIDTH;
                height = FINAL_HEIGHT;
                // create a container for the images - because of transform
                let divContainer = document.createElement("div");
                // set id
                divContainer.id = PAGE_NUMBER;
                // append the image to the container
                divContainer.appendChild(image);
                // append the container to the body
                body.appendChild(divContainer);
                // set image id, not really needed
                // image.id = "img" + PAGE_NUMBER.toString();
                // set image width, height
                image.width = width;
                image.height = height;
                // set image style for the vertical reader
                image.style.display = "flex";
                image.style.margin = "auto";
                // set the loading to eager to get all images as soon as possible
                image.loading = "eager";
                // set source - now here can be loading issues
                image.src = IMAGE_SOURCE;
                // retry loading after one second if there are issues
                image.onerror = function () {
                  setTimeout(function () {
                    image.src = IMAGE_SOURCE;
                  }, 1000);
                };
                // the function below tells the script what to do when the image loads successfully
                image.onload = function () {
                  // sort the elements of body
                  sorting(body);
                  // now begin the logic of horizontal viewer
                  // increase the counter of the loaded images
                  loadedImages++;
                  // transform vertical to horizontal if all the images are loaded successfully
                  if (
                    loadedImages === NUMBER_OF_IMAGES &&
                    HORIZONTAL === true
                  ) {
                    // set body style display to flex and flex flow to row nowrap
                    body.style.display = "flex";
                    body.style.flexDirection = "row";
                    body.style.flexWrap = "nowrap";
                    body.style.justifyContent = "left";
                    body.style.alignItems = "center";
                    // get the containers of the images in the body
                    const CONTAINERS = body.children;
                    for (let container of CONTAINERS) {
                      // set style attributes to this container
                      // the height value is set to the width argument because the image should be rotated
                      // min-width=height, min-height=width, width=height, height=width
                      container.setAttribute(
                        "style",
                        "min-width:" +
                          height +
                          "px;min-height:" +
                          width +
                          "px;width:" +
                          height +
                          "px;height:" +
                          width +
                          "px;"
                      );
                    }
                    // get all the image elements by tag name "img"
                    const IMAGES = body.getElementsByTagName("img");
                    // it is named singleImage because of possible variable issues
                    for (let singleImage of IMAGES) {
                      // rotation: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
                      // transform:matrix(cos(x),sin(x),-sin(x),cos(x),tx,ty)
                      // rotation are the first four. sin(270) is -1, so the values should be 0,-1,1,0
                      // translation are tx and ty
                      // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
                      // empirical values for the translation are 232 and -232
                      // also set height and width
                      singleImage.setAttribute(
                        "style",
                        "transform:matrix(0,-1,1,0,232,-232);height:" +
                          height +
                          "px;width:" +
                          width +
                          "px;"
                      );
                    }
                  }
                };
              }
            };
          }
        };
      }
    }
  }
}
// the sorting fuction, which takes an element with children as an input
function sorting(div) {
  // get the children
  const CHILDREN = div.children;
  // intialize the array ids and the object object
  let ids = [];
  let object = {};
  // loop through the children
  for (const CHILD of CHILDREN) {
    object = {};
    object.element = CHILD;
    // regex to get a number from the id of the child - it replaces all the characters except digits with empty characters
    // \d is a character digit 0 to 9
    // ^ is an anchor that says start of string or line
    // ^ inside square brackets means not -> so [^\d] means not digits
    // the /_/g expression means that it is a global regex expression and to replace all the matches of the expression _, not just the first one
    const idNumber = CHILD.id.replace(/[^\d]/g, "");
    // parseInt(string,10) means to parse the string as a number with a base of 10
    object.idNumber = parseInt(idNumber, 10);
    ids.push(object);
  }
  // sort the array
  // https://www.w3schools.com/jsref/jsref_sort.asp
  // header Parameter Values
  ids.sort(function (a, b) {
    return a.idNumber - b.idNumber;
  });
  // append the sorted elements
  for (const ID of ids) {
    div.appendChild(ID.element);
  }
}
// excecute the main function
main();
