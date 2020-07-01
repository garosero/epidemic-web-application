#ifndef _PROJECT_HEADER_
#define _PROJECT_HEADER_

#include<iostream>
#include<string>
#include<vector>

// Connect MYSQL
#include<cppconn/driver.h>
#include<cppconn/exception.h>
#include<cppconn/resultset.h>
#include<cppconn/prepared_statement.h>

//#include"mysql_connect.h"
#include"mysql_driver.h"
#include"mysql_error.h"

#define HOST "gp1.cwoqkciaiowv.ap-northeast-2.rds.amazonaws.com"
#define USER "GP1_T6"
#define PASS "gp1_t6_pw"
#define DB "GP1_T6_DB"

using namespace std;

// Interface Head
// #include"ODE_Solving.hpp"
// #include"Data_Fitting.hpp"

// Class Header
#include"Matrix.hpp"
#include"SEIR.hpp"
#include"SIR.hpp"
#include"Disease.hpp"
#include"Country.hpp"





#endif
