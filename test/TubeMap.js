/*
 * TubeMap
 *
 * The program table of the subway line diagram.
 *
 * @author: Name Is Zhuo Yue
 * @date: 2024-12-27
*/

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

document.addEventListener('DOMContentLoaded', () => {
    // 获取站点容器
    const stationsContainer = document.getElementById('stations');

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
            station.style.backgroundColor = color;
        } else {
            console.error(`❌ 设置站点 : 第 ${index + 1} 个站的颜色设置失败！\n　 错误原因：无效的索引 ${index}！`);
        }
    }

    // 示例调用
    addStation('节目1', 'Show1', 'red', 0);
    addStation('节目2', 'Show2', 'yellow', 1);
    addStation('节目3', 'Show3', 'green', 2);
    addArrow(0, 2, "green");
    addArrow(1, 1, "grey");
    addArrow(1, 2, "green");
    addArrow(2, 1, "grey");
    setTimeout(() => {
        setArrow(0, 2, "grey");
        setStation(1, "grey");
    }, 500);
    setTimeout(() => {
        setArrow(0, 2, "green");
        setStation(1, "yellow");
    }, 1000);
    setTimeout(() => {
        setArrow(0, 2, "grey");
        setStation(1, "grey");
    }, 1500);
    setTimeout(() => {
        setArrow(0, 2, "green");
        setStation(1, "yellow");
    }, 2000);
    setTimeout(() => {
        setArrow(0, 2, "grey");
        setStation(1, "grey");
    }, 2500);
    setTimeout(() => {
        setArrow(0, 2, "red");
        setStation(1, "red");
    }, 3000);
});