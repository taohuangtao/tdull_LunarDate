# tdull_LunarDate



## 简介
 本套日历现依赖于jQuery实现，存农历日期选择插件，ui请自行优化，数据是通过数据文件获得（lunar_dat_solar_map.js），不通过算法实现，发现数据错误可自行修改添加。

## 文件描述
  ### JS文件
    * lunar_dat_solar_map.js 数据对象
    * ht_lunar_date_cal.js 插件实现

## 功能列表
  * 支持的浏览器 Chrome 3+ 

## 截图
  ![日历截图](8.png)

## 使用方法

  1. demo

  ```
<!DOCTYPE html>
<html lang="zh-cn">
    
    <head>
        <meta charset="utf-8" /></head>
        
        <script src="./jquery-3.3.1.min.js"></script>
        <script src="./js/lunar_dat_solar_map.js"></script>
        <script src="./js/ht_lunar_date_cal.js"></script>
        
    <body>
        <div style="widht:300px">
            <input id="date" />
        </div>
        <script>
            $(function($) {
                $("#date").tdull_LunarDate()
            });
        </script>
    </body>

</html>
  ```

  详细请参见index.html示例文件。

## Q/A
  联系方式：tao_huangtao@qq.com


## License
The MIT License (MIT)

Copyright (c) 2015 tdul.com

