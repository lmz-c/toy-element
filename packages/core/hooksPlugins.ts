import {each,isFunction} from "lodash-es";

import shell from "shelljs";

export default function hooksPlugins({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}:{
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}){
  return{
    name: "hooks-plugins",
    buildStart(){
      each(rmFiles,(fName: string) => shell.rm("-rf",fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?:Error){
      !err && isFunction(afterBuild) && afterBuild();
    }
  }
}