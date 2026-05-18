import { defineConfig } from 'vitepress'

const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  title: '小林Coding - 图解计算机基础',
  description: '计算机网络、操作系统、计算机组成、数据库 - 1000张图解 + 50万字',
  base: base,
  lang: 'zh-CN',

  // README.md 引用外部站点链接，忽略死链接检查
  // README.md 引用外部站点链接，忽略死链接检查
  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '图解网络', link: '/network/' },
      { text: '图解系统', link: '/os/' },
      { text: '图解MySQL', link: '/mysql/' },
      { text: '图解Redis', link: '/redis/' },
      { text: '学习心得', link: '/cs-learn/' },
    ],
    sidebar: {
      '/cs-learn/': [
        {
          text: '计算机基础学习',
          items: [
            { text: '计算机基础学习路线', link: '/cs_learn.md' },
            { text: '如何感受计算机之美', link: '/feel_cs.md' },
            { text: '看计算机书籍的心态', link: '/look_book.md' },
          ],
        },
      ],
      '/mysql/': [
        {
          text: 'MySQL基础',
          items: [
            { text: '执行一条select语句', link: '/mysql/base/how_select.md' },
            { text: 'MySQL一行记录存储', link: '/mysql/base/row_format.md' },
          ],
        },
        {
          text: '索引',
          items: [
            { text: '索引常见面试题', link: '/mysql/index/index_interview.md' },
            { text: '从数据页看B+树', link: '/mysql/index/page.md' },
            { text: '为什么MySQL采用B+树', link: '/mysql/index/why_index_chose_bpuls_tree.md' },
            { text: '单表不超过2000W行', link: '/mysql/index/2000w.md' },
            { text: '索引失效有哪些', link: '/mysql/index/index_lose.md' },
            { text: 'like "%x" 索引失效吗', link: '/mysql/index/index_issue.md' },
            { text: 'count(*)和count(1)', link: '/mysql/index/count.md' },
          ],
        },
        {
          text: '事务',
          items: [
            { text: '事务隔离级别实现', link: '/mysql/transaction/mvcc.md' },
            { text: '可重复读解决幻读了吗', link: '/mysql/transaction/phantom.md' },
          ],
        },
        {
          text: '锁',
          items: [
            { text: 'MySQL有哪些锁', link: '/mysql/lock/mysql_lock.md' },
            { text: 'MySQL怎么加锁', link: '/mysql/lock/how_to_lock.md' },
            { text: 'update没加索引锁全表', link: '/mysql/lock/update_index.md' },
            { text: 'MySQL死锁了怎么办', link: '/mysql/lock/deadlock.md' },
            { text: '字节面试死锁分析', link: '/mysql/lock/show_lock.md' },
          ],
        },
        {
          text: '日志',
          items: [
            { text: 'undo log、redo log、binlog', link: '/mysql/log/how_update.md' },
          ],
        },
        {
          text: '内存',
          items: [
            { text: 'Buffer Pool详解', link: '/mysql/buffer_pool/buffer_pool.md' },
          ],
        },
      ],
      '/network/': [
        {
          text: '网络基础',
          items: [
            { text: 'TCP/IP网络模型', link: '/network/1_base/tcp_ip_model.md' },
            { text: '键入网址到网页显示', link: '/network/1_base/what_happen_url.md' },
            { text: 'Linux如何收发网络包', link: '/network/1_base/how_os_deal_network_package.md' },
          ],
        },
        {
          text: 'HTTP',
          items: [
            { text: 'HTTP常见面试题', link: '/network/2_http/http_interview.md' },
            { text: 'HTTP/1.1如何优化', link: '/network/2_http/http_optimize.md' },
            { text: 'HTTPS RSA握手', link: '/network/2_http/https_rsa.md' },
            { text: 'HTTPS ECDHE握手', link: '/network/2_http/https_ecdhe.md' },
            { text: 'HTTPS如何优化', link: '/network/2_http/https_optimize.md' },
            { text: 'HTTP/2牛逼在哪', link: '/network/2_http/http2.md' },
            { text: 'HTTP/3强势来袭', link: '/network/2_http/http3.md' },
            { text: '为什么有RPC', link: '/network/2_http/http_rpc.md' },
            { text: '为什么有WebSocket', link: '/network/2_http/http_websocket.md' },
          ],
        },
        {
          text: 'TCP',
          items: [
            { text: '三次握手与四次挥手', link: '/network/3_tcp/tcp_interview.md' },
            { text: '重传、滑动窗口、流量控制', link: '/network/3_tcp/tcp_feature.md' },
            { text: 'TCP半连接和全连接队列', link: '/network/3_tcp/tcp_queue.html' },
            { text: '如何优化TCP', link: '/network/3_tcp/tcp_optimize.html' },
            { text: 'TCP初始化序列号', link: '/network/3_tcp/isn_deff.md' },
            { text: 'SYN报文被丢弃', link: '/network/3_tcp/syn_drop.md' },
            { text: '乱序的FIN包处理', link: '/network/3_tcp/out_of_order_fin.md' },
            { text: 'TIME_WAIT收到SYN', link: '/network/3_tcp/time_wait_recv_syn.html' },
            { text: 'TCP断电和进程崩溃', link: '/network/3_tcp/tcp_down_and_crash.md' },
            { text: '拔掉网线TCP连接', link: '/network/3_tcp/tcp_unplug_the_network_cable.html' },
            { text: 'tcp_tw_reuse关闭原因', link: '/network/3_tcp/tcp_tw_reuse_close.html' },
            { text: 'TLS和TCP同时握手', link: '/network/3_tcp/tcp_tls.html' },
            { text: 'TCP和HTTP Keepalive', link: '/network/3_tcp/tcp_http_keepalive.md' },
            { text: 'TCP协议缺陷', link: '/network/3_tcp/tcp_problem.html' },
            { text: '基于UDP可靠传输', link: '/network/3_tcp/quic.md' },
            { text: 'TCP和UDP同端口', link: '/network/3_tcp/port.md' },
            { text: '没有listen能建连接吗', link: '/network/3_tcp/tcp_no_listen.html' },
            { text: '没有accept能建连接吗', link: '/network/3_tcp/tcp_no_accpet.md' },
            { text: 'TCP数据一定不丢吗', link: '/network/3_tcp/tcp_drop.md' },
            { text: '四次挥手变三次', link: '/network/3_tcp/tcp_three_fin.html' },
            { text: '序列号和确认号变化', link: '/network/3_tcp/tcp_seq_ack.html' },
          ],
        },
        {
          text: 'IP',
          items: [
            { text: 'IP基础知识全家桶', link: '/network/4_ip/ip_base.html' },
            { text: 'ping工作原理', link: '/network/4_ip/ping.html' },
            { text: '断网能ping通127吗', link: '/network/4_ip/ping_lo.html' },
          ],
        },
        {
          text: '学习心得',
          items: [
            { text: '计算机网络怎么学', link: '/network/5_learn/learn_network.html' },
            { text: '画图经验分享', link: '/network/5_learn/draw.html' },
          ],
        },
      ],
      '/os/': [
        {
          text: '硬件结构',
          items: [
            { text: 'CPU如何执行程序', link: '/os/1_hardware/how_cpu_run.html' },
            { text: '磁盘比内存慢几万倍', link: '/os/1_hardware/storage.html' },
            { text: '让CPU跑更快的代码', link: '/os/1_hardware/how_to_make_cpu_run_faster.html' },
            { text: 'CPU缓存一致性', link: '/os/1_hardware/cpu_mesi.html' },
            { text: 'CPU如何执行任务', link: '/os/1_hardware/how_cpu_deal_task.html' },
            { text: '什么是软中断', link: '/os/1_hardware/soft_interrupt.html' },
            { text: '0.1+0.2为什么不等于0.3', link: '/os/1_hardware/float.html' },
          ],
        },
        {
          text: '操作系统结构',
          items: [
            { text: 'Linux内核vsWindows内核', link: '/os/2_os_structure/linux_vs_windows.html' },
          ],
        },
        {
          text: '内存管理',
          items: [
            { text: '为什么要有虚拟内存', link: '/os/3_memory/vmem.html' },
            { text: 'malloc如何分配内存', link: '/os/3_memory/malloc.html' },
            { text: '内存满了怎么办', link: '/os/3_memory/mem_reclaim.html' },
            { text: '4GB内存申请8G', link: '/os/3_memory/alloc_mem.html' },
            { text: '避免预读失效和缓存污染', link: '/os/3_memory/cache_lru.html' },
            { text: 'Linux虚拟内存管理', link: '/os/3_memory/linux_mem.html' },
            { text: 'Linux物理内存管理', link: '/os/3_memory/linux_mem2.html' },
          ],
        },
        {
          text: '进程管理',
          items: [
            { text: '进程线程基础知识', link: '/os/4_process/process_base.html' },
            { text: '进程间通信方式', link: '/os/4_process/process_commu.html' },
            { text: '多线程冲突怎么办', link: '/os/4_process/multithread_sync.html' },
            { text: '怎么避免死锁', link: '/os/4_process/deadlock.html' },
            { text: '悲观锁和乐观锁', link: '/os/4_process/pessim_and_optimi_lock.html' },
            { text: '最多创建多少线程', link: '/os/4_process/create_thread_max.html' },
            { text: '线程崩溃进程会崩溃吗', link: '/os/4_process/thread_crash.html' },
          ],
        },
        {
          text: '调度算法',
          items: [
            { text: '进程调度/页面置换/磁盘调度', link: '/os/5_schedule/schedule.html' },
          ],
        },
        {
          text: '文件系统',
          items: [
            { text: '文件系统全家桶', link: '/os/6_file_system/file_system.html' },
            { text: '进程崩溃已写入数据丢失吗', link: '/os/6_file_system/pagecache.html' },
          ],
        },
        {
          text: '设备管理',
          items: [
            { text: '键盘敲入A字母发生了什么', link: '/os/7_device/device.html' },
          ],
        },
        {
          text: '网络系统',
          items: [
            { text: '什么是零拷贝', link: '/os/8_network_system/zero_copy.html' },
            { text: 'I/O多路复用', link: '/os/8_network_system/selete_poll_epoll.html' },
            { text: 'Reactor和Proactor', link: '/os/8_network_system/reactor.html' },
            { text: '一致性哈希', link: '/os/8_network_system/hash.html' },
          ],
        },
        {
          text: 'Linux命令',
          items: [
            { text: '查看网络性能指标', link: '/os/9_linux_cmd/linux_network.html' },
            { text: '画图经验分享', link: '/os/9_linux_cmd/pv_uv.html' },
          ],
        },
        {
          text: '学习心得',
          items: [
            { text: '操作系统怎么学', link: '/os/10_learn/learn_os.html' },
            { text: '画图经验分享', link: '/os/10_learn/draw.html' },
          ],
        },
      ],
      '/redis/': [
        {
          text: 'Redis基础',
          items: [
            { text: 'Redis常见面试题', link: '/redis/base/redis_interview.html' },
          ],
        },
        {
          text: '数据类型',
          items: [
            { text: '数据类型和应用场景', link: '/redis/data_struct/command.html' },
            { text: 'Redis数据结构', link: '/redis/data_struct/data_struct.html' },
          ],
        },
        {
          text: '持久化',
          items: [
            { text: 'AOF持久化实现', link: '/redis/storage/aof.html' },
            { text: 'RDB快照实现', link: '/redis/storage/rdb.html' },
          ],
        },
        {
          text: '功能',
          items: [
            { text: '过期删除和内存淘汰策略', link: '/redis/module/strategy.html' },
          ],
        },
        {
          text: '高可用',
          items: [
            { text: '主从复制实现', link: '/redis/cluster/master_slave_replication.html' },
            { text: '为什么要有哨兵', link: '/redis/cluster/sentinel.html' },
          ],
        },
        {
          text: '缓存',
          items: [
            { text: '缓存雪崩、击穿、穿透', link: '/redis/cluster/cache_problem.html' },
            { text: '数据库和缓存一致性', link: '/redis/architecture/mysql_redis_consistency.html' },
          ],
        },
      ],
      '/reader-note/': [
        {
          text: '读者心得',
          items: [
            { text: '读者心得', link: '/reader_nb/README.md' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/desyang-hub/CS-Base' }
    ],

    footer: {
      message: '小林Coding - 图解计算机基础',
      copyright: 'Copyright © 2024 小林Coding',
    },

    search: {
      provider: 'local',
    },
  },

  markdown: {
    image: {
      figure: true,
    },
  },

  head: [
    // ['link', { rel: 'icon', href: '/CS-Base/logo.ico', type: 'image/x-icon' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: '计算机网络、操作系统、计算机组成、数据库 - 1000张图解 + 50万字' }],
    ['meta', { name: 'keywords', content: '计算机网络,操作系统,计算机组成,数据库,MySQL,Redis,图解,小林Coding' }],
    ['script', {}, `
      if (location.hostname === 'xiaolincoding.com') {
        const script = document.createElement('script');
        script.defer = true;
        script.src = 'https://xiaolincoding.com/gpt.js';
        document.head.appendChild(script);
      }
    `],
  ],
})
