document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const showsNumber = 10;

    console.log("ℹ️ 数据读取 : 开始读取数据");
    for (let i = 1; i <= showsNumber; i++) {
        fetch(`data/shows/PRO-${i}/data.json`)
            .then(response => {
                if (!response.ok) {
                    console.log(`⚠️ 数据读取 : 文件 PRO-${i}/data.json 未找到`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`ℹ️ 数据读取 : PRO-${i}/data.json 数据:`, data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                if (i == showsNumber) {
                    console.log("ℹ️ 数据读取 : 读取完毕");
                    window.document.getElementById('splash-screen-tip').innerHTML = "加载完毕！"
                    setTimeout(() => {
                        console.log("ℹ️ 关闭界面 : 关闭启动页");
                            splashScreen.classList.remove('show');
                            splashScreen.classList.add('hide');
                    }, 1000);
                }
            });
    }
});