@echo off
@title Lily's test toy
@echo welcome to use the test tools
::这是注释,参数设置
::set times=10
::set pageUrl=http://www.baiud.com/
@set /p pageUrl=请输入需要测试的网页地址:
@set /p times=请输入测试次数:
@set /a timesTmp=%times%
@set aveValue=0
@del testResult.txt
@echo 对%pageUrl%进行加载测试，测试次数为%times%次，测试开始时间%date% %time%>testResult.txt
@echo 清空数据...
@echo 开始加载...
@:repeatDot
@phantomjs ../../demo/speedLoading.js %pageUrl% | find "ms" >>testResult.txt
::phantomjs ../../demo/speedLoading.js %pageUrl%
::phantomjs ../../demo/speedLoading.js>>testResult.txt
@set /a times-=1
@echo 剩余%times%次
@if %times% equ 0 goto outer
::if goto two
@goto repeatDot
@:outer
@ping 127.1 -n 5 >nul
@echo 平均加载时间为：
@for /f "tokens=6 delims=, " %%i in (testResult.txt) do set /a aveValue+=%%i
set /a aveValue=aveValue/timesTmp
echo %aveValue% ms
echo aveTime is %aveValue% ms>>testResult.txt
pause