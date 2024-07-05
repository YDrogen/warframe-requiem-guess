export enum REQUIEM_NAME {
  FASS = 'Fass',
  JAHU = 'Jahu',
  KHRA = 'Khra',
  LOHK = 'Lohk',
  NETRA = 'Netra',
  RIS = 'Ris',
  VOME = 'Vome',
  XATA = 'Xata',
}

export type REQUIEM = {
  name: REQUIEM_NAME;
  description?: string;
  img: string;
};

export const REQUIEMS: REQUIEM[] = [
  {
    name: REQUIEM_NAME.FASS,
    img: 'https://static.wikia.nocookie.net/warframe/images/2/23/FassRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.JAHU,
    img: 'https://static.wikia.nocookie.net/warframe/images/f/ff/JahuRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.KHRA,
    img: 'https://static.wikia.nocookie.net/warframe/images/d/d8/KhraRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.LOHK,
    img: 'https://static.wikia.nocookie.net/warframe/images/0/06/LohkRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.NETRA,
    img: 'https://static.wikia.nocookie.net/warframe/images/e/e7/NetraRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.RIS,
    img: 'https://static.wikia.nocookie.net/warframe/images/c/c8/RisRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.VOME,
    img: 'https://static.wikia.nocookie.net/warframe/images/5/55/VomeRequiemIcon.png',
  },
  {
    name: REQUIEM_NAME.XATA,
    img: 'https://static.wikia.nocookie.net/warframe/images/5/56/XataRequiemIcon.png',
  },
];
