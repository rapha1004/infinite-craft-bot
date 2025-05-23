const middleW = window.innerWidth / 2;
const middleH = window.innerHeight / 2;

let craftList = [];
let lastItem = document
  .querySelector(".items-inner")
  .lastChild.children[0].getAttribute("data-item-text");

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
  console.table(craftList);

  const items = getAllElement();

  for (let index = 0; index < items.length; index++) {
    for (let jndex = index + 1; jndex < items.length; jndex++) {
      const first = items[index].getAttribute("data-item-text");
      const second = items[jndex].getAttribute("data-item-text");
  
      if (hasBeenTested(first, second)) continue;
      
      await wait(100);
      lastItem = document
        .querySelector(".items-inner")
        .lastChild.children[0].getAttribute("data-item-text");

      dragAndDrop(items[index], items[jndex]);
      await wait(300);
      erase();
    }
  }
  console.log("je remprends les item la !");
  controller();
}

function addToTable(first, second) {
  const child = document.elementFromPoint(middleW, middleH).lastChild.textContent
  // TODO: le psuh dans le tableau de craft ne fonctionne pas

  
  
  if (lastItem != child) {
    console.log(first + " + " + second + " = " + child);
    craftList.push({
      item1: first,
      item2: second,
      result: child,
    });
  }else{
    craftList.push({
      item1: first,
      item2: second,
      result: null,
    });
  }
 

}

function hasBeenTested(first, second) {
  return craftList.some(
    (entry) =>
      (entry.item1 === first && entry.item2 === second) ||
      (entry.item1 === second && entry.item2 === first)
  );
}



function dragAndDrop(first, second) {
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  //first
  simulateMouseEvent(first, "mousedown", firstRect.left + 5, firstRect.top + 5);
  simulateMouseEvent(document, "mousemove", middleW, middleH);
  simulateMouseEvent(document, "mouseup", middleW, middleH);

  //second
  setTimeout(async () => {
    simulateMouseEvent(
      second,
      "mousedown",
      secondRect.left + 5,
      secondRect.top + 5
    );
    simulateMouseEvent(document, "mousemove", middleW, middleH);
    simulateMouseEvent(document, "mouseup", middleW, middleH);

    await wait(200);

    addToTable(
      first.getAttribute("data-item-text"),
      second.getAttribute("data-item-text")
    );
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
  return new Promise((resolve) => setTimeout(resolve, ms));
}
