import { Line } from "./linePatcher";

let line = new Line(".wrapper", "#f06", 10);

const video = document.querySelector<HTMLVideoElement>("video");
const info = document.querySelector<HTMLPreElement>(".info");

type WindowDetails = {
  screenWidth: number;
  screenHeight: number;
  screenX: number;
  screenY: number;
  width: number;
  height: number;
  rightBorder: number;
  downBorder: number;
  updated: number;
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
      randNum = Math.round(Math.random() * 100);
      i = 0;
    }
  }

  return "screen-" + randNum;
}

const screenId = getScreenId();

function setScreenDetails() {
  const windowDetails = {
    screenWidth: window.screen.availWidth,
    screenHeight: window.screen.availHeight,
    screenX: window.screenX,
    screenY: window.screenY,
    width: window.innerWidth,
    height: window.innerHeight,
    rightBorder: window.screenX + window.innerWidth - 50,
    downBorder: window.screenY + window.innerHeight - 50,
    updated: Date.now(),
  };

  window.localStorage.setItem(screenId, JSON.stringify(windowDetails));
}

function removeScreen() {
  console.log(`removed ${screenId}`);

  window.localStorage.removeItem(screenId);
}

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream) => {
      if (!video) return;
      video.width = window.screen.availWidth;
      video.height = window.screen.availHeight;
      video.srcObject = stream;
      video.play();
    });
}

function getScreens(): [string, WindowDetails][] {
  return Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith("screen-"))
    .map(([key, value]) => [key, JSON.parse(value) as WindowDetails]);
}

line.drawLine(1, 1, 1, 1);

function displayStats() {
  const screens = Object.fromEntries(getScreens());
  const currScreen = screens[screenId];

  info.innerHTML = JSON.stringify(
    {
      currentScreen: currScreen,
      other: Object.fromEntries(
        getScreens().filter(([key]) => key !== screenId)
      ),
    },
    null,
    " "
  );

  for (const key in Object.fromEntries(
    getScreens().filter(([key]) => key !== screenId)
  )) {
    if (Object.prototype.hasOwnProperty.call(screens, key)) {
      const element = screens[key];
      if (
        currScreen.rightBorder > element.screenX &&
        currScreen.screenX < element.rightBorder &&
        currScreen.downBorder > element.screenY &&
        currScreen.screenY < element.downBorder
      ) {
        console.log(key);
      }

      line.updateLine(
        currScreen.width / 2,
        currScreen.height / 2,
        element.screenX,
        element.screenY
      );
    }
  }
}

const timers: ReturnType<typeof setInterval>[] = [];
function start() {
  timers.push(setInterval(setScreenDetails, 50));
  timers.push(setInterval(displayStats, 50));
}

start();

window.addEventListener("beforeunload", removeScreen);
localStorage.clear();

// startVideo();
