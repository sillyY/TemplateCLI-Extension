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
    "tcli.snippets": {
        [name]: String // local template file path
    }
}
// For example
{
    "tcli.template": {
        "vue": {
            "root": "/AAA/BBB/CCC/index.js" // local template file path
            "type": ".vue" // file format
            "mark": "App" // configurable App
        }
    },
    "tcli.snippets: {
        "reset": "/AAA/BBB/CCC/reset.js" // local template file path
    }
}
```

- 2.Command  
`Win: `  `Ctrl + Shift + P`
`Mac: `  `Command + Shift + P`  
> Input `tcli:[command]`

## Feats
- add  
create a file in the specified directory
>   `tcli:add`

    Input `react src index`  
    Foramt: `Frame` `Path` `Filename`

- remove  
remove a file or a folder
>   `tcli:remove`

    Input `src index.vue`  
    Format `Path` `Filename(contains format)`

- insert  
Insert a local file at the input cursor of the current file
> `tcli:insert`
    Input `reset`
    Format Config

- clone  
Insert a remote file at the input cursor of the current file
> `tcli:clone`   
> use selector

> Remote files originate from the network and may change frequently

- lan
Switch language
> `tcli:lan`  
> use selector

- version  
query current version
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

- You can store your custom files in your computer, insert code when you want.

## Next to do
- public code repository
- More...

## Finally
> Please help me perfect it if you can. thanks!

## License
MIT
