# Tcli 说明文档

![](./show.gif)

## 概论

帮助快速生成自定义模板文件

## Usage

## 1.设置 VSCode settings.json, 添加相关配置项

```
{
    "tcli.template": {
        "react": {
            "root": "/Users/aaa/bbb/tcli模板/index.js", //本地模板文件路径
            "type": ".js" //文件格式
        },
        "vue": {
            "root": "/Users/aaa/bbb/tcli模板/index.vue", //本地模板文件路径
            "type": ".vue" //文件格式
        }
        //更多...
    }
}
```
### 2.按下`ctrl+shift+P(`⇧`+`⌘`+`P`)`,输入`>tcli:create`，会弹出一个输入框

### 3.在输入框内输入`react src index `
> 格式： `框架` `目录` `文件名`

## Note
1.由于会全局替换模板文件中的App,故建立模板文件时，请使用App字段
```
<template>
    <div class="wrapper">

    </div>
</template>
<script>
export default {
    name: 'App', // 这里请使用App，生成的文件会替换这里的App
    data() {
        return {

        }
    },
    mounted() {
        
    },
    methods: {

    }
}
</script>
```

## License
MIT
