class MyVariables{
    constructor(name){
        this.username=name;
    }

    static getuser(){
        return this.username;
    }

    static setuser(name){
        this.username=name;
    }
}

module.exports = MyVariables;