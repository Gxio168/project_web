$(function(){
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    $("ol,ul").on("click","a",function(){
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index,1);
        saveDate(data);
        load();
    })
    $("ol,ul").on("click","input",function(){
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    })
   function getDate() {
       var data = localStorage.getItem("todolist");
       if(data !== null) {
           return JSON.parse(data);
       }else{
           return [];
       }
   }
   function saveDate(data) {
       localStorage.setItem("todolist",JSON.stringify(data));
   }
   function load() {
       var data = getDate();
       $("ol,ul").empty();
       var todoCount = 0;
       var doneCount = 0;
       $.each(data,function(i,n){
           if(n.done){
               $("ul").prepend("<li><input type='checkbox' checked='checked'><p>"+ n.title+"</p><a href = 'javascript:;' id = "+ i+"></a></li>")
               doneCount++;
           }else{
            $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
            todoCount++;
           }
       })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
   }
});