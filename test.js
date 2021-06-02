let obj1={
    mass:23,
    name:"Vasya"
}

let obj2 = Object.create(obj1)

//console.log(obj2.mass)
let obj4={
    name:'petro',
}
function User(name,age){
   this.name=name;
   this.age=age
}


//console.log(obj3.name)
//{}, __proto__:{constructor: User,__proto__: Object.prototype}(User.prototype)



User.prototype.show = 
    function(){
    console.log(`${this.name}:${this.age}`)
}
let obj3 = new User("Petro",12);


obj3.show()
//obj1:{name:'Petro', age:23, __proto__:User.prototype}
//User.prototype:{constructor:User,show:...,__proto__:Object.prototype}
console.log(User.prototype)