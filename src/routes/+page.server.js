import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/e66a6a349a41c2621661e253cd58d666/raw/cb32442a8ff637a24db6b663624f9a8948bfb3d1/kansenbedreigingen.csv")
  return { data };
}