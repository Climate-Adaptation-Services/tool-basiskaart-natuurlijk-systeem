import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/e66a6a349a41c2621661e253cd58d666/raw/87ff3a81c54bec15a72b4ce09c89104fe5ecb54d/kansenbedreigingen.csv")
  return { data };
}