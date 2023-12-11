const video = document.querySelector<HTMLVideoElement>("video");
const info = document.querySelector<HTMLSpanElement>(".info");

type WindowDetails = {
  screenLeft?: number;
  screenTop?: number;
  innerHeight?: number;
  innerWidth?: number;
  outerHeight?: number;
  outerWidth?: number;
};

function getScreenId() {
  let randNum = Math.round(Math.random() * 100);
  const screenList = Object.entries(localStorage).filter(([key]) =>
    key.startsWith("screen-")
  );

  for (let i = 0; i < screenList.length; i++) {
    const element = screenList[i];
    const currId = parseInt(element[0].replace("screen-", ""));
    if (currId == randNum) {
      console.log(1111);
      randNum = Math.round(Math.random() * 100);
      i = 0;
    }
  }

  return "screen-" + randNum;
}
console.log(getScreenId());

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  video.srcObject = stream;
  video?.play();
}

const scrDet: WindowDetails = {
  screenLeft: window.screenLeft,
  screenTop: window.screenTop,
};

let windowProps = Object.entries(window).filter(
  ([key, entry]) => typeof entry === "number"
);

setInterval(() => {
  windowProps = Object.entries(window).filter(
    ([key, entry]) => typeof entry === "number"
  );
  info.innerHTML = `${windowProps.map(
    ([key, value]) => `<li>${key}: ${value}</li>`
  )}`.replace(/,/g, "");
}, 10);

localStorage.clear();
localStorage.setItem(
  "screen-3",
  JSON.stringify(Object.fromEntries(windowProps))
);
localStorage.setItem(
  "screen-12",
  JSON.stringify(Object.fromEntries(windowProps))
);

getScreenId();
// console.log(Object.fromEntries(windowProps));

// startVideo();
