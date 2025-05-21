const middleW = window.innerWidth / 2;
const middleH = window.innerHeight / 2;


function simulateMouseEvent(element, eventType, clientX, clientY) {
  element.dispatchEvent(
    new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
    })
  );
}


function getAllElement() {
  const items = document.querySelectorAll(".item");
  const list = Array.from(items);

  return Array.from(list);
}

async function controller() {
  
  const items = getAllElement();

  for (let index = 0; index < items.length; index++) {
    
    for (let jndex = index + 1; jndex < items.length; jndex++) {
      await wait(100)
      dragAndDrop(items[index], items[jndex]);
      await wait(300)
       erase();
    }
  }
  console.log("je remprends les item la !");
  controller()
}


function dragAndDrop(first, second) {
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  console.log(
    first.getAttribute("data-item-text") +
      " + " +
      second.getAttribute("data-item-text")
  );

  //first
  simulateMouseEvent(first, "mousedown", firstRect.left + 5, firstRect.top + 5);
  simulateMouseEvent(document, "mousemove", middleW, middleH);
  simulateMouseEvent(document, "mouseup", middleW, middleH);

  //second
  setTimeout(() => {
    simulateMouseEvent(
      second,
      "mousedown",
      secondRect.left + 5,
      secondRect.top + 5
    );
    simulateMouseEvent(document, "mousemove", middleW, middleH);
    simulateMouseEvent(document, "mouseup", middleW, middleH);
  }, 100);
}


function erase() {
  const el = document.elementFromPoint(middleW, middleH);

  if (!el) return console.warn("Pas d'élément sous la souris");

  ["mousedown", "mouseup", "contextmenu"].forEach((type) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 2,
      buttons: 2,
      clientX: middleW,
      clientY: middleH,
    });
    el.dispatchEvent(event);
  });
}

controller();



function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}