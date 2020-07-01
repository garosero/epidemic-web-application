#include"ProjectHeader.hpp"

Disease::Disease(string country_name, string disease_name, bool exposed, bool vaccine, double popul, double BR)
{
	string query;
	
	Sdata = vector<double>(0);
	Idata = vector<double>(0);
	Rdata = vector<double>(0);

	sql::Driver *driver;
	sql::Connection *con;
	sql::Statement *stmt;
	sql::PreparedStatement *pstmt;
	sql::ResultSet *result;

	try
	{
		driver = sql::mysql::get_mysql_driver_instance();
		con = driver->connect(HOST, USER, PASS);
	}
	catch(sql::SQLException e)
	{
		cout << "Could not connect to server. Error massge : " << e.what() << endl;
		system("pause");
		exit(1);
	}
	
	query = getCasesQuery(country_name, disease_name);

	con->setSchema(DB);

	pstmt = con->prepareStatement(query);
	result = pstmt->executeQuery();

	while(result->next())
	{
		Sdata.push_back((double)result->getInt(4));
		Idata.push_back((double)result->getInt(5));
		Rdata.push_back((double)result->getInt(6));
	}
	
	delete pstmt;
	delete result;

	if(exposed)
	{
		vector<double> initial(0);
		
		query = getParamsQuery(country_name, disease_name);
		
		pstmt = con->prepareStatement(query);
		result = pstmt->executeQuery();
		initial.push_back((double)result->getDouble(3));
		
		double exp = (double)result->getDouble(4);
		double gam = (double)result->getDouble(5);

		if(vaccine)
		{
			double vac = (double)result->getDouble(6);
			M = SEIR(popul, BR, exp, gam, vac, Sdata, Idata, Rdata, initial);
		}
		else
		{
			M = SEIR(popul, BR, exp, gam, Sdata, Idata, Rdata, initial);
		}	
	}
	else
	{
		vector<double> initial(0);

		query = getParamsQuery(country_name, disease_name);
		
		pstmt = con->prepareStatement(query);
		result = pstmt->executeQuery();
		
		initial.push_back(result->getDouble(3));
		double gam = (double)result->getDouble(5);

		if(vaccine)
		{
			double vac = (double)result->getDouble(6);
			m = SIR(popul, BR, gam, vac, Sdata, Idata, Rdata, initial);
		}
		else
		{
			m = SIR(popul, BR, gam, Sdata, Idata, Rdata, initial);
		}	
	}
	delete pstmt;
	delete result;
	
	query = getDeleteQuery(country_name, disease_name);

	stmt = con->createStatement();
	stmt->execute(query);
	delete stmt;
	
	pstmt = con->prepareStatement("INSERT INTO PREDICTED_CASE(country_name, disease_name,number, infectious) VALUES(?,?,?,?)");
	if(exposed)
	{
		for(int i = 0; i < M.getPeriod(); i++)
		{
			pstmt->setString(1, country_name);
			pstmt->setString(2, disease_name);
			pstmt->setInt(3, i);
			pstmt->setDouble(4, M.getData(2, i));
			pstmt->execute();
		}
	}
	else
	{
		for(int i = 0; i < m.getPeriod(); i++)
		{
			pstmt->setString(1, country_name);
			pstmt->setString(2, disease_name);
			pstmt->setInt(3, i);
			pstmt->setDouble(4, M.getData(1, i));
			pstmt->execute();
		}
	}	
}	

string getCasesQuery(string C_name, string D_name)
{
	string result = "SELECT * FROM CASES WHERE country_name = \"" + C_name + "\" AND disease_name = \"" + D_name + "\";";
	return result;
}

string getParamsQuery(string C_name, string D_name)
{
	string result = "SELECT * FROM PARAMS WHERE country_name = \"" + C_name + "\" AND disease_name = \"" + D_name + "\";";
	return result;
}

string getDeleteQuery(string C_name, string D_name)
{
	string result = "DELETE * FROM PREDICTED_CASE WHERE country_name = \"" + C_name + "\" AND disease_name = \"" + D_name + "\";";
	return result;
}
