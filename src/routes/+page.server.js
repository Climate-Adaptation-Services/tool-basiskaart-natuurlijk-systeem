import { dsv } from 'd3'

export function load(){
  const data = dsv(',', "https://gist.githubusercontent.com/stichtingcas/e994cf9910b917efecdd393c161efc3e/raw/f1b92c78ed3fbe930ea70f8060dac0dceba37d11/kansenbedreigingen-def.csv")
  const meta = dsv(',', "https://gist.githubusercontent.com/stichtingcas/569b87d3f105afec3c7f2785a9cee8f1/raw/979d916fa328a3f469a59df7881f13a36196e529/kansendreigingen-meta.csv")
  return { data, meta };
}

