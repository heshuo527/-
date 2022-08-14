//先定义个document.querySelsctor
var e = function(selector) {
    return document.querySelector(selector)
}

//先去获取到add按钮  再添加事件
var addButton = e('.todo-add')
addButton.addEventListener('click', function() {
    var input = e('.todo-input')
    //获取到输入值
    var todo = input.value
    inserTodo(todo, false)
    saveTodos()

})

var inserTodo = function(todo, done) {
    //获取到它的容器container元素
    var container = e('#todo-container')
    var t = toggleTodo(todo, done)
    //beforeend的意识是把传进来的参数保存在最后
    container.insertAdjacentHTML('beforeend', t)
    
}

var toggleTodo = function(todo, done) {
    var status = ''
    if(done) {
        status = 'done'
    }
    var t = `
    <div class="todo-cell ${status}">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span class="todo-span">${todo}</span>
    </div>
    `
    return t
}

//通过事件委托我们可以来实现添加一个元素的class和删除一个元素
//通过它们的父元素来判断被点击对象是否是我们需要的元素event.target

var todoContainer = e('#todo-container')
todoContainer.addEventListener('click', function (event) {
    var target = event.target
    //假如被点击的对象是done 
    if(target.classList.contains('todo-done')) {
        //parentElement 是他们的父元素
        var todoDiv = target.parentElement
        //我们就给他的父元素添加一个class
        toggleClass(todoDiv, 'done')
        saveTodos()
        //加入被点击时的是delete
    } else if(target.classList.contains('todo-delete')){
        var todoDiv = target.parentElement
        //我们就是删除他的父元素
        todoDiv.remove()
        saveTodos()
    }
})

//用来开关某个元素的class
var toggleClass = function(element, className) {
    //判断这个元素是拥有某个元素
    if(element.classList.contains(className)) {
        //如果有的话我们就删掉他
        element.classList.remove(className)
    } else {
        //没有话我们就加上这个按钮
        element.classList.add(className)
    }
}

//全部完成
var todoAdds = e('.todo-adds')
//先给这个按钮添加一个点击函数
todoAdds.addEventListener('click', function() {
    var c = []
    //获取到全部的todo-done这个元素
    var todoCell = document.querySelectorAll('.todo-done')
    for(var i = 0; i < todoCell.length; i++) {
        var c = todoCell[i]
        //找到他们的父元素
        var todo = c.parentElement
        //添加一个done
        todo.classList.add('done')
    }
    saveTodos()
})
//一键反选按钮
var todoReverse = e('.todo-reverse')
todoReverse.addEventListener('click', function() {
    var todoCell = document.querySelectorAll('.todo-done')
    for(var i = 0; i < todoCell.length; i++) {
        var c = todoCell[i]
        var todo = c.parentElement
        if(todo.classList.contains('done')) {
            todo.classList.remove('done')
        } else {
            todo.classList.add('done')
        }
    }
    saveTodos()
})

//一键删除按钮
var todoDeletes = e('.todo-deletes')
todoDeletes.addEventListener('click',function() {
    var tododet = document.querySelectorAll('.todo-delete')
    for (let i = 0; i < tododet.length; i++) {
        var c = tododet[i]
        let todo = c.parentElement
        todo.remove()
    }
    saveTodos()
})

//隐藏，显示文本，这里要用到焦点事件

var todoText = function() {
    var todo = e('.todo-input')
    todo.onfocus = function() {
        if(todo.value == '请输入') {
            todo.value = ''
        }
    }
    todo.onblur = function() {
        if(todo.value == '') {
            todo.value = '请输入'
        }
        console.log('dhjasdhuaduisd');
    }
}
todoText()
//用localStorage实现本地储存
//以字符串的形式保存进去，以字符串的形式读取出来
//序列化和反序列化
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

//获取全部的todos用save来保存
var saveTodos = function() {
    var todos = []
    var todoSpan = document.querySelectorAll('.todo-span')
    for (let i = 0; i < todoSpan.length; i++) {
        var c = todoSpan[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done : done,
            content : c.innerHTML,
        }
        todos.push(todo)
    }
    save(todos)
}

var loadTodos = function() {
    var todo = load()
    for(var i = 0; i < todo.length; i++) {
        var c = todo[i]
        inserTodo(c.content, c.done)
        console.log('loadTodos', todo);
    }
}
loadTodos()