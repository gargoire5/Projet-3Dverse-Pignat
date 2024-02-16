export var playerController
export const buttonsDataBase = {
    machine1 : 
    {
        interactionObj :
        {
            testButton : {
                clickCallBack : async () => 
                {
                    await SDK3DVerse.engineAPI.playAnimationSequence("7526a81f-145f-436c-af18-0108b383a9aa", {seekOffset : 0});
                }
            },
            wateranimation : {
                clickCallBack : async () => 
                {
                    await SDK3DVerse.engineAPI.playAnimationSequence("829381a8-e427-4d8d-9ea8-a8c0ddb35c36", {seekOffset : 0});
                }
            },
            testScreen : {
                clickCallBack : async () => 
                {
                    var playerScene = (await SDK3DVerse.engineAPI.findEntitiesByNames("Player".concat("_",SDK3DVerse.getClientUUID())))[0];
                    playerController = (await playerScene.getChildren())[0];
                    var screenCam = await SDK3DVerse.engineAPI.findEntitiesByNames("screenCam");

                    playerController.detachComponent('character_controller');
                    
                    SDK3DVerse.actionMap.values["LOOK_LEFT"] = [];
                    SDK3DVerse.actionMap.values["LOOK_RIGHT"] = [];
                    SDK3DVerse.actionMap.values["LOOK_DOWN"] = [];
                    SDK3DVerse.actionMap.values["LOOK_UP"] = [];
                    
                    SDK3DVerse.actionMap.values["MOVE_FORWARD"] = [];
                    SDK3DVerse.actionMap.values["MOVE_DOWN"] = [];
                    SDK3DVerse.actionMap.values["MOVE_LEFT"] = [];
                    SDK3DVerse.actionMap.values["MOVE_RIGHT"] = [];
                    SDK3DVerse.actionMap.values["MOVE_UP"] = [];
                    SDK3DVerse.actionMap.values["MOVE_BACKWARD"] = [];
                    SDK3DVerse.actionMap.propagate();
                    
                    await SDK3DVerse.setMainCamera(screenCam[0]);

                    document.getElementById("tvContainer").style.display = "block";

                    canvas.removeEventListener('mousemove', HightLight, false);
                    canvas.removeEventListener('mouseup', onClickButton, false);
                }
            }
        }
    },

};

export const collideDataBase = {
    TP_salle_chimie : {
        pad1_triggeredBox : {
            triggerCallBack : (emitterEntity) =>
            {
                const transform =
                {
                    position : [-33,0.5,-20],
                    orientation : [0,0,0,1],
                    scale : [1,1,1]
                };
                emitterEntity.setGlobalTransform(transform);
            }
        },
        pad2_triggeredBox : {
            triggerCallBack : (emitterEntity) =>
            {
                const transform =
                {
                    position : [0,0.5,0],
                    orientation : [0,0,0,1],
                    scale : [1,1,1]
                };
                emitterEntity.setGlobalTransform(transform);
            }
        },
    },

    machinesDescriptionPad : {
        dvi3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("dvi3000").style.display = "block"; //affiche les caracteristiques de la machine
                document.getElementById("containersButton").style.display = "block"; //affiche les boutons 
            }
        },
        upb1000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("upb1000").style.display = "block";
            }
        }
        
    }
}

export const exitCollideDataBase = {
    machinesDescriptionPad : {
        dvi3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("dvi3000").style.display = "none"; 
                document.getElementById("containersButton").style.display = "none";
            }
        },
        upb1000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("upb1000").style.display = "none";
            }
        }
        
    }
}
