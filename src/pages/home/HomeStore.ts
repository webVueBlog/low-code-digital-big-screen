import {action, makeObservable, observable} from "mobx";

class HomeStore {
    constructor() {
        makeObservable(this, {
            currentMenu: observable,
            setCurrentMenu: action,
        })
        // 在构造函数中，使用makeObservable将currentMenu属性标记为observable（可观察的）
        // 并将setCurrentMenu方法标记为action（动作）
    }

    // 定义一个可观察的属性currentMenu，用于存储当前选中的菜单项，默认值为'local'
    currentMenu: string = 'local';

    // 定义一个动作setCurrentMenu，用于更新currentMenu的值
    setCurrentMenu = (menu: string) => this.currentMenu = menu;

}

const homeStore = new HomeStore();
export default homeStore;