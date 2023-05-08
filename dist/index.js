"use strict";
const sunSound = new Audio('./../assets/sounds/summer.mp3');
const rainSound = new Audio('./../assets/sounds/rain.mp3');
const snowSound = new Audio('./../assets/sounds/winter.mp3');
const itemSun = document.querySelector('.music__item_sun');
const itemRain = document.querySelector('.music__item_rain');
const itemSnow = document.querySelector('.music__item_snow');
const inputVolume = document.querySelector('.inp');
const bckgr = document.querySelector('.wrapper');
const iconsWeather = document.querySelectorAll('.music__icon');
const Sounds = [
    {
        key: itemSun,
        value: sunSound,
        active: [false, false],
        defaultImageIcon: '../assets/icons/sun.svg',
        imageItem: '../assets/summer-bg.jpg',
    },
    {
        key: itemRain,
        value: rainSound,
        active: [false, false],
        defaultImageIcon: '../assets/icons/cloud-rain.svg',
        imageItem: '../assets/rainy-bg.jpg',
    },
    {
        key: itemSnow,
        value: snowSound,
        active: [false, false],
        defaultImageIcon: '../assets/icons/cloud-snow.svg',
        imageItem: '../assets/winter-bg.jpg',
    },
];
function playMusic(item) {
    const iconItem = item.key.querySelector('.music__icon');
    iconItem.classList.add('music__icon_active');
    iconItem.src = '../assets/icons/pause.svg';
    item.active = [true, true];
    item.value.volume = +inputVolume.value;
    item.value.play();
    bckgr.style.background = `url(${item.imageItem})`;
    console.log(bckgr.style.background);
    // bckgr.setAttribute('background', `url(${item.imageItem})`);
}
function pauseMusic(item) {
    const iconItem = item.key.querySelector('.music__icon');
    iconItem.classList.remove('music__icon_active');
    iconItem.src = item.defaultImageIcon;
    item.value.pause();
    item.active = [true, false];
}
function stopMusic(item) {
    const iconItem = item.key.querySelector('.music__icon');
    iconItem.classList.remove('music__icon_active');
    iconItem.src = item.defaultImageIcon;
    item.active = [false, false];
    item.value.pause();
    item.value.currentTime = 0;
}
iconsWeather.forEach((icon) => {
    icon.addEventListener('click', () => {
        const targetItem = Sounds.find((elem) => elem.key === icon.closest('.music__item'));
        if (icon.classList.contains('music__icon_active')) {
            console.log('Пауза на аудио');
            pauseMusic(targetItem);
            return;
        }
        if (targetItem.active[0] !== true) {
            Sounds.forEach((elem) => {
                stopMusic(elem);
                elem.active = [false, false];
            });
        }
        playMusic(targetItem);
    });
});
