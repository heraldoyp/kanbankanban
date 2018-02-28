<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand">Goban</a>
      <form class="form-inline">
        <button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModal">New Task</button>
      </form>
    </nav>
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header bg-danger" style="color: white">
            Back-Log
          </div>
          <div class="card-body" >
            <div class="card-body" v-for="backlog in backlogs" :key="backlog['.key']">
              <div class="card">
                <div class="card-header">
                  {{backlog.title}}
                </div>
                <div class="card-body">
                  <p>Point: {{backlog.point}}</p>
                  <p>Assigned To: {{backlog.assignedTo}}</p>
                  <button class="btn btn-primary" data-toggle="modal" @click="showDetail(backlog)" data-target="#exampleModalBackLog">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header bg-warning">
            To-Do
          </div>
          <div class="card-body">
            <div class="card-body" v-for="todo in todos" :key="todo['.key']">
              <div class="card">
                <div class="card-header">
                  {{todo.title}}
                </div>
                <div class="card-body">
                  <p>Point: {{todo.point}}</p>
                  <p>Assigned To: {{todo.assignedTo}}</p>
                  <button class="btn btn-primary" @click="showDetail(todo)" data-toggle="modal" data-target="#exampleModalTodo">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header bg-primary">
            Doing
          </div>
          <div class="card-body">
            <div class="card-body" v-for="doing in doings" :key="doing['.key']">
              <div class="card">
                <div class="card-header">
                  {{doing.title}}
                </div>
                <div class="card-body">
                  <p>Point: {{doing.point}}</p>
                  <p>Assigned To: {{doing.assignedTo}}</p>
                  <button class="btn btn-primary" @click="showDetail(doing)" data-toggle="modal" data-target="#exampleModalDoing">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header bg-success">
            Done
          </div>
          <div class="card-body">
            <div class="card-body" v-for="done in dones" :key="done['.key']">
              <div class="card">
                <div class="card-header">
                  {{done.title}}
                </div>
                <div class="card-body">
                  <p>Point: {{done.point}}</p>
                  <p>Assigned To: {{done.assignedTo}}</p>
                  <button class="btn btn-primary" @click="showDetail(done)" data-toggle="modal" data-target="#exampleModalDone">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label >Title</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input Task Title" v-model="title">
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description">Input Task Short Description</textarea>
              </div> 
              <div class="form-group">
                <label>Point</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input Task" v-model="point">
              </div>
              <div class="form-group">
                <label >Assigned To</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input Task" v-model="assignedTo">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addTask">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Detail back log -->
    <div class="modal fade" id="exampleModalBackLog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentTask.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Task Description : {{currentTask.description}}</p>
            <br>
            <p>Point : {{currentTask.point}}</p>
            <br>
            <p>Status: {{currentTask.status}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteOne()" class="btn btn-dark">Delete Task</button>
            <button type="button" @click="nextBackLog()" class="btn btn-warning">Todo</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Detail Todo -->
    <div class="modal fade" id="exampleModalTodo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentTask.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Task Description : {{currentTask.description}}</p>
            <br>
            <p>Point : {{currentTask.point}}</p>
            <br>
            <p>Status: {{currentTask.status}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="beforeTodo()">Backlog</button>
            <button type="button" class="btn btn-dark" @click="deleteOne()">Delete Task</button>
            <button type="button" class="btn btn-primary" @click="nextTodo()">Doing</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Detail Doing -->
    <div class="modal fade" id="exampleModalDoing" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentTask.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Task Description : {{currentTask.description}}</p>
            <br>
            <p>Point : {{currentTask.point}}</p>
            <br>
            <p>Status: {{currentTask.status}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="beforeDoing()">Todo</button>
            <button type="button" class="btn btn-dark" @click="deleteOne()">Delete Task</button>
            <button type="button" class="btn btn-success" @click="nextDoing()">Done</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Detail Done -->
    <div class="modal fade" id="exampleModalDone" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentTask.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Task Description : {{currentTask.description}}</p>
            <br>
            <p>Point : {{currentTask.point}}</p>
            <br>
            <p>Status: {{currentTask.status}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="beforeDone()">Doing</button>
            <button type="button" class="btn btn-dark" @click="deleteOne()">Delete Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {taskRef} from './firebase'
import showDetail from './views/ShowDetail'
export default {
  components: {
    showDetail
  },
  data () {
    return{
      currentTask: {
        title: '',
        description: '',
        point: '',
        assignedTo: '',
        status: '',
      }
    }
  },
  firebase: {
    tasks: taskRef
  },  
  created(){
    console.log(tasks)
  },
  computed: {
    backlogs(){
      return this.tasks.filter(element=> element.status === 0)
    },
    todos(){
      return this.tasks.filter(element=> element.status === 1)
    },
    doings(){
      return this.tasks.filter(element=> element.status === 2)
    },
    dones(){
      return this.tasks.filter(element=> element.status === 3)
    }
  },
  methods: {
    addTask () {
      this.currentTask = {
        title: this.title,
        description: this.description,
        point: this.point, 
        assignedTo: this.assignedTo,
        status: 0
      }
      let key =  taskRef.child('task').push().key

      let update = {}
      update[key] = this.currentTask
      taskRef.update(update)
    },
    showDetail (task) {
      localStorage.removeItem('key')
      this.currentTask = {
        title: task.title,
        description: task.description,
        point: task.point, 
        assignedTo: task.assignedTo,
      }
      if(task.status === 0){
        this.currentTask.status = 'Backlog'
      }else if(task.status === 1){
        this.currentTask.status = 'Todo'
      }else if(task.status === 2){
        this.currentTask.status = 'Doing'
      }else if(task.status === 3){
        this.currentTask.status = 'Done'
      }
      localStorage.setItem('key', task['.key'])
    },
    deleteOne () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).remove()
    },
    nextBackLog () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(1)
    },
    beforeTodo () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(0)
    },
    nextTodo () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(2)
    },
    beforeDoing () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(1)
    },
    nextDoing () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(3)
    },
    beforeDone () {
      let key = localStorage.getItem('key')
      this.$firebaseRefs.tasks.child(key).child('status').set(2)
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.card-body{
  padding: 2px
}

p{
  font-size: 14px;
}
</style>
