
function resetFontSize() {
    const htmlDom = document.getElementsByTagName('html')[0];
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

    htmlWidth = htmlWidth > 1920 ? 1920 : htmlWidth;
    htmlWidth = htmlWidth < 1440 ? 1440 : htmlWidth;

    const designWidth = 1920;

    htmlDom.style.fontSize = `${htmlWidth / designWidth}px`;
}
resetFontSize();
window.addEventListener('resize', resetFontSize);