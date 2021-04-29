// ref:
// https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript

getScrollPercent = () => {
  const h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

  const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  return percent;
}

renderScrollPercentBars = () => {
  const scrollPercentBars = document.getElementsByClassName("scroll-percent-bar");
  const percent = getScrollPercent() / 100;

  for (let bar of scrollPercentBars) {
    bar.style.transform = `scaleX(${percent})`;
  }
}

window.modules.scrollPercentBars = {
  renderScrollPercentBars: renderScrollPercentBars,
};
