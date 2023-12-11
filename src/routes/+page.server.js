import { dsv } from 'd3'

export function load(){
  const data = dsv(',', "https://gist.githubusercontent.com/stichtingcas/e994cf9910b917efecdd393c161efc3e/raw/75588cbbad86f134925717fc0b11a12a4c0863e1/kansenbedreigingen-def.csv")
  const meta = dsv(',', "https://gist.githubusercontent.com/stichtingcas/569b87d3f105afec3c7f2785a9cee8f1/raw/0bf7a90945a47baeb0cb84b8959b4e315e398617/kansendreigingen-meta.csv")
  return { data, meta };
}

