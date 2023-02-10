# AltamiraSoftware

Am avut de implementat functionalitatile de autentificare si autorizare pentru un proiect existent al unui client.

Am atasat componenta de autentificare declarata in proiectul de Angular. 

Aici am controller-ul din SpringBoot
https://github.com/popaadina/eventsapi/blob/vilau_dev/src/main/java/com/app/eventsmanagementapi/rest/AuthController.java

Aici este Filtru-ul creat pentru a intercepta toate requesturile care se fac catre API si a verifica daca au json web token-ul introdus in Header-ul de Authorization
https://github.com/popaadina/eventsapi/blob/vilau_dev/src/main/java/com/app/eventsmanagementapi/filters/CustomAuthorizationFilter.java

Pentru proiectul despre care am discutat telefonic si care am spus ca este confidential, atasez cateva functionalitati din el:
https://github.com/VilauGC/QRCodeGenerator
https://github.com/VilauGC/QRCodeScanner/tree/master

Vezi in https://vilauweb.ro cum functioneaza QRCodeGenerator si QRCodeScanner
