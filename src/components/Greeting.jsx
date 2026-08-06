
export function Greeting() {
  let t = (new Date()).getHours();
  if (t >= 5 && t < 12) {
    return 'Good Morning';
  } else if (t >= 12 && t < 16) {
    return 'Good Afternoon';
  } else if (t >= 16 && t < 20) {
    return 'Good Evening';
  } else {
    return "How's your night";
  }
};


