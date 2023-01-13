#include <windows.h>
#include <string>
#include <limits.h>
#include <iostream>
using namespace std;;

string getCurrentDir() {
    char buff[MAX_PATH];
    GetModuleFileName( NULL, buff, MAX_PATH );
    string::size_type position = string( buff ).find_last_of( "\\/" );
    return string( buff ).substr( 0, position);
}

// Driver function
int main() {
    cout << "--------------START-----------------\n";
    system("node ./backend/backend/index.js");
}
