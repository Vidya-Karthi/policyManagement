SET PATH=C:\Program Files\nodejs;C:\Users\s-bfserver-p\AppData\Roaming\npm;E:\Git\bin;
call npm install

IF %1%==prod goto IS_PROD
echo building in dev mode
call ng build --deploy-url /isp/scripts/ --base-href /isp/ --outputPath dist/isp-app/scripts
MOVE dist\isp-app\scripts\assets dist\isp-app\
MOVE dist\isp-app\scripts\index.html dist\isp-app\
goto END


:IS_PROD
echo building in prod mode 
call ng build --prod --deploy-url /isp/scripts/ --base-href /isp/ --outputPath dist/isp-app/scripts
MOVE dist\isp-app\scripts\assets dist\isp-app\
MOVE dist\isp-app\scripts\index.html dist\isp-app\
goto END

:END
@rem end build
