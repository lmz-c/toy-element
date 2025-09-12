export default function () {
  if (import.meta.env.PROD) {
    const logo = `
______________________________________________________________________________
  __                                .__                                __   
_/  |_  ____ ___.__.           ____ |  |   ____   _____   ____   _____/  |_ 
\   __\/  _ <   |  |  ______ _/ __ \|  | _/ __ \ /     \_/ __ \ /    \   __\
 |  | (  <_> )___  | /_____/ \  ___/|  |_\  ___/|  Y Y  \  ___/|   |  \  |  
 |__|  \____// ____|          \___  >____/\___  >__|_|  /\___  >___|  /__|  
             \/                   \/          \/      \/     \/     \/      
______________________________________________________________________________
              author:lmccc
`;
    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;
    console.info(`%c${logo}`, rainbowGradient);
  } else if (import.meta.env.DEV) {
    console.log("[ToyElement]: dev mode...");
  }
}
