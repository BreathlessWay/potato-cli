# vite-template

## script使用

1. `npm start`: 启动 dev 开发环境
2. `npm run build:xxx`: 生成版本信息，进行项目构建
3. `npm run gen:xxx`: 仅进行项目构建
4. `npm run lint:script` && `npm run lint:style`: 代码格式化，供 `lint-stage` 使用，勿直接使用
5. `npm run am`: git 得提交都应该使用此命令，此命令会启动 commit 的界面交互
6. `npm run tree`: 输出目录结构，依赖命令行 `tree` **(可用 brew install tree 安装)**
7. `npm run analyze`: 分析打包出的文件大小
8. `npm run type`: 调用 `graphql` 接口生成 `schema.json` 文件，然后根据 `api` 目录下定义的 `xxx.graphql` 文件生成类型文件 `type.ts`

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
   - `SFC` 中类型推断较弱，建议使用 `TSX`
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
6. 由于 `vuex` 在 `typescript` 下的糟糕表现，建议使用 [pinia](https://pinia.esm.dev/) 
7. 由于在入口文件进行了 `axios` 注册，所以在页面中直接 `import axios from 'axios'` 使用

## Graphql

1. 根据后端 `schema` 以及查询条件自动生成类型文件
	- `npm install -g apollo-codegen`：全局安装代码生成器，**必须全局安装**
	- `npm run schema`：获取后端定义的 `schema`
	- `npm run type`：根据 `.graphql` 文件生成类型文件 `type.ts`
2. [Vue Apollo](https://v4.apollo.vuejs.org/zh-cn/guide-composable/)
3. 查询 `api` 都在 `src/apis` 目录下
	- `index.ts`：查询接口调用文件
	- `*.graphql`：查询所使用的 `graphql` 语句，主要用来在编辑器中直接启动，调试接口，生成类型
	- `type.ts`：查询参数，以及返回结果的类型文件，根据 `*.graphql` 以及后端 `schema` 自动生成
4. 禁止直接从 `@vue/apollo-composable` 中调用 `useQuery` 等方法
  - `useQuery` 从 `src/hooks/query` 中调用 `useBasicQuery`
  - 如需要其他 `useMutation` 等方法，自行在 `src/hooks` 中添加使用

## 注意 ⚠️

1. `vue-devtools` 需要升级才能使用
2. 使用组合式代替 `mixin`
