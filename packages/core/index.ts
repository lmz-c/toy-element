import { makeInstaller } from "@toy-element/utils";
import components from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import '@toy-element/theme/index.css';

const installer = makeInstaller(components);
// icon在调试的入口文件中引入
// 这样做的目的是为了减少打包体积
// 如果用户不需要icon组件，可以不引入fontawesome的图标库
library.add(fas);
export default installer;
export * from "../components"