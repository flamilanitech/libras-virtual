import { iInitials } from '../interfaces/initials.interface';
import { processString } from '../utils/convert-urls';
import { StringsNamesUrl } from './strings-url/strings-names';

const img01 = './../../../assets/imgs/nomes.png';
const img02 = './../../../assets/imgs/numeros.png';
const img03 = './../../../assets/imgs/saudacoes.png';
const img04 = './../../../assets/imgs/modalidades.png';

export const cInitialLibras: iInitials[] = [
  {
    id: '1',
    link: `/${processString(StringsNamesUrl.nomes)}`,
    title: StringsNamesUrl.nomes,
    image: img01,
    active: true,
  },
  {
    id: '2',
    link: `/${processString(StringsNamesUrl.numeros)}`,
    title: StringsNamesUrl.numeros,
    image: img02,
    active: true,
  },
  {
    id: '3',
    link: `/${processString(StringsNamesUrl.saudacoes)}`,
    title: StringsNamesUrl.saudacoes,
    image: img03,
    active: true,
  },
  {
    id: '4',
    link: `/${processString(StringsNamesUrl.modalidades)}`,
    title: StringsNamesUrl.modalidades,
    image: img04,
    active: true,
  },
];
