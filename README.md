# Tcli
Help handle template files quickly!

screenshot:
![](./show.gif)

##  Usage
- 1.Setting
```
{
    "tcli.template": {
        [name]: {
            "root": String // local template file path
            "type": String // file format
            "mark": String // configurable App
        }
    }
}
// For example
{
    "tcli.template": {
        'vue': {
            "root": '/Users/AAA/BBB/CCC/index.js' // local template file path
            "type": '.vue' // file format
            "mark": 'App' // configurable App
        }
    }
}
```

- 2.Command  
`Win: `  `Ctrl + Shift + P`
`Mac: `  `Command + Shift + P`  
> Input `tcli:[command]`

## Feats
- add  
>   `tcli:add`

    Input `react src index`  
    Foramt: `Frame` `Path` `Filename`

- remove
>   `tcli:remove`

    Input `src index.vue`  
    Format `Path` `Filename(contains format)`

- version
>   `tcli:version`

    Not Input


## Note
- Please use the App field when you create a template file because the app in the template file is replaced globally
```
<template>
    <div class="wrapper">

    </div>
</template>
<script>
export default {
    name: 'App', // You can configure your 'App', the filename will replace this here.
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

- If you want delete folder，please input `src/ `(`path`+ `space`)

## Next to do
- File load
- More...

## Finally
> Please help me perfect it if you can. thanks!

## License
MIT
