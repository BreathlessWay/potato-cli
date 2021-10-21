# Potato

## 简介

1. 安装方式 `npm i @breathlessway/potato-cli -g`
2. 安装完成后执行 `potato -i <projectName>`  ，按照提示进行输入，即可创建一个项目
3. 模版集成了通用配置，`env` 环境变量需要开发者手动填写
4. 在使用 `potato` 创建的项目中可以使用命令方便的创建组件、路由、数据集，但是需要按照 `potato` 初始化的结构目录使用
5. `potato -d` ，可以启动本地文档服务
6. `potato -u` ，可以升级 `potato-cli`

## 命令介绍

1. `potato -ac <componentName>` : 创建组件
   - 组件名需按照 `vue` 的要求，使用 `camelCase or kebab-case`
   - 组件属性可以参考 [组件设计模式-原子化设计](https://atomicdesign.bradfrost.com/table-of-contents/)
   - 组件类型可以选择 `TSX`（推荐）和 `SFC`（单文件组件即 `.vue` 文件）
   - 组件样式模块化在 `TSX` 文件下使用 `css-module` ，在 SFC 下使用 `scoped`
   - 暂不支持自定义组件路径
2. `potato -ar <routerName>` : 创建路由
   - 支持创建新的路由文件，当路由文件已存在时会在已有路由文件中添加子路由
   - 添加子路由通过 `babel` 解析注入
3. `potato -as <storeName>` : 创建数据集
   - 数据集默认是使用 `namespace` 的
   - 目前 `vuex4` 在 `Typescript` 下的类型推断功能很弱，需要自己手动添加类型
4. `potato` 所初始化出的 `webpack` 项目是对 `@vue/cli` 初始化出项目的一层包装，所以也可以使用 `@vue/cli` 的命令

## 注意 ⚠️

1. macos 和 windows 是忽略文件名称大小写的，所以务必注意创建组件/路由/数据集时的文件名称大小写
2. 文件路径都需要是 `POSIX` 风格的
3. 路由和数据集都是依赖 `require.context / import.mate.globEager` 自动注册的，所以必须严格按照现有目录结构
   - 路由文件不能嵌套，只能为第一层文件，作为路由信息文件
   ```
   ├── router/
   │   ├── index.ts
   │   ├── home.ts
   │   └── about.ts
   │   ...
   ```
   - 数据集必须为一层目录，必须包含 `index.ts` 文件作为数据源，`type.ts` 为 `action name`
   ```
   ├── store/
   │   ├── index.ts
   │   ├── home
   │   │   ├── index.ts
   │   │   └── type.ts
   │   └── about
   │       ├── index.ts
   │       └── type.ts
   │   ...
   ```
4. `node` 的最低版本 `v14.14.0`，`npm` 版本不能高于 **6**
5. 在使用 `SourceTree` 提交代码时如果出现了 `Can't find npm` ，在用户根目录下创建 `.huskyrc` 文件，并在文件中写入如下内容，可以使用 `which node` 查找 `node` 位置
   ```
   # .huskyrc
   export PATH="/Users/admin/.nvm/versions/node/v14.17.6/bin/:$PATH"
   ```
6. 通过在项目的 `package.json` 中添加了一些字段做标识
   - `css` 字段标识当前使用的是 `less|scss`
   - `browser` 字段标识当前是web端还是h5端
   - `path` 为项目路由端的前缀和构建时的 `publicPath` 默认使用项目名称，如果有特殊字符，比如 `@ / \` 等时，需要手动修改

> Tips

1. `__dirname` 是所执行的 `JavaScript` 文件所在的路径，`process.cwd()` 是执行命令所在的路径
