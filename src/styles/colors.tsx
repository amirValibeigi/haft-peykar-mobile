export type Colors = {
  black4C4C: string;
  black4C4C33: string;
  blackE2E2: string;
  blueGrayDark: string;
  blueLight1: string;
  gray: string;
  pinkEC49: string;
  primary: string;
  primaryDark: string;
  transparent: string;
  whiteEAEA: string;
  whiteEEEE: string;
  whiteF7F7: string;
};

const Colors: Colors = {
  black4C4C: '#4c4c4c',
  black4C4C33: '#4c4c4c33',
  blackE2E2: '#2e2e2e',
  blueGrayDark: '#1A212B',
  blueLight1: '#0EC1DC',
  gray: '#c3c3c3',
  pinkEC49: '#EC498A',
  primary: '#262777',
  primaryDark: '#212269',
  transparent: '#00000000',
  whiteEAEA: '#eaeaea',
  whiteEEEE: '#EEEEEE',
  whiteF7F7: '#F7F7F7',
};

export default Colors;

export const getColor = (
  name: keyof Colors,
  options?: {a?: string | number; r?: string; g?: string; b?: string},
) => {
  let color: any = Colors[name];
  if (options) {
    color = hexColor(color);

    if (options.a) {
      let alpha = options.a;
      if (typeof options.a === 'number') {
        if ((alpha as number) > 1) {
          alpha = (alpha as number) / 100;
        }

        alpha = Math.ceil(255 * (alpha as number)).toString(16);

        if (alpha.length === 1) {
          alpha = '0' + alpha;
        }
      }
      color = color.substring(0, 7) + alpha;
    }
  }

  return color;
};

/**
 * 8 digit hex color
 */
export const hexColor = (c: string) => {
  const vColor = '';
  const len = c.length;

  if (len === 4) {
    return `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}FF`;
  }

  if (len === 5) {
    return `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}${c[4]}${c[4]}`;
  }

  if (len === 7) {
    return `${c}FF`;
  }

  return vColor;
};
