export const onlyFullHD = () => {
    const execute = () => {
        const body = document.querySelector("body");
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;
        const bWidth = window.screen.width 
        const scaleUp = (1 / wWidth) * bWidth;
        const scaleDown = (1 / bWidth) * wWidth;

        body.style.width = `${bWidth}px`;
        body.style.height = `${wHeight * scaleUp}px`;
        if(bWidth > 678) {
            body.style.transform = `scale(${scaleDown})`;
        }
    };

    window.onresize = () => execute();
    execute();

};

