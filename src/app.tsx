import QueryProvider from '@/components/globalConfig/queryProvider'
import { useSystem } from '@/store/system'
import { clearUserInfo, toSetCode } from '@/store/user'
import './app.scss'
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { onThemeChange, useDidShow } from '@tarojs/taro'
import { useEffect } from 'react'

if (typeof globalThis.AbortController === 'undefined') {
    // 简单的空实现，避免报错
    // @ts-ignore
    globalThis.AbortController = () => ({
        abort: () => {},
        signal: {},
    })
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (err) => {
            if (err.code === 'RES_CODE.EXPIRE') {
                clearUserInfo()
                toSetCode()
            }
        },
    }),
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

function App(props) {
    useEffect(() => {
        console.log('===首次进入页面===')

        onThemeChange((e) => {
            useSystem.getState().update({
                theme: e.theme,
            })
        })
    }, [])

    useDidShow((e) => {
        console.log('===新进页面===', e)
    })

    return (
        <QueryClientProvider client={queryClient}>
            <QueryProvider>{props.children}</QueryProvider>
        </QueryClientProvider>
    )
}

export default App
