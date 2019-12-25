export interface Config {
    views: ViewsConfig
}

export interface ViewsConfig {
    online: OnlineViewConfig
}

export interface OnlineViewConfig {
    enabled: boolean
}