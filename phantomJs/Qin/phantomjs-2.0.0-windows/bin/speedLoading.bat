@echo off
@title Lily's test toy
@echo welcome to use the test tools
::����ע��,��������
::set times=10
::set pageUrl=http://www.baiud.com/
@set /p pageUrl=��������Ҫ���Ե���ҳ��ַ:
@set /p times=��������Դ���:
@set /a timesTmp=%times%
@set aveValue=0
@del testResult.txt
@echo ��%pageUrl%���м��ز��ԣ����Դ���Ϊ%times%�Σ����Կ�ʼʱ��%date% %time%>testResult.txt
@echo �������...
@echo ��ʼ����...
@:repeatDot
@phantomjs ../../demo/speedLoading.js %pageUrl% | find "ms" >>testResult.txt
::phantomjs ../../demo/speedLoading.js %pageUrl%
::phantomjs ../../demo/speedLoading.js>>testResult.txt
@set /a times-=1
@echo ʣ��%times%��
@if %times% equ 0 goto outer
::if goto two
@goto repeatDot
@:outer
@ping 127.1 -n 5 >nul
@echo ƽ������ʱ��Ϊ��
@for /f "tokens=6 delims=, " %%i in (testResult.txt) do set /a aveValue+=%%i
set /a aveValue=aveValue/timesTmp
echo %aveValue% ms
echo aveTime is %aveValue% ms>>testResult.txt
pause