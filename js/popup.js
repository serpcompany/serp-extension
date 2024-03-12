chrome.runtime.sendMessage({command:"execute-script"})


//add listeners after the UI is loaded
window.addEventListener("load", async () => {
    
    //Initialize variables and functions
    const saveSettingsBtn = document.getElementById("save-settings-btn")
    const successToast = document.getElementById("success-alert")
    const clapSpeedFld = document.getElementById("clap-action-delay")
    const navigationSpeedFld = document.getElementById("navigation-delay")
    const scrollSpeedFld = document.getElementById("scroll-delay")

    const storageGet = (key) => new Promise((resolve) => chrome.storage.local.get(key).then((data) => resolve(data[key])))

    const showSuccessMessage = () => {
        successToast.classList.add("block")
        successToast.classList.remove("hidden")
    }
    
    const hideSuccessMessage = () => {
        successToast.classList.remove("block")
        successToast.classList.add("hidden")
    }

    const isValidDelay = (value) => {
        if(value <= 0 || isNaN(value)) return false
        return true
    }

    const storeSettings = async () => {
        const clapActionDelay = Number(clapSpeedFld?.value)
        const navigationDelay = Number(navigationSpeedFld?.value)
        const scrollDelay = Number(scrollSpeedFld?.value)

        const speedSettings = {
            clapActionDelay: isValidDelay(clapActionDelay) ? clapActionDelay:undefined,
            navigationDelay: isValidDelay(navigationDelay) ? navigationDelay:undefined,
            scrollDelay: isValidDelay(scrollDelay) ? scrollDelay:undefined,
        }

        //store data to local storage
        await chrome.storage.local.set({"medium-speed-settings":speedSettings})
        showSuccessMessage()
        setTimeout(()=>{
            hideSuccessMessage()
        },2000)
    }

    //form handling
    const speedSettings = await storageGet("medium-speed-settings") ?? {} 

    clapSpeedFld.value = speedSettings.clapActionDelay
    navigationSpeedFld.value = speedSettings.navigationDelay
    scrollSpeedFld.value = speedSettings.scrollDelay

    saveSettingsBtn.addEventListener("click", storeSettings);
})

