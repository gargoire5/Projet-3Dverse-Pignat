import * as Data from "./DataBase.js";


const canvas = document.getElementById('display-canvas');

//-----------------------------------onColidTrigger---------------------------------------------
const collideTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [collideGroup, inGroupList] of Object.entries(Data.collideDataBase)) 
    {
        for (const [collideTriggers, collideTriggersInfo] of Object.entries(inGroupList)) 
        {
            if (triggerEntity.getName() == collideTriggers ) 
            {
                Data.collideDataBase[collideGroup][collideTriggers].triggerCallBack(emitterEntity);
            }
        }
    }
}
SDK3DVerse.engineAPI.onEnterTrigger(collideTrigger);
//-----------------------------------onExitColidTrigger---------------------------------------------
const exitCollideTrigger = (emitterEntity,triggerEntity) =>
{
    for (const [collideGroup, inGroupList] of Object.entries(Data.exitCollideDataBase)) 
    {
        for (const [collideTriggers, collideTriggersInfo] of Object.entries(inGroupList)) 
        {
            if (triggerEntity.getName() == collideTriggers ) 
            {
                Data.exitCollideDataBase[collideGroup][collideTriggers].triggerCallBack(emitterEntity);
            }
        }
    }
}
SDK3DVerse.engineAPI.onExitTrigger(exitCollideTrigger);
