const sunSound: HTMLAudioElement = new Audio('./../assets/sounds/summer.mp3');
const rainSound: HTMLAudioElement = new Audio('./../assets/sounds/rain.mp3');
const snowSound: HTMLAudioElement = new Audio('./../assets/sounds/winter.mp3');

const itemSun = document.querySelector('.music__item_sun') as HTMLElement;
const itemRain = document.querySelector('.music__item_rain') as HTMLElement;
const itemSnow = document.querySelector('.music__item_snow') as HTMLElement;

const inputVolume = document.querySelector('.inp') as HTMLInputElement;

const bckgr = document.querySelector('.wrapper') as HTMLElement;

const iconsWeather = document.querySelectorAll('.music__icon');

interface Sound {
  key: HTMLElement;
  value: HTMLAudioElement;
  active: [boolean, boolean];
  defaultImageIcon: string;
  imageItem: string | undefined;
}

const Sounds: Sound[] = [
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

function playMusic(item: Sound): void {
  const iconItem = item.key.querySelector('.music__icon') as HTMLImageElement;
  iconItem.classList.add('music__icon_active');
  iconItem.src = '../assets/icons/pause.svg';

  item.active = [true, true];
  item.value.volume = +inputVolume.value;
  item.value.play();

  bckgr.style.background = `url(${item.imageItem})`;
  console.log(bckgr.style.background);
  // bckgr.setAttribute('background', `url(${item.imageItem})`);
}

function pauseMusic(item: Sound): void {
  const iconItem = item.key.querySelector('.music__icon') as HTMLImageElement;
  iconItem.classList.remove('music__icon_active');
  iconItem.src = item.defaultImageIcon;

  item.value.pause();
  item.active = [true, false];
}

function stopMusic(item: Sound): void {
  const iconItem = item.key.querySelector('.music__icon') as HTMLImageElement;
  iconItem.classList.remove('music__icon_active');
  iconItem.src = item.defaultImageIcon;

  item.active = [false, false];
  item.value.pause();
  item.value.currentTime = 0;
}

iconsWeather.forEach((icon: Element): void => {
  icon.addEventListener('click', () => {
    const targetItem = Sounds.find(
      (elem) => elem.key === icon.closest('.music__item'),
    ) as Sound;

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
