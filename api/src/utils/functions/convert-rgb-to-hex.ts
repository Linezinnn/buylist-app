export const convertRGBToHEXColor = (rgb: string) => {
   const [ r, g, b ] = rgb
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
   
   return '#' + [Number(r), Number(g), Number(b)]
      .map(x => x
         .toString(16)
         .padStart(2, '0'))
         .join('')
}