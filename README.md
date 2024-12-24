Steps to setup and run the food order project :

GitHub: https://github.com/s22x/IT7405_Sara_202003580

[ Note : Steps are indicated by # symbol
         Comments are indicated by // symbol ]

Set-up Environment : Windows 11

# Install Python 
    
1. Visit the Python Downloads Page: Go to the official Python website's (python.org) downloads section for Windows. 

2. Select the Latest Version: Click on the link for the latest Python 3 release, such as Python 3.13.0 or Python 3.12.7. 
 
3. Choose the Installer: Scroll down and select the appropriate installer for your system, either Windows installer (64-bit) or Windows installer (32-bit). 

4. Download the Installer: Click on the installer link to download the file to your computer. 

5. Run the Installer: Double-click the downloaded file to start the installation process. Ensure to check the box that says "Add Python to PATH" before clicking "Install Now
  
6. Verify the installation 
     //Open the terminal and execute the following command 
     python -V   // V is uppercase
    
# Install node.js

1. Download the Node.js ‘.msi’ installer the first step to install Node.js on Windows is to download the installer. Visit the official Node.js website i.e) https://nodejs.org/en/download/
 
2. Double click the installer and follow the onscreen instruction 

3. Verify the installation 
      //Open the terminal and execute the following command 
      node -v   // v is lowercase

# Install vscode

1.Go to the Visual Studio Code website and download the installer for Windows 

2.Double-click the downloaded file, VSCodeUserSetup-x64-1.x.x.exe and follow the on screen instructions

3.Once the vscode is successfully installed, open the vscode by double click.

# Setup the project in vscode

  // backend setup 

1. open the backend project folder in the vscode

2. open the terminal in vscode 

3. python -m venv project_env  //create virtual env named project_env

4. project_env\Scripts\activate //activate the virtual env by executing activate in the project_env folder

3. pip install -r .\requirements.txt   //install the dependencies listed in requirements.txt

4. python .\manage.py runserver       // run the backend server 

  // frontend setup 

1. open the frontend project folder in the vscode

2. open the terminal in vscode 

3. npm i  // install the dependencies from the package json file

4. npm run dev // runs the frontend server 

5. open the url displayed by the frontend server in the browser. It opens the website.





   
