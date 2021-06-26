function Task(data) {
    var self = this;
    self.name = data.name;
    self.isDone = ko.observable(data.isDone);
}

function AppViewModel() {
    var self= this;

    self.taskname = ko.observable();
    self.typeToShow = ko.observable("All");

    self.tasks = ko.observableArray([]);

     self.addTask = function() {
         self.tasks.push(new Task({name: self.taskname(), isDone: false}));
         self.taskname("");
     }
     self.productStock = ko.observable(0);


     self.tasksToShow = ko.computed(function() {
        var desiredType = self.typeToShow();
        if(desiredType == 'All') {
            return self.tasks();
        }
        return self.incompleteTasks();
     });

    self.showIncompleteTask = function() {
        self.typeToShow("Incomplete");
    }

    self.showAllTask = function() {
        self.typeToShow("All");
    }



     self.remove = function(task) {
         console.log("removing task");
         self.tasks.remove(task);
     }

     self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() });
     });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());