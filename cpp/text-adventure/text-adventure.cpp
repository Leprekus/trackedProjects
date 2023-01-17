#include <iostream>
using namespace std;

void prompt() {
    cout << "what do you do?" << "\n"
    << "1) you grab stones and bread" << "\n"
    << "2) you leave the house without telling your sister" << "\n"
    << "3) you escape with your sister" << "\n";
};

string validate () {
    prompt();
    string answer;
    cin >> answer;
    return answer;
};

int main () {
    string beginning = "Hanzel woke up";
    string choice_one;

    string ending_one = "the witch ate you";
    string ending_two = "you escaped, but your sister was eaten by the witch";
    string ending_three = "you and your sister managed to escape and live happilyu ever after";

    cout << beginning << "\n"; 
    string answer = validate();
    while(answer == "1" || answer == "2" || answer == "3") {
       cout << "please make sure your answer is between 1 and 3";
       answer = validate();
    }
    if(answer == "1") {
        cout << "you arrive to the witch's house and left a trail behind";
    }
    if(answer == "2") {
        cout << "you got ambushed by wolves and got eaten";

    }
    if(answer == "3") {
        cout << "midway through you come across a candy house";
    }

    return 0;
};