import { dsv } from 'd3'

export function load(){
  const data = dsv(';', "https://gist.githubusercontent.com/stichtingcas/e66a6a349a41c2621661e253cd58d666/raw/54025dc6696c48d1ac52f86161fe129bb096de88/kansenbedreigingen.csv")
  return { data };
}