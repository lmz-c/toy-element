import { makeInstaller } from "@toy-element/utils";
import components from "./components";
import '@toy-element/theme/index.css';

const installer = makeInstaller(components);

export default installer;
export * from "@toy-element/components"