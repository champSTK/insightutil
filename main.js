function detectUserInfo() {
    const platform = navigator.platform || "Unknown platform";
    const userAgent = navigator.userAgent || "Unknown user agent";
    let friendlyPlatform = platform;
    if (/Win/.test(platform)) {
      friendlyPlatform = "Windows PC";
    } else if (/Mac/.test(platform)) {
      friendlyPlatform = "Macintosh";
    } else if (/Linux/.test(platform)) {
      friendlyPlatform = "Linux PC";
    } else if (/Android/.test(userAgent)) {
      friendlyPlatform = "Android Device";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      friendlyPlatform = "iOS Device";
    }
    return `Detected device: ${friendlyPlatform}`;
  }
  const deviceInfoEl = document.getElementById('device-info');
  deviceInfoEl.textContent = detectUserInfo();

  // Date Time update
  const dateTimeEl = document.getElementById('date-time');
  function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
    });
    dateTimeEl.textContent = `${dateString} , ${timeString}`;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  const CPU_TOTAL = 100;
  const GPU_TOTAL = 100;
  let cpuUsage = 0;
  let gpuUsage = 0;

  function simulateCpuUsage() {
    cpuUsage += (Math.random() - 0.5) * 10;
    if (cpuUsage < 5) cpuUsage = 5;
    if (cpuUsage > 90) cpuUsage = 90;
    return cpuUsage;
  }
  function simulateGpuUsage() {
    gpuUsage += (Math.random() - 0.5) * 8;
    if (gpuUsage < 3) gpuUsage = 3;
    if (gpuUsage > 85) gpuUsage = 85;
    return gpuUsage;
  }
  function updateUsageUI(cpuPercent, gpuPercent) {
    const cpuBar = document.getElementById('cpu-bar');
    const cpuPercentText = document.getElementById('cpu-percent');
    const cpuDetails = document.getElementById('cpu-details');
    const cpuWidth = Math.min(cpuPercent, CPU_TOTAL);
    cpuBar.style.width = cpuWidth + '%';
    cpuBar.parentElement.setAttribute('aria-valuenow', cpuWidth.toFixed(0));
    cpuPercentText.textContent = cpuWidth.toFixed(0) + '%';
    cpuDetails.textContent = `Usage: ${cpuWidth.toFixed(0)}% / Total: ${CPU_TOTAL}%`;

    const gpuBar = document.getElementById('gpu-bar');
    const gpuPercentText = document.getElementById('gpu-percent');
    const gpuDetails = document.getElementById('gpu-details');
    const gpuWidth = Math.min(gpuPercent, GPU_TOTAL);
    gpuBar.style.width = gpuWidth + '%';
    gpuBar.parentElement.setAttribute('aria-valuenow', gpuWidth.toFixed(0));
    gpuPercentText.textContent = gpuWidth.toFixed(0) + '%';
    gpuDetails.textContent = `Usage: ${gpuWidth.toFixed(0)}% / Total: ${GPU_TOTAL}%`;
  }
  function update() {
    const cpu = simulateCpuUsage();
    const gpu = simulateGpuUsage();
    updateUsageUI(cpu, gpu);
  }
  update();
  setInterval(update, 1000);

  // Battery status
  const batteryLevelEl = document.getElementById('battery-level');
  const batteryPercentageEl = document.getElementById('battery-percentage');
  const batteryIconEl = batteryLevelEl.parentElement; // .battery-icon element

  function setBatteryColors(level) {
    let borderColor, fillColor;
    if(level >= 0.7){
      borderColor = '#00f0ff';
      fillColor = '#00f0ff';
    } else if(level >= 0.3){
      borderColor = '#ffd700';
      fillColor = '#ffd700';
    } else {
      borderColor = '#ff4444';
      fillColor = '#ff4444';
    }
    batteryIconEl.style.borderColor = borderColor;
    const batteryTip = document.getElementById('battery-tip');
    if(batteryTip){
      batteryTip.style.backgroundColor = borderColor;
    }
    batteryLevelEl.style.backgroundColor = fillColor;
  }

  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      // Create battery tip element for better color control
      const tipEl = document.createElement('div');
      tipEl.id = 'battery-tip';
      tipEl.style.position = 'absolute';
      tipEl.style.top = '3px';
      tipEl.style.right = '-6px';
      tipEl.style.width = '4px';
      tipEl.style.height = '8px';
      tipEl.style.borderRadius = '1px';
      tipEl.style.backgroundColor = '#40dfff';
      batteryIconEl.appendChild(tipEl);

      function updateBatteryInfo() {
        const levelPercent = (battery.level * 100).toFixed(0);
        batteryLevelEl.style.width = levelPercent + '%';
        setBatteryColors(battery.level);
        batteryPercentageEl.textContent = `${levelPercent}%`;
      }
      updateBatteryInfo();
      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);
    });
  } else {
    batteryPercentageEl.textContent = 'No Battery Info';
    batteryLevelEl.style.width = '100%';
    batteryLevelEl.style.backgroundColor = '#555';
    batteryIconEl.style.borderColor = '#555';
    // Create battery tip element with grey color
    const tipEl = document.createElement('div');
    tipEl.id = 'battery-tip';
    tipEl.style.position = 'absolute';
    tipEl.style.top = '3px';
    tipEl.style.right = '-6px';
    tipEl.style.width = '4px';
    tipEl.style.height = '8px';
    tipEl.style.borderRadius = '1px';
    tipEl.style.backgroundColor = '#555';
    batteryIconEl.appendChild(tipEl);
  }
  const speedtestBtn = document.getElementById('speedtest-btn');
  speedtestBtn.addEventListener('click', () => {
    window.open('https://www.speedtest.net/', '_blank', 'noopener');
  });

  // Surprise code and animation
  document.getElementById('app-title').addEventListener('click', () => {
    alert("There are suprises in the app ");
  });

  const supriseCode = [38,38,40,40,37,39,37,39,66,65];
  let keySequence = [];
  window.addEventListener('keydown', function(e) {
    keySequence.push(e.keyCode);
    if (keySequence.toString().indexOf(supriseCode.toString()) >= 0) {
      alert("💻 You unlocked the Animated Mode!");
      document.body.classList.add('animated-background');
      keySequence = [];
    }
  });