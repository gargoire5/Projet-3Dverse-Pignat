import * as Data from "./DataBase.js"   ; 

const canvas = document.getElementById('display-canvas');
var selectedEntities; 
var machineParent;
var lookedButton;
var lastHoverEntity;
var animonoff = false;



//-----------------------------------HightLight---------------------------------------------
canvas.addEventListener('mousemove', async (e) =>
{
    const {entity, pickedPosition, pickedNormal} = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY);
    if (!entity)
        return;
    
    for (const [machine, machineInfo] of Object.entries(Data.buttonsDataBase)) {
        for (const [buttons, buttonsList] of Object.entries(machineInfo)) {
            for (const [button, buttonInfo] of Object.entries(buttonsList)) {
                if (button == entity.getName())
                {
                    lastHoverEntity = entity;
                    machineParent = machine;
                    lookedButton = entity;
                }
            }
        }
    }

    if (!lookedButton) {return}
    else if (entity == lookedButton) 
    {
        if (!lookedButton.isSelected())
            lookedButton.select();
    }
    else
    { 
        SDK3DVerse.engineAPI.unselectAllEntities();
        lookedButton = null;
    }

    //-----------------------------------onClickAction---------------------------------------------
    


}, false);

canvas.addEventListener('mouseup', async (e) =>
{
    const {entity} = await SDK3DVerse.engineAPI.castScreenSpaceRay(e.clientX, e.clientY);
    if (entity == lookedButton)
        Data.buttonsDataBase[machineParent].buttons[lookedButton.getName()].clickCallBack();

}, false);

const colidTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [colidTriggers, colidTriggersInfo] of Object.entries(Data.colidDataBase)) 
    {
        if (triggerEntity.getName() == colidTriggers) 
        {
            Data.colidDataBase[colidTriggers].triggerCallBack();
        }
    }
    
}
SDK3DVerse.engineAPI.onEnterTrigger(colidTrigger);


