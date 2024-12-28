var shows = [];

// 颜色函数
function getColor(color) {
    if (color == "red") {
        return "#FF0000";
    } else if (color == "blue") {
        return "#0000FF";
    } else if (color == "green") {
        return "#2bff00";
    } else if (color == "yellow") {
        return "#FFFF00";
    } else if (color == "purple") {
        return "#800080";
    } else if (color == "orange") {
        return "#FFA500";
    } else if (color == "pink") {
        return "#FFC0CB";
    } else if (color == "black") {
        return "#000000";
    } else if (color == "white") {
        return "#FFFFFF";
    } else if (color == "grey" || color == "gray") {
        return "#808080";
    } else if (color == "brown") {
        return "#A52A2A";
    } else if (color== "cyan") {
        return "#00FFFF";
    } else {
        console.error(`❌ 函数错误 : 为定义的颜色： ${color} 。`);
    }
}

var tick = 0;
var nowShow = -1;
var status = 0;
// 0:未开始 1:进行中 2:已结束 3:报幕中 4:整场结束

// 定义常量
// 1.数据
const showsNumber = 10;
const maxMemberNumber = 10;

// 初始化 shows 数组
for (let i = 0; i <= showsNumber; i++) {
    shows[i] = {
        name: "未命名",
        englishName: "Untitled",
        members: []
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 定义常量
    // 2.容器
    const splashScreen = document.getElementById('splash-screen');
    const stationsContainer = document.getElementById('stations');
    const statusTip = document.getElementById('status');
    const nextTip = document.getElementById('nextShow');
    const nowTip = document.getElementById('nowShow');
    const rolesContainer = document.getElementById('roles');

    // 添加站点
    function addStation(name, englishName, color, index) {
        console.log(`ℹ️ 添加站点 : ${name}(${englishName}) 在第 ${index+1} 个位置， 并设置颜色为 ${color} 。`);

        // 创建站点元素
        const station = document.createElement('div');
        station.className = 'station';
        station.style.backgroundColor = getColor(color);

        // 创建站点名称元素
        const stationName = document.createElement('div');
        stationName.className = 'station-name';
        stationName.textContent = name;
        
        // 创建站点英文名称元素
        const stationEnglishName = document.createElement('div');
        stationEnglishName.className = 'station-english-name';
        stationEnglishName.textContent = englishName;

        // 将站点名称和英文名称添加到站点元素中
        station.appendChild(stationName);
        station.appendChild(stationEnglishName);

        // 将站点元素添加到站点列表中
        if (index !== undefined && index >= 0 && index <= stationsContainer.children.length) {
            stationsContainer.insertBefore(station, stationsContainer.children[index]);
        } else {
            stationsContainer.appendChild(station);
        }

        console.log(`✅ 添加站点 : ${name} 添加成功！`);

        // 添加动画效果
        station.style.transform = 'scale(0)';
        setTimeout(() => {
            station.style.transform = 'scale(1)';
        }, 10);
    }

    // 添加箭头
    function addArrow(index, directional, color){
        console.log(`ℹ️ 添加箭头 : 在第 ${index+1} 个站添加朝向 ${directional} 的颜色为 ${color} 的箭头。`)

        const station = stationsContainer.children[index];

        if (directional == 1) {
            // 创建左箭头
            const leftArrow = document.createElement('div');
            leftArrow.className = 'arrow left';
            leftArrow.textContent = '←';
            leftArrow.style.color = getColor(color); // 设置箭头颜色

            // 将箭头添加到站点元素中
            station.appendChild(leftArrow);

            console.log(`✅ 添加箭头 : 第 ${index + 1} 个的左箭头添加成功！`);
        } else if (directional == 2) {
            // 创建右箭头
            const rightArrow = document.createElement('div');
            rightArrow.className = 'arrow right';
            rightArrow.textContent = '→';
            rightArrow.style.color = getColor(color); // 设置箭头颜色

            // 将箭头添加到站点元素中
            station.appendChild(rightArrow);

            console.log(`✅ 添加箭头 : 第 ${index + 1} 个的右箭头添加成功！`);
        } else {
            console.error(`❌ 添加箭头 : 第 ${index + 1} 个的箭头添加失败！\n　 错误原因：无效的方向！`);
        }
    }

    // 设置箭头颜色
    function setArrow(index, directional, color){
        // 检查索引是否有效
        if (index >= 0 && index < stationsContainer.children.length) {
            console.log(`ℹ️ 设置箭头 : 在第 ${index+1} 个站设置朝向为 ${directional} 的颜色为 ${color} 的箭头。`);

            // 获取站点元素
            const station = stationsContainer.children[index];

            // 设置箭头颜色
            if (directional == 1) {
                const leftArrow = station.querySelector('.arrow.left');

                if (!leftArrow) {
                    console.error(`❌ 设置箭头 : 第 ${index + 1} 个站的左箭头设置失败！\n　 错误原因：没有找到左箭头！`);
                    return;
                }

                leftArrow.style.color = getColor(color);

                console.log(`✅ 设置箭头 : 第 ${index + 1} 个的左箭头的 ${color} 颜色设置成功！`);
            } if (directional == 2) {
                const rightArrow = station.querySelector('.arrow.right');

                if (!rightArrow) {
                    console.error(`❌ 设置箭头 : 第 ${index + 1} 个站的右箭头设置失败！\n　 错误原因：没有找到右箭头！`);
                    return;
                }

                rightArrow.style.color = getColor(color);

                console.log(`✅ 设置箭头 : 第 ${index + 1} 个的右箭头的 ${color} 颜色设置成功！`);
            }
        } else {
            console.error(`❌ 删除站点 : 第 ${index + 1} 个站的箭头设置失败！\n　 错误原因：无效的索引 ${index}！`);
        }
    }

    // 删除站点
    function removeStation(index) {
        // 检查索引是否有效
        if (index >= 0 && index < stationsContainer.children.length) {
            // 获取站点元素
            const station = stationsContainer.children[index];

            // 添加动画效果
            station.style.transform = 'scale(0)';
            setTimeout(() => {
                stationsContainer.removeChild(station);
            }, 300);

            console.log(`✅ 删除站点 : 第 ${index + 1} 个站删除成功！`);
        } else {
            console.error(`❌ 删除站点 : 第 ${index + 1} 个站删除失败！\n　 错误原因：无效的索引 ${index}！`);
        }
    }

    // 设置站点颜色
    function setStation(index, color) {
        // 检查索引是否有效
        if (index >= 0 && index < stationsContainer.children.length) {
            console.log(`ℹ️ 设置站点 : 为第 ${index+1} 个站设置颜色为 ${color} 。`);

            // 更新站点颜色
            const station = stationsContainer.children[index];
            station.style.backgroundColor = getColor(color);
        } else {
            console.error(`❌ 设置站点 : 第 ${index + 1} 个站的颜色设置失败！\n　 错误原因：无效的索引 ${index}！`);
        }
    }

    // 关闭启动页
    function closeSplashScreen() {
        window.document.getElementById('splash-screen-tip').innerHTML = "加载完毕！"
        setTimeout(() => {
            console.log("ℹ️ 关闭界面 : 关闭启动页");
            splashScreen.classList.remove('show');
            splashScreen.classList.add('hide');
        }, 1000);
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 2000);
    }

    // 读取数据
    function getData(){
        var getNameShows = new Array(showsNumber);

        console.log("ℹ️ 数据读取 : 开始读取数据");
        for (let i = 1; i <= showsNumber; i++) {
            for (let j = 1; j <= maxMemberNumber; j++){
                fetch(`data/shows/PRO-${i}/${j}/data.json`)
                    .then(response => {
                        if (!response.ok) {
                            console.log(`⚠️ 数据读取 : 文件 PRO-${i}/${j}/data.json 未找到`);
                            return null;
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(`ℹ️ 数据读取 : PRO-${i}/${j}/data.json 数据:`, data);

                        // name属性
                        if (!shows[i - 1].name || shows[i - 1].name == "未命名"){
                            if (data.groupName){
                                shows[i - 1].name = data.groupName;

                                console.log(`ℹ️ 节目数据 : 已将第 ${i} 个节目的名称设置为 ${shows[i].name} 。`);
                            }
                        }

                        // englishName属性
                        if (!shows[i - 1].englishName || shows[i - 1].englishName == "Untitled"){
                            if (data.groupEnglishName){
                                shows[i - 1].englishName = data.groupEnglishName;

                                console.log(`ℹ️ 节目数据 : 已将第 ${i} 个节目的英文名称设置为 ${shows[i].englishName} 。`);
                            }
                        } 

                        // 成员数据
                        if (data) {
                            shows[i - 1].members.push(data);

                            console.log(`ℹ️ 节目数据 : 已将第 ${i} 个节目成员数据添加成功。`, shows[i].members);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        if (i == showsNumber && j == maxMemberNumber) {
                            console.log("ℹ️ 数据读取 : 读取完毕");
                            autoAddStations();
                            console.log("✅ 站点添加 : 已将所有站点添加完毕");
                            closeSplashScreen();
                        }
                    });
            }
        }
    }

    function autoAddStations(){
        for (let i = 0; i < showsNumber; i++) {
            addStation(shows[i].name, shows[i].englishName, "green", i);
            if (showsNumber > 1){
                if (i > 0){
                    addArrow(i, 1, "grey");
                } 
                if (i < showsNumber - 1){
                    addArrow(i, 2, "green");
                }
            }
        }
        interval = setInterval(nextTick, 500);
    }

    function willGoArrow(index){
        setArrow(index, 2, tick ? "grey" : "green");
    }

    function willGoStation(index){
        setStation(index, tick ? "grey" : "yellow");
    }

    function startShows(index){
        if (index < 0 || index >= showsNumber){
            console.error(`❌ 开始失败 : ${index} 索引超出范围`);
        } else {
            status = 1;
            nowShow = index;

            playVideo(`data/shows/PRO-${index + 1}/1/video.mp4`);
        }
    }

    function stopShows(index){
        if (index < 0 || index >= showsNumber){
            console.error(`❌ 停止失败 : ${index} 索引超出范围`);
        } else {
            status = 2;
            nowShow = index;

            clearVideo();
        }
    }

    function sayShows(index){
        if (index < -1 || index >= showsNumber){
            console.error(`❌ 报幕失败 : ${index} 索引超出范围`);
        } else {
            status = 3;
            nowShow = index;

            // 添加角色
            cleanRoles();
            if (shows[nowShow + 1].members.length >= 1){
                for (let i = 0; i < shows[nowShow + 1].members.length; i++) {
                    addRoles(shows[nowShow + 1].members[i].name, shows[nowShow + 1].members[i].englishName, shows[nowShow + 1].members[i].roles, shows[nowShow + 1].members[i].rolesEnglish);
                }
            } else {
                rolesContainer.innerHTML = '-无演员-';
            }
        }
    }

    function stopAllShows(){
        status = 4;

        // 添加角色
        cleanRoles();
        for (let i = 0; i < showsNumber; i++){
            for (let j = 0; j < shows[i].members.length; j++) {
                addShowsRoles(shows[i].name, shows[i].englishName, shows[i].members[j].name, shows[i].members[j].englishName, shows[i].members[j].roles, shows[i].members[j].rolesEnglish);
            }
        }
    }

    function cleanRoles(){
        rolesContainer.innerHTML = "";
    }

    function addRoles(name, englishName, role, roleEnglish){
        if (role == ""){
            console.error(`❌ 添加角色 : 角色名不能为空！`);
        } else {
            // 创建名称
            var nameElement = document.createElement('div');
            nameElement.classList.add('roleName');
            nameElement.textContent = name;

            // 创建角色
            var roleJobElement = document.createElement('div');
            roleJobElement.classList.add('roleJob');
            roleJobElement.textContent = (role ? role : "演员") + "-";

            // 创建单个角色
            var roleElement = document.createElement('div');
            roleElement.classList.add('role');
            roleElement.appendChild(roleJobElement);
            roleElement.appendChild(nameElement);

            // 将单个角色加入容器
            rolesContainer.appendChild(roleElement);
        }
    }

    function addShowsRoles(showsName, showsEnglishName, name, englishName, role, roleEnglish){
        if (role == ""){
            console.error(`❌ 添加角色 : 角色名不能为空！`);
        } else {
            // 创建节目
            var showElement = document.createElement('div');
            showElement.classList.add('roleName');
            showElement.textContent = showsName + "-";

            // 创建名称
            var nameElement = document.createElement('div');
            nameElement.classList.add('roleName');
            nameElement.textContent = name;

            // 创建角色
            var roleJobElement = document.createElement('div');
            roleJobElement.classList.add('roleJob');
            roleJobElement.textContent = (role ? role : "演员") + "-";

            // 创建单个角色
            var roleElement = document.createElement('div');
            roleElement.classList.add('role');
            roleElement.appendChild(showElement);
            roleElement.appendChild(roleJobElement);
            roleElement.appendChild(nameElement);

            // 将单个角色加入容器
            rolesContainer.appendChild(roleElement);
        }
    }

    // 播放视频的函数
    function playVideo(videoUrl) {
        const videoPlayer = document.getElementById('player');
        if (videoPlayer) {
            videoPlayer.src = videoUrl;
            videoPlayer.load();
            videoPlayer.play().catch(error => {
                console.error('❌ 视频自动播放失败 : ', error);
            });
        } else {
            console.error('❌ 获取失败 : 未找到 id 为 player 的 video 元素');
        }
    }

    // 清除视频的函数
    function clearVideo() {
        const videoPlayer = document.getElementById('player');
        if (videoPlayer) {
            videoPlayer.src = '';
            videoPlayer.load();
            videoPlayer.style.backgroundColor = 'black';
        } else {
            console.error('❌ 获取失败 : 未找到 id 为 player 的 video 元素');
        }
    }

    // 状态计时器
    function nextTick(){
        tick = (tick + 1) % 2;

        if (status == 0){
            statusTip.textContent = "等待开始";
            nextTip.textContent = shows[0].name;
            nowTip.textContent = "开幕";
        } else if (status == 1){
            statusTip.textContent = "进行中";
            if (nowShow < showsNumber - 1) nextTip.textContent = shows[nowShow + 1].name;
            else nextTip.textContent = "闭幕";
            nowTip.textContent = shows[nowShow].name;

            willGoStation(nowShow);
            if (nowShow > 0) willGoArrow(nowShow - 1);
        } else if (status == 2){
            statusTip.textContent = "已结束";
            if (nowShow < showsNumber - 1) nextTip.textContent = shows[nowShow + 1].name;
            else nextTip.textContent = "闭幕";
            nowTip.textContent = shows[nowShow].name;

            setStation(nowShow, "red");
            if (nowShow > 0) setArrow(nowShow - 1, 2, "red");
        } else if (status == 3){
            statusTip.textContent = "报幕中";
            if (nowShow < showsNumber - 2) nextTip.textContent = shows[nowShow + 2].name;
            else nextTip.textContent = "闭幕";
            nowTip.textContent = shows[nowShow + 1].name;

            setStation(nowShow, "red");
            if (nowShow > 1) setArrow(nowShow - 1, 2, "red");
        } else if (status == 4) {
            statusTip.textContent = "所有节目已结束";
            nextTip.textContent = "-暂无-";
            nowTip.textContent = "闭幕";
        }
    }

    var interval;

    getData();

    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "ArrowRight"){
            if (status == 0){
                sayShows(-1);
            } else if (status == 1){
                stopShows(nowShow);
            } else if (nowShow == showsNumber - 1 && status == 2){
                stopAllShows();
            } else if (status == 2) {
                sayShows(nowShow);
            } else {
                startShows(nowShow + 1);
            }
        } else if (event.ctrlKey && event.key === "ArrowLeft"){
            if (status == 5){
                stopShows(showsNumber - 1);
            } else if (status == 1){
                sayShows(nowShow - 1);
            } else if (nowShow == 0 && status == 2){

            } else if (status == 2) {
                startShows(nowShow);
            } else {
                stopShows(nowShow);
            }
        }
    });
});