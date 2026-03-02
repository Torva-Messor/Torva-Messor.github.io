

const startBtn = document.getElementById('start-ar');
const overlay = document.getElementById('overlay');
const uiContainer = document.getElementById('ui-container');
const sharedCube = document.getElementById('shared-cube');

let pubnub;

// Pubnub link
function initPubNub() {
    pubnub = new PubNub({
        publishKey: CONFIG.PUBNUB_PUBLISH_KEY,
        subscribeKey: CONFIG.PUBNUB_SUBSCRIBE_KEY,
        userId: 'user_' + Math.random().toString(36).substr(2, 9)
    });

    pubnub.addListener({
        message: function(event) {
            if (event.message.action === "change_color") {
                sharedCube.setAttribute('color', event.message.color);
            }
        }
    });

    pubnub.subscribe({ channels: [CONFIG.CHANNEL_NAME] });
}

// Ar trigger
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    uiContainer.style.display = 'flex';
  
    initPubNub();

    //Request WebXR Session
    const sceneEl = document.querySelector('a-scene');
    sceneEl.enterVR(); // mobile ar
});

document.getElementById('color-btn').addEventListener('click', () => {
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    sharedCube.setAttribute('color', newColor);
    pubnub.publish({
        channel: CONFIG.CHANNEL_NAME,
        message: { action: "change_color", color: newColor }
function syncPosition(newPosition) {
    pubnub.publish({
        channel: CONFIG.CHANNEL_NAME,
        message: {
            action: "move_object",
            position: newPosition
        }
    });
}

if (msg.action === "move_object") {
    sharedCube.setAttribute('position', msg.position);
}

    });
});

