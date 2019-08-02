# Tcli
Help generate template files quickly

screenshot:
![](./show.gif)

##  Usage
- 1.Setting
```
{
    "tcli.template": {
        "react": { 
            "root": "/Users/aaa/bbb/tcli-template/index.js", // local template file path
            "type": ".js" // file format
        },

        // 支持简写
        "r": {
            "root": "/Users/aaa/bbb/tcli-template/index.js", // local template file path
            "type": ".js" // file format
        },

        "vue": {
            "root": "/Users/aaa/bbb/tcli-template/index.vue", // local template file path
            "type": ".vue" // file format
        },

        // support shorthand
        "v": {
            "root": "/Users/aaa/bbb/tcli-template/index.vue", // local template file path
            "type": ".vue" // file format
        }

        "md": {
             "root": "/Users/aaa/bbb/tcli-template/README.md", // local template file path
            "type": ".md" // file format
        }
        // More...
    }
}
```

- 2.Command  
`Win: `  `Ctrl + Shift + P`
`Mac: `  `Command + Shift + P`

- 3.Input  
Input `react src index`  
Foramt: `Frame` `Path` `Filename`


## Note
- Please use the App field when you create a template file because the app in the template file is replaced globally
```
<template>
    <div class="wrapper">

    </div>
</template>
<script>
export default {
    name: 'App', // Here use the app, the filename will replace the app here
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

## Next to do
- delete File
- "App" Configurable
- More...

## Finally
> Please help me perfect it if you can. thanks!

## License
MIT
