# vite-template

## script使用

1. `npm start`: 启动 dev 开发环境
2. `npm run build:xxx`: 生成版本信息，进行项目构建
3. `npm run gen:xxx`: 仅进行项目构建
4. `npm run lint:script` && `npm run lint:style`: 代码格式化，供 `lint-stage` 使用，勿直接使用
5. `npm run am`: git 得提交都应该使用此命令，此命令会启动 commit 的界面交互
6. `npm run tree`: 输出目录结构，依赖命令行 `tree` **(可用 brew install tree 安装)**
7. `npm run analyze`: 分析打包出的文件大小

## 使用提示

1. 权限指令 `v-role`
   - 由于 `tsx` 不支持 `v-role:[componentRole]={currentRole}` 此种写法，所以
     - `tsx` 中应该写成 `v-role={ value: currentRole, arg: componentRole }`
     - `SFC` 中应该写成 `v-role="{ value: currentRole, arg: componentRole }"`
   - 如果是固定的 `arg` 则可以写成 `v-role:arg="componentRole"`
     - `tsx` 中应该写成 `v-role:BM1={ componentRole }`
     - `SFC` 中应该写成 `v-role:AM1="componentRole"`
   - **以上两种方式二选一，不可混用**
2. `/src/assets/styles` 目录下以 `global` 开头的样式文件会通过 `vite-plugin-global-style` 自动引入，无需手动引入，所以比如变量，`mixin` 等可以直接使用
3. 推荐使用 `tsx` 开发，`SFC` 也可以，但不推荐，可以用 [classnames](https://www.npmjs.com/package/classnames) 进行类名组合
   - `SFC` 中类型推断极弱，建议使用 `TSX`，如执意用 `SFC` ，建议将 `script` 外置，通过 `src` 引入
4. 当不使用 `SFC` 时，相应的 `<style scoped>` 也就无法使用了，推荐使用 `css-module`，创建 `xxx.module.less/scss/css` 即可使用

   ```
   // style.module.less
   .card { color: red }

   // index.tsx
   import { defineComponent } from 'vue';
   import Style from './style.module.less';

   export default defineComponent({
   setup(props, ctx) {
     return () => <section class={Style.card}>card</section>;
   },
   });
   ```
5. [关于如何使用 jsx，可以参考 vuejs/jsx-next](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)
6. 由于 [vuex] 在 `typescript` 下比较糟糕的表现，所以使用 [pinia](https://pinia.esm.dev/) 替代

## 注意 ⚠️

1. `vue-devtools` 需要升级才能使用
2. 使用组合式代替 `mixin`
