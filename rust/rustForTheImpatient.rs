fn foo() {

}
fn my_signed_int_fn() -> i32 {
    //returns 32-bit signed int
    4
}
fn main() {
    //declaring variables
    let x;
    x = 42; //just like js

    let z = 42;
    let signed_int: i32; //i32 = signed 32-bit int
    signed_int = 32;
    let another_signed_int: i32 = 64;
    
    //underscore _ 
    let _ = foo(); //gets called and result thrown away
    let _ignore_this = 123; //compiler ignores warnings
    let first = 13;
    let first = first + 3; //13 is gone now it's just 16

    let tuple = ("a", 17); //immutable data type
    tuple.0; //this is 'a'
    tuple.1; //this is 17


    let pair: (char, i32) = ('a', 17); //destructuring tuple
    let (my_character, my_integer) = ("a", 17); //destructuring tuple
    
    //statements can span multiple lines
    let my_vector = vec![1,2,3,4]
    .iter()
    .map(|x| x * 2);

    //blocks

    let var_a = 1;
    {
        let var_a =1; //another scope
    }

    // dot . calls object values & || methods
    // :: used for namespaces more or less like import from js
    //use brings name from other namespaces into scope can also be used to import
    //ex: use std::* imports everything (*) from std library

    //both are the same
    //str::len("leprekus")
    //"leprekus".len()

    //both are the same but one has full path
    let v = Vec::new();
    let my_v = std::vec::Vec::new();

    //rust inserts use std::prelude::v1::* 
    //at the beginining of all modules
    

}
