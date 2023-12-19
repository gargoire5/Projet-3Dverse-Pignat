const canvas = document.getElementById('display-canvas');

// Get the modal
var modal = document.getElementById("myModal");

const openModal = (emitterEntity,triggerEntity) =>
{
    modal.style.display = "block";
    console.log("ca trigger");
}
const closeModal = (emitterEntity,triggerEntity) =>
{
    modal.style.display = "none";
    console.log("ca trigger plus");
}
SDK3DVerse.engineAPI.onEnterTrigger(openModal);
SDK3DVerse.engineAPI.onExitTrigger(closeModal);