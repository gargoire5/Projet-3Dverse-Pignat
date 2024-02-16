//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  youtubeVideo
} from "./config.js";

//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);
window.labels = {};

//------------------------------------------------------------------------------
async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: true,
    startSimulation: "on-assets-loaded",
    defaultControllerType: SDK3DVerse.controller_type.editor,
  });

  await SDK3DVerse.installExtension(SDK3DVerse_ViewportDomOverlay_Ext);
  const labelExt = await SDK3DVerse.installExtension(SDK3DVerse_LabelDisplay_Ext);

  labelExt.onLabelListUpdated = (labelEntities) => {
    labelEntities.forEach(e => labels[e.getName()] = e);
  };
}

//------------------------------------------------------------------------------
//https://developers.google.com/youtube/iframe_api_reference#Getting_Started
let player;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
window.onYouTubePlayerAPIReady = function() {
  if (document.getElementById("player")) {
    document.getElementById("player_container").removeChild(document.getElementById("player"));
  }
  var div=document.createElement("div");
  div.id="player";
  document.getElementById("player_container").appendChild(div);
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId:youtubeVideo.id,
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
  });
}
//------------------------------------------------------------------------------
// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}
//------------------------------------------------------------------------------
// Control video current time regurlaly when it plays
let intervalTimerId = null;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    intervalTimerId = setInterval(checkPlayerCurrentTime, 1000);
  }
  else {
    clearInterval(intervalTimerId);
    intervalTimerId = null;
    currentLabel = null;
  }
}
//------------------------------------------------------------------------------
// Focus intended label when currentTime is in a certain period of the video
let currentLabel = null;
function checkPlayerCurrentTime() {
  const currentTime = player.getCurrentTime();
  const minTimeInsec = Object.keys(youtubeVideo.timeInSecToLabelName);

  let t;
  for(t of minTimeInsec) {
    if(currentTime < t) {
      break;
    }
  }

  const labelName = youtubeVideo.timeInSecToLabelName[t];
  if(currentLabel !== labels[labelName])
  {
    currentLabel = labels[labelName];
    SDK3DVerse.extensions.LabelDisplay.onLabelClicked(currentLabel);
  }
}