//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

//------------------------------------------------------------------------------
async function InitApp() {

  var player;
	var t=0;
	let initOk=0;
	let etatVideo=0;
	let etatTempo=-1;
	let overview,bouilleur,MiseSousTension,ExplicationDalleDoutons,Marche,BoutonnerieAlarme,ReglageDebitEauFroide,AlarmeDebitEauFroide;
	let FermetureBouilleur,DemarrageChauffeDalle,DemarrageChauffebouilleur,ChangementConsigne,Ebullition,MiseEnRegime,TeteReflux;

  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });

  await InitFirstPersonController(characterControllerSceneUUID);

  await SDK3DVerse.installExtension(SDK3DVerse_ViewportDomOverlay_Ext);
	const labelExt = await SDK3DVerse.installExtension(SDK3DVerse_LabelDisplay_Ext);
  const labels = {}
  labelExt.onLabelListUpdated = (labelEntities) => {
    labelEntities.forEach(e => labels[e.getName()] = e);
  };

  labelExt.setDisplayState(false);

	overview = await SDK3DVerse.engineAPI.findEntitiesByEUID("a0d2c21a-585e-4bb9-a5b9-b434b3dadedf");
	bouilleur = await SDK3DVerse.engineAPI.findEntitiesByEUID("ccd037bf-fb16-4e6c-9b42-45182ebbae52");
	MiseSousTension = await SDK3DVerse.engineAPI.findEntitiesByEUID("5feba3ad-dab8-45db-981f-b4c68911e247");
	ExplicationDalleDoutons = await SDK3DVerse.engineAPI.findEntitiesByEUID("23571ab9-e8cb-42b3-a1f9-39a41586e27d");
	Marche = await SDK3DVerse.engineAPI.findEntitiesByEUID("0f560df4-80fe-473e-b054-0d4561c51f3f");
	BoutonnerieAlarme = await SDK3DVerse.engineAPI.findEntitiesByEUID("24e08489-8982-4145-9198-620836272670");
	ReglageDebitEauFroide = await SDK3DVerse.engineAPI.findEntitiesByEUID("ec98c9c5-c6aa-4e26-a644-a2cd1865773a");
	AlarmeDebitEauFroide = await SDK3DVerse.engineAPI.findEntitiesByEUID("091cabb0-f6cb-4f17-bc16-b279684e36b4");
	FermetureBouilleur = await SDK3DVerse.engineAPI.findEntitiesByEUID("091cabb0-f6cb-4f17-bc16-b279684e36b4");
	DemarrageChauffeDalle = await SDK3DVerse.engineAPI.findEntitiesByEUID("fe369691-6dc0-4848-b520-826fc5950cac");
	DemarrageChauffebouilleur = await SDK3DVerse.engineAPI.findEntitiesByEUID("0f560df4-80fe-473e-b054-0d4561c51f3f");
	ChangementConsigne = await SDK3DVerse.engineAPI.findEntitiesByEUID("fe369691-6dc0-4848-b520-826fc5950cac");
	Ebullition = await SDK3DVerse.engineAPI.findEntitiesByEUID("259179b1-9cee-4bcb-8217-31c8434aa9f5");
	MiseEnRegime = await SDK3DVerse.engineAPI.findEntitiesByEUID("45990004-8f70-443b-8f13-0b7963238cc6");
	TeteReflux = await SDK3DVerse.engineAPI.findEntitiesByEUID("f7a8cf21-7f1f-4506-9402-a0a06e5e2553");

	initOk = 1;
	console.log("Pos : " + 1 + " done");
}

window.addEventListener("load", InitApp);
console.log("Pos : " + 0 + " done");
//------------------------------------------------------------------------------
async function InitFirstPersonController(charCtlSceneUUID) {
  // To spawn an entity we need to create an EntityTempllate and specify the
  // components we want to attach to it. In this case we only want a scene_ref
  // that points to the character controller scene.
  const playerTemplate = new SDK3DVerse.EntityTemplate();
  playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
  playerTemplate.attachComponent("local_transform",{position: [-7.3, 1.2, -38.7]});
  //[-33,0.5,-20]

  // Passing null as parent entity will instantiate our new entity at the root
  // of the main scene.
  const parentEntity = null;
  // Setting this option to true will ensure that our entity will be destroyed
  // when the client is disconnected from the session, making sure we don't
  // leave our 'dead' player body behind.
  const deleteOnClientDisconnection = true;
  // We don't want the player to be saved forever in the scene, so we
  // instantiate a transient entity.
  // Note that an entity template can be instantiated multiple times.
  // Each instantiation results in a new entity.
  const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
    "Player".concat('_',SDK3DVerse.getClientUUID()),
    parentEntity,
    deleteOnClientDisconnection
  );

  // The character controller scene is setup as having a single entity at its
  // root which is the first person controller itself.
  
  const firstPersonController = (await playerSceneEntity.getChildren())[0];
  // Look for the first person camera in the children of the controller.
  const children = await firstPersonController.getChildren();
  const firstPersonCamera = children.find((child) =>
    child.isAttached("camera")
  );

  // We need to assign the current client to the first person controller
  // script which is attached to the firstPersonController entity.
  // This allows the script to know which client inputs it should read.
  SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

  // Finally set the first person camera as the main camera.
  SDK3DVerse.setMainCamera(firstPersonCamera);
}

export function AutoReview()
{
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
}



