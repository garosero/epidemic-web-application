#!/bin/bash

rm Matrix.o
rm SIR.o
rm SEIR.o
rm Disease.o
rm Coutnry.o
rm main.o

g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp Matrix.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp SIR.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp SEIR.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp Disease.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp Country.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -c ProjectHeader.hpp main.cpp -L/usr/lib -lmysqlcppconn  
g++ -Wall -I/usr/include/cppconn -o GraduateProject Main.o Country.o Disease.o SEIR.o SIR.o Matrix.o -L/usr/lib -lmysqlcppconn 
