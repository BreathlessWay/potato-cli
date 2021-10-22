# webpack-template

## script使用

1. `npm start`: 启动 dev 开发环境
2. `npm run build:xxx`: 生成版本信息，进行项目构建
3. `npm run gen:xxx`: 仅进行项目构建
4. `npm run dll`: 生成 dll
   - 项目默认开启了 dll plugin 进行公共文件抽离，如果需要关闭请手动修改 `vue.config.js` 中的配置
   ```
    pluginOptions: {
     lintStyleOnBuild: false,
     dll: {
       // 入口配置
       entry: ['./src/element.ts', 'vue', 'vue-router', 'vuex', 'dayjs'],
       // 输出目录
       output: path.join(__dirname, './dll'),
       // open: process.env.NODE_ENV === 'production',
        open: false,
       cacheFilePath: path.resolve(__dirname, './dll'),
       inject: false,
     },
    },
    ```
5. `npm run lint` && `npm run lint:style`: 代码格式化
6. `npm run pretty`: 供 lint-stage 使用，勿直接使用
7. `npm run am`: git 得提交都应该使用此命令，此命令会启动 commit 的界面交互
8. `npm run eject`: 输出当前 webpack 的配置信息
9. `npm run tree`: 输出目录结构，依赖命令行 tree(可用 brew install tree 安装)
10. `npm run spm`: 分析构建耗时
11. `npm run analyze`: 分析输出文件的大小

## 使用提示

1. 权限指令 `v-role`
   - 由于 `tsx` 不支持 `v-role:[componentRole]={currentRole}` 此种写法，所以
     - `tsx` 中应该写成 `v-role={ value: currentRole, arg: componentRole }`
     - `SFC` 中应该写成 `v-role="{ value: currentRole, arg: componentRole }"`
   - 如果是固定的 `arg` 则可以写成 `v-role:arg="componentRole"`
     - `tsx` 中应该写成 `v-role:BM1={ componentRole }`
     - `SFC` 中应该写成 `v-role:AM1="componentRole"`
   - **以上两种方式二选一，不可混用**
2. `/src/assets/styles` 目录下的样式文件会通过 `style-resources-loader` 自动引入，无需手动引入，所以比如变量，`mixin` 等可以直接使用
3. [vue-cli-plugin-dll](https://github.com/fingerpan/vue-cli-plugin-dll/wiki/zh_cn.md) ，公共模块抽取，[按需抽取](https://github.com/fingerpan/vue-cli-plugin-dll/wiki/zh_cn.md#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD) 在 `element.ts` 中注册需要被抽取的文件
4. 推荐使用 `tsx` 开发，`SFC` 也可以，但不推荐，可以用 [classnames](https://www.npmjs.com/package/classnames) 进行类名组合
   - `SFC` 中类型推断极弱，建议使用 `TSX`，如执意用 `SFC` ，建议将 `script` 外置，通过 `src` 引入
5. 当不使用 `SFC` 时，相应的 `<style scoped>` 也就无法使用了，推荐使用 `css-module`，创建 `xxx.module.less/scss/css` 即可使用
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
6. [关于如何使用jsx，可以参考 vuejs/jsx-next](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)

## 注意 ⚠️

1. 由于使用了 [purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin) ，会剔除无用 css，所以不能使用动态拼装 css 的方式
```html
// 比如此种方式，text-xx 的css样式就会被剔除
<div class="`text-${num}`"></div>
```
2. `vue-devtools` 需要升级才能使用
3. 使用组合式代替 `mixin`


