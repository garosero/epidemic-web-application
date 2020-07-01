#ifndef _COUNTRY__
#define _COUNTRY__

#include"ProjectHeader.hpp"

Country::Country(string country_Code, double popu) : NAME(country_Code), population(popu) {
	sql::Driver *driver;
	sql::Connection *con;
	sql::PreparedStatement *pstmt;
	sql::ResultSet *result;

	try
	{
		driver = sql::mysql::get_mysql_driver_instance();
		con = driver->connect(HOST, USER, PASS);
	}
	catch(sql::SQLException e)
	{
		cout << "Could not connect to server. Error message : " << e.what() << endl;
		system("pause");
		exit(1);
	}

	con->setSchema(DB);

	pstmt = con->prepareStatement("SELECT * FROM DISEASE;");
	result = pstmt->executeQuery();

	while(result->next())
	{
		Disease dtmp(NAME, (string)result->getString(1), (bool)result->getBoolean(2), (bool)result->getBoolean(3), population, 0);
	
	}

	delete con;
	delete pstmt;
	delete result;
}

#endif
