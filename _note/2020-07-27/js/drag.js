//HTML渲染完后再加载
window.onload = function () {
  var oPanel = document.getElementById('loginPanel'); //登录界面
  var oTitle = document.getElementsByClassName('login_logo_webqq')[0]; //标题栏
  var oStatus = document.getElementById('loginState'); //状态栏
  var oClock = document.getElementById('ui_boxyClose'); //关闭按钮

  //按住标题栏事件
  oTitle.onmousedown = function () {
    var disX = event.clientX - oPanel.offsetLeft; //鼠标点击处和界面左边界的距离
    var disY = event.clientY - oPanel.offsetTop; //鼠标点击处和界面上边界的距离
    //鼠标移动事件：触发登陆界面跟随
    document.onmousemove = function (event/*传入事件*/) {
      event = event || window.event; //取出事件
      var left = event.clientX - disX; //界面左边界水平坐标
      var top = event.clientY - disY; //界面上边界垂直坐标
      var maxLeft = document.documentElement.clientWidth - oPanel.offsetWidth; //界面左边界水平坐标最大限制
      var maxTop = document.documentElement.clientHeight - oPanel.offsetHeight; //界面上边界垂直坐标最大限制
      //如果水平坐标超过最大限制，则界面不再跟随鼠标移动
      if (left > maxLeft - 10) {
        left = maxLeft - 10; //为关闭按钮预留10px空间
      } else if (left < 0) {
        left = 0;
      }
      //同理
      if (top > maxTop) {
        top = maxTop;
      } else if (top < 10) {
        top = 10; //为关闭按钮预留10px空间
      }
      oPanel.style.left = left + 'px'; //client和offset为整型数，不带单位
      oPanel.style.top = top + 'px';
      //松开鼠标键事件：界面不再跟随
      document.onmouseup = function () {
        document.onmousemove = null; //移动事件不再触发任何活动
      }
    }
  }

  //点击状态栏事件：弹出状态选择菜单（下拉菜单）
  oStatus.onclick = function () {
    event.stopPropagation(); //阻止冒泡事件，防止点击了父节点（HTML文档）导致菜单关闭
    var sPanel = document.getElementById('loginStatePanel'); //下拉菜单
    var pLists = document.getElementsByClassName('statePanel_li'); //菜单列表
    sPanel.style.display = 'block'; //显示下HTML拉菜单
    //遍历菜单列表，添加动态效果
    for (var i = 0; i < pLists.length; i++) {
      //鼠标经过事件：触发灰色背景
      pLists[i].onmouseover = function () {
        this.style.backgroundColor = '#999';
      }
      //鼠标移开事件：背景颜色恢复
      pLists[i].onmouseout = function () {
        this.style.backgroundColor = '#fff';
      }
      //鼠标点击事件：更改状态栏内容并关闭下拉菜单
      pLists[i].onclick = function (event) {
        event = event || window.event;
        event.stopPropagation(); //阻止冒泡事件，防止点击了父节点（状态栏）导致下拉菜单关闭失败
        var sShow = document.getElementById('loginStateShow'); //状态栏图标
        var sTxt = document.getElementById('login2qq_state_txt'); //状态栏文本
        sShow.className = 'login-state-show ' + this.id; //修改状态栏图标为选中项的状态图标
        sTxt.innerHTML = this.getElementsByTagName('div')[1].innerHTML; //修改状态栏文本为选中项的状态文本
        sPanel.style.display = 'none'; //关闭下拉菜单
      }
    }
    /*点击HTML文档事件（除状态栏外的其他区域）：触发下拉菜单关闭
      若点击了状态栏，则不会触发此操作（冒泡被阻止）*/
    document.onclick = function () {
      sPanel.style.display = 'none';
    }
  }

  //点击关闭按钮事件：触发登录界面隐藏
  oClock.onclick = function () {
    oPanel.style.display = 'none';
  }
}