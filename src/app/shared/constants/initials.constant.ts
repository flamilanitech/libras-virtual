import { iInitials } from '../interfaces/initials.interface';
import { processString } from '../utils/convert-urls';
import { StringsNamesUrl } from './strings-url/strings-names';

const img01 = './../assets/imgs/datilologia.png';
const img02 = './../assets/imgs/libras.png';
const img05 = './../assets/imgs/computer-vison-b.png';
const img07 = './../assets/imgs/dialogo.png';
const img08 = './../assets/imgs/transcricao-voz.png';
const img09 = './../assets/imgs/mapas.png';
const img10 = './../assets/imgs/jogos.png';

export const cINITIALS: iInitials[] = [
  {
    id: '1',
    link: `/${processString(StringsNamesUrl.datilologia)}`,
    title: StringsNamesUrl.datilologia,
    image: img01,
    active: true,
  },
  {
    id: '2',
    link: `/${processString(StringsNamesUrl.fundamentoLibras)}`,
    title: StringsNamesUrl.fundamentoLibras,
    image: img02,
    active: true,
  },
  {
    id: '3',
    link: `/${processString(StringsNamesUrl.dialogo)}`,
    title: StringsNamesUrl.dialogo,
    image: img07,
    active: true,
  },
  {
    id: '4',
    link: `/${processString(StringsNamesUrl.glossario)}`,
    title: StringsNamesUrl.glossario,
    image: img01,
    active: false,
  },
  {
    id: '5',
    link: `/${processString(StringsNamesUrl.visorComputacional)}`,
    title: StringsNamesUrl.visorComputacional,
    image: img05,
    active: true,
  },
  {
    id: '6',
    link: `/${processString(StringsNamesUrl.assistenteVoz)}`,
    title: StringsNamesUrl.assistenteVoz,
    image: img08,
    active: true,
  },
  {
    id: '7',
    link: `/${processString(StringsNamesUrl.jogos)}`,
    title: StringsNamesUrl.jogos,
    image: img10,
    active: true,
  },
  {
    id: '8',
    link: `/${processString(StringsNamesUrl.mapas)}`,
    title: StringsNamesUrl.mapas,
    image: img09,
    active: false,
  },
];

const indexedINITIALS: { [id: string]: iInitials } = cINITIALS.reduce(
  (acc: { [key: string]: iInitials }, current) => {
    acc[current.id] = current;
    return acc;
  },
  {}
);

console.log(indexedINITIALS);
