export const buttonsDataBase = {
    machine1 : 
    {
        buttons :
        {
            testButton : {
                clickCallBack : async () => 
                {
                    await SDK3DVerse.engineAPI.playAnimationSequence("7526a81f-145f-436c-af18-0108b383a9aa", {seekOffset : 0});
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
                console.log("rtest");
                const transform =
                {
                    position : [5,0.1,-34],
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
                    position : [0,0.1,0],
                    orientation : [0,0,0,1],
                    scale : [1,1,1]
                };
                emitterEntity.setGlobalTransform(transform);
            }
        },
    },

    machineTest : {
        dvi3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("myModal").style.display = "block";
            }
        }
        
    }
}

export const exitCollideDataBase = {
    machineTest : {
        dvi3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("myModal").style.display = "none";
            }
        }
        
    }
}
