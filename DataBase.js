

export const collideDataBase = {
    TP_salle_chimie : {
        pad1_triggeredBox : {
            triggerCallBack : (emitterEntity) =>
            {
                const transform =
                {
                    position : [-7.3, 1.2, -38.7],
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
        tpc3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("tpc3000").style.display = "block";
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
        tpc3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("tpc3000").style.display = "none";
            }
        },
        upb1000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("upb1000").style.display = "none";
            }
        },
        dvi3000 : {
            triggerCallBack : (emitterEntity) =>
            {
                document.getElementById("upb1000").style.display = "none";
            }
        }
        
    }
}