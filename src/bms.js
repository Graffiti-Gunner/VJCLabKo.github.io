var battery = null;
const bmsInit = function (str) {
  battery = null;
  if (!str) str = '';
  console.info("BMS " + str + "Init....");
  console.log(document.querySelector(".dropdown label input")
    .checked);
  let show = null;
  show = setTimeout(() => {
    if (!battery) {
      console.info("BMS LOAD Failed.");
      if(document.querySelector(".mein-header")){
         console.log(document.querySelector(".mein-header ul li a.batteryContainer")
        .dataset.useInternalBms);
      document.querySelector("#batteryLevel i")
        .id = "onerror";
      document.querySelector("#batteryLevel i")
        .className = "fas fa-exclamation-triangle";
      document.querySelector(".batteryLevel.text")
        .textContent = "LoadError";
      }
      clearTimeout(show);
    }
    console.log("BMS tout Finished.");
  }, 6000);
};
const onBMSSetupChange = function () {
  document.querySelector(".mein-header ul li a.batteryContainer")
    .dataset.useInternalBms = document.querySelector(".dropdown label input")
      .checked;
  bmsInit("RE ");
};