// Read speed from Chrome storage
chrome.storage.local.get(['speed'], function (result) {
  const speedInput = document.getElementById('speedInput');
  speedInput.value = result.speed;
});

// Set speed from the Popup
document.getElementById('setSpeed').onclick = function () {
  var speed = document.getElementById('speedInput').value;
  chrome.storage.local.set({speed: speed}, function () {
    console.log('Speed is set to ' + speed);
  });
}
