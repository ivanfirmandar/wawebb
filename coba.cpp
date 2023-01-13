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
<<<<<<< HEAD
    cout << "--------------START-----------------\n";
    system("node ./backend/backend/index.js");
=======
    cout << "Current working directory : " << getCurrentDir() << "\n";
     MSG msg;
    //if you add WS_CHILD flag,CreateWindow will fail because there is no parent window.
    HWND hWnd = CreateWindow(TEXT("button"), TEXT("Easy"), WS_VISIBLE | WS_POPUP,
        10, 10, 80, 25, NULL, NULL, NULL,  NULL);

    ShowWindow(hWnd, SW_SHOW);
    UpdateWindow(hWnd);

    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return (int) msg.wParam;
    return 0;
>>>>>>> 855381fc41ab6862412ed83a82a1a944aabbac86
}
