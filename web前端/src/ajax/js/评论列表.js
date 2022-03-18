$(function(){
    getCommentList();
    function getCommentList(){
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            data: {},
            success: function(res){
               if(res.status !== 200) return alert('获取评论失败!')
               var rows = []
               $.each(res.data,function(i,item){
                    rows.push(' <li class="list-group-item">'+item.content+'<span class="badge b1">评论时间：'+item.time+'</span><span class="badge b2">评论人：'+item.username+'</span>Item 1</li>')
               })
               $('.list-group').empty().append(rows.join(''));
            }
        })
    }
    $('#formAddCmt').submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/Addcmt',data,function(res){
            if(res.status !== 201) alert('发送数据失败!'); 
        })
        getCommentList();
        $('.form-control').val('');
    })
})