#include"ProjectHeader.hpp"

int main(void) {
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

	pstmt = con->prepareStatement("SELECT * FROM COUNTRY;");
	result = pstmt->executeQuery();

	while(result->next()){
		Country ctmp(result->getString(1), result->getInt(2));
	}
	
	delete result;
	delete pstmt;
	delete con;
	system("pause");
	return 0;
}
