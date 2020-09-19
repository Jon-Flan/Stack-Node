exports.myStack = class {

    //create constructor
    constructor(){
        //set an items property to empty array
        this.items = []
    }

    //Functions of the stack to be implemented

    //push item onto stack
    push(element){
        this.items.push(element);
    }

    //pop item off stack
    pop(){
        //first check if the stack is empty
        if(this.items.length == 0)
            return "Nope, Empty Stack";
        //if not, pop item off stack
        return this.items.pop();
    }
    //peek at the top item on stack (without deleting it)
    peek(){
        //return the last item on the stack by checking the lenght and -1, 
        return this.items[this.items.length - 1];
    }
    //check if the stack is empty
    isEmpty(){
        //will return boolean
        return this.items.length == 0;
    }
    //print the stack
    printStack(){
        //return string of all elements concatenated together
        var str ="";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] + ' ';
        return str;
    }

    //delete all items in stack
    deleteStack(){
        return this.items =[];
    }

    
}


