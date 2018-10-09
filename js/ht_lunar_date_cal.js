
/**
 * 时间格式化
 */
function dateFormat(fmt, date) { //author: meizz   
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
$.fn.tdull_LunarDate =function(date){
    
    var $this = $(this);
        var this_lunar_input_target = this[0];
        console.log(this_lunar_input_target);
        $("body").bind("click",function(e){
            if(this_lunar_input_target == e.target){
                return;
            }
            var target  = $(e.target);
            if(target.closest(".lunar_select_div").length == 0){
                $(".lunar_select_div").hide();
            }
        })
        var all_year = {};
        var all_year_solar = {};
        for(var i in lunar_dat_solar_map){
            var item = lunar_dat_solar_map[i];
            if(typeof all_year[item[0]] === 'undefined'){
                all_year[item[0]] = {};
                all_year[item[0]][item[1]] = [item];
            }else{
                if(typeof all_year[item[0]][item[1]] === 'undefined'){
                    all_year[item[0]][item[1]] = [item];
                }else {
                    all_year[item[0]][item[1]].push(item);
                }
            }

            var solll_sdf = item[3].split(" ")[0].split("/");
            var solarstr = solll_sdf[0];
            if(Number(solll_sdf[1])<10){
                solarstr += '-0'+solll_sdf[1];
            }else{
                solarstr += '-'+solll_sdf[1];
            }
            if(Number(solll_sdf[2])<10){
                solarstr += '-0'+solll_sdf[2];
            }else{
                solarstr += '-'+solll_sdf[2];
            }
            all_year_solar[solarstr] = item[0]+'-'+item[1]+'-'+item[4];
        }
        var years_html = [];
        for(var k in all_year){
            years_html.push( '<option value="'+k+'">'+k+'</option>')
        }
        var solar_lunar_month_map = {
            '01':'正月',
            '02':'二月',
            '03':'三月',
            '04':'四月',
            '05':'五月',
            '06':'六月',
            '07':'七月',
            '08':'八月',
            '09':'九月',
            '10':'十月',
            '11':'冬月',
            '12':'腊月',
        }
        var months_html = [];
        //写入月份数据到下拉列表
        for(let i =1;i<13;i++){
            let k = i<10?'0'+String(i):String(i);
            var smonth = solar_lunar_month_map[k];
            months_html.push('<option value="'+k+'">'+smonth+'</option>');
        }
        var lunar_html ='<style>.lunar_select_div .lunar_select_day li:hover{background:red}.lunar_select_div .lunar_select_day li{display:inline-block;padding:3px}</style>' +
                '<div class="lunar_select_div" style="position: absolute;background: #fff;z-index: 999;padding: 5px;border:solid 1px #aaa;width:300px;display:none">' +
                '<div style="background: #eee;padding: 3px;">' +
                '年<select class="lunar_select_year">'+years_html.join('')+'</select>' +
                '月<select class="lunar_select_month">'+months_html.join('')+'</select>' +
                '</div>' +
                '<div><ul class="lunar_select_day" style="padding:0"><li><label><input name="select-month-day"/>初一</label></li></ul></div>'+
                '</div>';
        $this.after(lunar_html);
        
        
        //农历日历
        $(this).on("click",function(e){
            $this.parent().find(".lunar_select_div").show();
            
            
            var this_val_str = $this.val();
            
            if(!this_val_str){
                //没有默认时间，初始化当前时间
                var now_date = new Date();
                var now_date_str = dateFormat('yyyy-MM-dd',now_date);
            
            
                var lunar_yyyy_str = all_year_solar[now_date_str].split('-');
                console.log(lunar_yyyy_str);
                
                $(".lunar_select_div .lunar_select_year").val(lunar_yyyy_str[0]);
                $(".lunar_select_div .lunar_select_month").val(lunar_yyyy_str[2]);
                
                $(".lunar_select_div .lunar_select_month").trigger("change");
            }else{
                var lunar_yyyy_str = this_val_str.split('-');
                console.log(lunar_yyyy_str);
                $(".lunar_select_div .lunar_select_year").val(lunar_yyyy_str[0]);
                $(".lunar_select_div .lunar_select_month").val(lunar_yyyy_str[1]);
                
                $(".lunar_select_div .lunar_select_month").trigger("change");
            }
        });
        $("body").on("change",".lunar_select_div .lunar_select_year",function(){
            let selectedYear = $(this).val();
            console.log(selectedYear);
            $(".lunar_select_div .lunar_select_month").trigger("change");
        });
        
        
        $("body").on("change",".lunar_select_div .lunar_select_month",function(){
            var $ppppppp = $(this).parents(".lunar_select_div");
            var selectedYear = $ppppppp.find(".lunar_select_year").val();
            var select_month_val = $ppppppp.find(".lunar_select_month").val();
            console.log(select_month_val);
            var selectedMonth = solar_lunar_month_map[select_month_val];
            console.log(selectedMonth);
            var _selectedMonth = all_year[selectedYear][selectedMonth];
            console.log(_selectedMonth);
            var _lunar_select_day_html = [];
            for(var k in _selectedMonth){
                var day = _selectedMonth[k][2].substring(8,_selectedMonth[k][2].length);
                _lunar_select_day_html.push('<li><label><input type="radio" name="select-month-day" value="'+_selectedMonth[k][4]+'"/>'+day+'</label></li>');
            }
            $ppppppp.find(".lunar_select_day").html(_lunar_select_day_html.join(""));
        });
        $("body").on("click",'.lunar_select_div .lunar_select_day input',function(){
            var val = $(this).val();
            console.log(val);
            var selectedYear = $(".lunar_select_div .lunar_select_year").val();
            $this.val(selectedYear+'-'+val);
            $this.parent().find(".lunar_select_div").hide();
        })
    };