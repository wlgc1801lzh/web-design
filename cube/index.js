const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')
const path = require('path');

//托盘对象
var appTray = null;

//系统托盘右键菜单
var trayMenuTemplate = [{
        label: '设置',
        click: function () {} //打开相应页面
    },
    {
        label: '帮助',
        click: function () {}
    },
    {
        label: '退出',
        click: function () {
            app.quit();
        }
    }
];
//系统托盘图标目录
const trayIcon = path.join(__dirname, 'img');

//图标的上下文菜单
const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

// 创建浏览器窗口
function createWindow() {
    const win = new BrowserWindow({
        frame: false,
        transparent: true,
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    appTray = new Tray(path.join(trayIcon, 'icon.ico'));
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('zzz');
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    // 并且为你的应用加载index.html
    win.loadFile('index.html')
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。