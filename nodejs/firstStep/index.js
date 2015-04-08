//1.安装
//2.一种使用方法，控制台直接输入node，进入>环境，可执行javascript代码，输入console.log()等。
//3.另一种使用方法，node ../hello.js ，执行该js文件。

//案例一：文件的输入与输出
//读取某log文件
//步骤
//cd 当前目录
//node my_parse.js

//案例二：
//nodejs典型模式是使用异步回调，js先做事，做完后会调用你的回调函数。
//在你等待回调函数执行过程中，Node可继续执行其他事务，不必被阻塞直到该请求完毕
//所以对于web服务器很有效，在你等待数据库返回过程中，node可以处理更多请求。以很小的开销来处理成千上万个并行连接。

//搭建HTTP服务器
//node my_web_server.js
//浏览器输入localhost:8080即得到hello world

//案例三：express框架
//简单创建网站，使用npm命令。访问社区的庞大模块集，包括Express
//cd  需要下载的文件夹
//安装单个	npm install express
//或通过package.json安装多个依赖

//静态文件服务器
// node my_static_file_server.js 访问所设定的文件夹中的内容。

//案例四：组织代码









