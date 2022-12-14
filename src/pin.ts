import { UI, cardInfo } from "./ui";
import { Utils } from "./utils";
import { ipcRenderer } from "electron";

export namespace PIN {
  export function verifyPIN(): void {
    let pin = document.getElementById("verify-pin-inp") as HTMLInputElement;
    let submitBtn = document.getElementById("verify-pin-btn") as HTMLInputElement;
    let cancelBtn = document.getElementById("verify-pin-cancel");
    let pinRetryMess = document.getElementById("pin-retry-form");

    pinRetryMess!.innerHTML = `${cardInfo.pinRetry}`;

    pin.addEventListener("input", (e) => {
      Utils.checkInputNumericValue(pin.value, 6) ? submitBtn.removeAttribute("disabled") : submitBtn.setAttribute("disabled", "disabled");
      e.preventDefault();
    });

    submitBtn?.addEventListener("click", (e) => {
      ipcRenderer.send("verify-pin", pin.value);
      UI.unloadFragment();
      e.preventDefault();
    });

    cancelBtn?.addEventListener("click", (e) => {
      pin.value = "";
      UI.unloadFragment();
      e.preventDefault;
    });
  }
}