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

export enum REQUIEM_KNOWN_STATUS {
  UNKNOWN = 'UNKNOWN',
  KNOWN = 'KNOWN',
}

export enum REQUIEM_USAGE_STATUS {
  UNKNOWN = 'UNKNOWN',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface Requiem {
  name: REQUIEM_NAME;
  image: string;
  description?: string;

  status: REQUIEM_KNOWN_STATUS;
  usage: [REQUIEM_USAGE_STATUS, REQUIEM_USAGE_STATUS, REQUIEM_USAGE_STATUS];
}

export function createRequiem(name: REQUIEM_NAME, image: string, description?: string): Requiem {
  const status = REQUIEM_KNOWN_STATUS.UNKNOWN;

  const usage: Requiem['usage'] = [
    REQUIEM_USAGE_STATUS.UNKNOWN,
    REQUIEM_USAGE_STATUS.UNKNOWN,
    REQUIEM_USAGE_STATUS.UNKNOWN,
  ];

  return {
    name,
    image,
    description,
    status,
    usage,
  };
}
