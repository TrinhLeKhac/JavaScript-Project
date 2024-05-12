const items = document.querySelectorAll(".item");

let imageURLs = [
    "images/dog-1.jpg",
    "images/dog-2.jpg",
    "images/dog-3.jpg",
    "images/dog-4.jpg",
    "images/dog-5.jpg",
];

let eventType = "";
let events = {
    mouse: {
        start: "mouseover",
        end: "mouseout",
    },
    touch: {
        start: "touchstart",
        end: "touchend",
    },
};

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        eventType = "touch";
        return true;
    } catch (e) {
        eventType = "mouse";
        return false;
    }
};

isTouchDevice();

items.forEach((item, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", imageURLs[index]);
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    item.appendChild(img);

    item.style.flex = "1";
    item.style.transition = "flex 0.8s ease";

    item.addEventListener(events[eventType].start, () => {
        item.style.flex = "9"; // Expand the item
    });
        
    item.addEventListener(events[eventType].end, () => {
        item.style.flex = "1"; // Contract the item
    });
});

