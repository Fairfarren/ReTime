// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
    presets: [
        [
            'taro',
            {
                framework: 'react',
                ts: true,
            },
        ],
    ],
    plugins: [
        [
            'import',
            {
                libraryName: '@nutui/nutui-react-taro',
                libraryDirectory: 'dist/esm',
                style: 'css',
                camel2DashComponentName: false,
                customName: (name, _file) => {
                    return `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}`
                },
            },
            'nutui-react-taro',
        ],
    ],
}
