import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './styles.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h('div', { class: 'footer-links' }, [
        h('p', '如果觉得有帮助，欢迎 Star 本项目：'),
        h('a', { href: 'https://github.com/xiaolincoder/CS-Base', target: '_blank', rel: 'noopener' }, 'GitHub'),
      ]),
    })
  },
}
